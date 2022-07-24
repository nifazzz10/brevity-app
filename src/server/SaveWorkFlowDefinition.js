import { API , Auth } from 'aws-amplify'
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { v4 as uuidv4 } from "uuid"
const SaveWorkFlowDefinition=async(workFLowName,workFlowDesc,newNode,newEdge)=>{
    try {
      if(workFLowName===null || workFlowDesc===null || newNode==='[]' ||newEdge==='[]'){
        console.log(workFLowName,workFlowDesc,newNode,newEdge)
        throw "Please enter all fields";
      }
      const workflowNamePresent=await API.graphql({query:queries.getWorkflow,variables:{workflowName:workFLowName}})
      if(workflowNamePresent.data.getWorkflow===null || workflowNamePresent.data.getWorkflow.SaveAsDraft===true){
          const date=new Date();
          let createdAt=date.getTime();
        //fetch for authed user
        const authedUser=await Auth.currentAuthenticatedUser();
        const workflowid= uuidv4();
        // find every node child and start adding data to database
            for(let i=0;i<newNode.length;i++){
              let childArray=[];
              newEdge.map((edge)=>{
                if(edge.source===newNode[i].id){
                  childArray.push(edge.target);
                }
              })
              const nodeData=await API.graphql({
                query:queries.nodeByNodeandWorkFlowName,
                variables:{
                  NodeName:newNode[i].data.label,
                  WorkFlowName:{
                    eq:workFLowName
                  }
                }
              });
              if(nodeData.data.nodeByNodeandWorkFlowName.items.length===0){
                const workflowDefinitionDetails={
                    workflowdefinitionid:workFLowName,
                    NodeName: newNode[i].data.label,
                    NextNodeName:childArray,
                    Description: workFlowDesc,
                    isRootNode:newNode[i].data.isRootNode,
                    WorkFlowName: workFLowName,
                  //conect via id
                    workflowWorkflowdefinitionsId: workflowid
                }
                const setNodeDataToBackend=await API.graphql({query:mutations.createWorkflowDefinition,variables:{input:workflowDefinitionDetails}})
                console.log(setNodeDataToBackend.data.createWorkflowDefinition);
              // console.log(workflowDefinitionDetails);
              }
              else{
                continue;
              }
          }
          if(workflowNamePresent.data.getWorkflow!=null){
            const updatedWorkFlowDetails={
            // update via id
              workflowName:workFLowName,
              WorkFlowJSON:JSON.stringify([newNode,newEdge]),
              SaveAsDraft:false,
              _version:workflowNamePresent.data.getWorkflow._version
            }
            const addWorkFlowDetails=await API.graphql({query:mutations.updateWorkflow,variables:{input:updatedWorkFlowDetails}})
            // console.log(addWorkFlowDetails);
          }
          else{
            const workFlowDetails={
              workflowName:workflowid,
              workflowname:workFLowName,
              WorkFlowJSON:JSON.stringify([newNode,newEdge]),
              WorkFlowDescription:workFlowDesc,
              SaveAsDraft:false,
              CreatedBy: "authedUser.attribues.name",
              OwnedBy: "authedUser.attributes.name",
              createdAt:createdAt
            }
            const addWorkFlowDetails=await API.graphql({query:mutations.createWorkflow,variables:{input:workFlowDetails}})
            // console.log(addWorkFlowDetails);
          }
          return true;
      }
      else{
        alert("Workflow  exists")
      }
    } catch (error) {
      console.log("Error is ",error);
    }
}
export default SaveWorkFlowDefinition;