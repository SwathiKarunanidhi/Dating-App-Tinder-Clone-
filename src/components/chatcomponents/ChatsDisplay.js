import Chat from "./Chat";
import ChatInput from './ChatInput';
import { connect } from "react-redux";
import  * as actions from '../../actions'
import { useState, useEffect } from "react";

const ChatsDisplay = ({user,clickedUser,get_user_messages}) =>
{
  const [userMessages, setUserMessages] = useState(null);
  const [clickedUserMessages, setClickedUserMessages] = useState(null);
  
  const getUserMessages = async() => {
    const value = {
      userId : user?.uniqueId,
      correspondingUserId: clickedUser?.uniqueId
    }
    try
    {
      const resp = await get_user_messages(value);
      console.log("resp",resp.data);
      setUserMessages(resp.data);
     
    }
    catch(error)
    {
      console.log(error)
    } 
  }
  const getClickedUserMessages = async() => {
    const value = {
      userId : clickedUser?.uniqueId,
      correspondingUserId: user?.uniqueId
    }
    try
    {
      const resp = await get_user_messages(value);
      setClickedUserMessages(resp.data);
      console.log(resp);
    }
    catch(error)
    {
      console.log(error)
    } 
  }
  useEffect(()=>{
    getUserMessages()
    getClickedUserMessages()
  },[])
  const messages = []
  userMessages?.forEach(element => {
    const formattedMessages={}
    formattedMessages['name']=user?.first_name
    formattedMessages['image']= window.URL.createObjectURL(new Blob([Int8Array.from(user.Profile_Image.data.data)],{type: user.Profile_Image.contentType }))
    formattedMessages['message']=element?.msg
    formattedMessages['timeStamp']=element?.timeStamp
    messages.push(formattedMessages);
  }); 

  clickedUserMessages?.forEach(element => {
    const formattedMessages={}
    formattedMessages['name']=clickedUser?.first_name
    formattedMessages['image']= window.URL.createObjectURL(new Blob([Int8Array.from(clickedUser.Profile_Image.data.data)],{type: clickedUser.Profile_Image.contentType }))
    formattedMessages['message']=element?.msg
    formattedMessages['timeStamp']=element?.timeStamp
    messages.push(formattedMessages);
  }); 

  const descOrderMessages = messages?.sort((a,b)=>{a.timeStamp.localeCompare(b.timeStamp)})
  console.log("Messages formatted:",descOrderMessages);
  
  return (
      <div className='chat-display'>
          <Chat descOrderMessages={descOrderMessages}/>
          <ChatInput user={user} clickedUser={clickedUser} getUserMessages={getUserMessages} getClickedUserMessages={getClickedUserMessages}/>
      </div>
  )
}
function mapStateToProps(state)
{
  return state;
}
export default connect(mapStateToProps,actions)(ChatsDisplay);