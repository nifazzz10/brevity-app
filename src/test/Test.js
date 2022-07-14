import React from 'react'
import { validateEmail,validatePhone, testEmail} from './InputTest';
import { createNewUser, getUserByEmail,getUserBySupMail, deleteUserByMail, deleteUserBySupMail, updateUserInfo } from '../gqlFunctions/UserTable';
import { createUserData, getDataViaMail, getDataViaSuper, deleteEmail, deleteSuperMail, updateTheUser} from '../gqlFunctionTest/UserTest';
import { createNewNotif,updateNotif,deleteNotifByMail, listNotifications, listNotifbyStatus, convertStatus } from '../gqlFunctions/NotifTable';
import {createNotifData, updateNotifData, deleteNotif, enumData} from '../gqlFunctionTest/NotifTest';
import { createOrders, deleteOrders, updateOrders, getOrderbyIds } from '../gqlFunctions/OrderTable';
import {createOrderData, updateOrderData, deleteOrderData, getOrderviaID} from '../gqlFunctionTest/OrderTest';
import { createTask, deleteTask, updateTask, getTaskbyId } from '../gqlFunctions/OrderTaskTable';
import { createTaskData, updateTaskData, deleteTaskData, getTaskviaID} from '../gqlFunctionTest/OrderTaskTest';
import { addWorkFlow, deletWorkFlow, updateWorkflow, listWorkLFlow } from '../gqlFunctions/WorkflowTable';
import {workflowDetails, deleteWfData, updateWorkflowDetails} from '../gqlFunctionTest/WorkflowTest';
import { addWorkFlowDefinition, updatedefiniton, deleteDefinition , listDefintions } from '../gqlFunctions/WorkflowDef';
import {workflowdefinition, updateWorkflowDefinition, deleteDefData} from '../gqlFunctionTest/WorkflowDefTest';
import {uploadSingleComment,uploadMultipleComments} from '../s3tests/commentUploadFunc';
import {onChange} from '../s3tests/fileUploadFunc';
import { useState } from 'react';
import { LoremIpsum, Avatar } from 'react-lorem-ipsum';
import { WorkflowDummyData } from '../s3tests/dummyDataFunc';

const Test = () => {
  const [content,setcontent]=useState(null);
  const [contentnum,setcontentnum]=useState(null);
  const [num,setnum]=useState(null);
  const LoadBalancingPolicy = {
    ROUND_ROBIN : 'round robin',
    IP_HASH : 'ip hash',
    LEAST_CONNECTIONS : 'least connections',
  }
  
  const randomEnumValue = (enumeration) => {
    const values = Object.keys(enumeration);
    const enumKey = values[Math.floor(Math.random() * values.length)];
    return enumeration[enumKey];
  }


  
  /*console.log(randomEnumValue(LoadBalancingPolicy));
  console.log(LoremIpsum()[0].props.children);*/

  return (
    <div>
      <h1>Dummy data testing</h1>
      <input id ="input"  placeholder='Enter number of workflows' onChange={(Var)=>setnum(Var.target.value)}/>
      <button onClick ={()=>WorkflowDummyData(num)}>send multiple dummy comments to s3</button><br/><br/>


      <h1>S3 Test</h1>
      <input type="file" onChange={onChange} /><br/><br/>
      <input id ="input" placeholder='Enter Comment data' onChange={(Var1)=>setcontent(Var1.target.value)}/>
      <button onClick ={()=>uploadSingleComment(content)}>send dummy comment to s3</button><br/><br/>
      <input id ="input"  placeholder='Enter number of comments' onChange={(Var)=>setcontentnum(Var.target.value)}/>
      <button onClick ={()=>uploadMultipleComments(contentnum)}>send multiple dummy comments to s3</button><br/><br/>

      <h1>User table</h1>
      <button onClick={() => createNewUser(createUserData)}>Create new user</button><br/><br/>
      <button onClick={() => getUserByEmail(getDataViaMail.email)}>Get user by email</button><br/><br/>
      <button onClick={() => getUserBySupMail(getDataViaSuper.superwiserEmail)}>Get user by supermail</button><br/><br/>
      <button onClick={() => deleteUserByMail(deleteEmail)}>Delete by email</button><br/><br/>
      <button onClick={() => deleteUserBySupMail(deleteSuperMail.superwiserEmail)}>Delete by supermail</button><br/><br/>
      <button onClick={() => updateUserInfo(updateTheUser)}>Update User</button><br/><br/>

      <h1> Notif table</h1>
      <button onClick={() => createNewNotif(createNotifData)}>Create new notif</button><br/><br/>
      <button onClick={() => updateNotif(updateNotifData)}>Update notif </button><br/><br/>
      <button onClick={() => deleteNotifByMail(deleteNotif)}>Delete notif </button><br/><br/>
      <button onClick={() => listNotifications()}>List notifications </button><br/><br/>
      <button onClick={() => listNotifbyStatus(enumData)}>List notifications by status</button><br/><br/>
      <button onClick={() => convertStatus()}>convert status</button><br/><br/>


      <h1>validity checks</h1>
      <button onClick={() => validateEmail(testEmail.email)}>test mail </button><br/><br/>
      <button onClick={() => validatePhone(createUserData.phone)}>test number </button><br/><br/>

      <h1>order task</h1>
      <button onClick={() => createTask(createTaskData)}>Create new Task</button><br/><br/>
      <button onClick={() => updateTask(updateTaskData)}>update new Task</button><br/><br/>
      <button onClick={() => deleteTask(deleteTaskData)}>delete new Task</button><br/><br/>
      <button onClick={() => getTaskbyId(getTaskviaID)}>get new Task</button><br/><br/>

      <h1>order table</h1>
      <button onClick={() => createOrders(createOrderData)}>Create new order</button><br/><br/>
      <button onClick={() => updateOrders(updateOrderData)}>update new order</button><br/><br/>
      <button onClick={() => deleteOrders(deleteOrderData)}>delete new order</button><br/><br/>
      <button onClick={() => getOrderbyIds(getOrderviaID)}>get order</button><br/><br/>

      <h1>WF table</h1>
      <button onClick={()=>addWorkFlow(workflowDetails)}>Create workflow</button><br/><br/>
      <button onClick={()=>deletWorkFlow(deleteWfData)}>delete workflow</button><br/><br/>
      <button onClick={()=>updateWorkflow(updateWorkflowDetails)}>updated workflow</button><br/><br/>
      <button onClick={()=>listWorkLFlow()}>list workflow</button><br/><br/>

      <h1>WFD table</h1>
      <button onClick={()=>addWorkFlowDefinition(workflowdefinition)}>Create workflow Definition</button><br/><br/>
      <button onClick={()=>updatedefiniton(updateWorkflowDefinition)}>update workflow Definition</button><br/><br/>
      <button onClick={()=>deleteDefinition(deleteDefData)}>delete workflow Definition</button><br/><br/>
      <button onClick={()=>listDefintions()}>list workflow Definition</button><br/><br/>

    </div>
  )
}

export default Test