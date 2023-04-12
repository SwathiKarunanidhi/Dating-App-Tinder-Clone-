import {useState} from 'react';
import{connect} from 'react-redux';
import * as actions from "../../actions";

const ChatInput = ({user, clickedUser, getUserMessages, getClickedUserMessages, send_messages}) =>
{
  const [textInput,setTextInput] = useState("");  
  const user_Id = user?.uniqueId;
  const clickedUser_Id= clickedUser.uniqueId;
  const sendMessage = async() =>
  {
    const value = {
       from_User:user_Id,
       to_User:clickedUser_Id,
       msg:textInput,
       timeStamp: new Date().toISOString()
    }
   
    try {
       const resp = await send_messages(value);
       getUserMessages();
       getClickedUserMessages();
       setTextInput("");
    }
    catch(err)
    {
       console.log(err);
    }
  }
  return (
      <div className="chat-input">
         <textarea 
            value ={textInput}
            onChange = {(e)=> setTextInput(e.target.value)}
         /> 
         <button className="secondary-button" onClick={sendMessage}>Submit</button>
      </div>
  )
}

function mapStateToProps (state )
  {   
    return state;
  }
export default connect (mapStateToProps, actions)(ChatInput);