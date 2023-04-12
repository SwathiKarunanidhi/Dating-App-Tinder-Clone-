import ChatHeader from './ChatHeader';
import { useState } from 'react';
import MatchesDisplay from '../MatchesDisplay';
import ChatsDisplay from './ChatsDisplay';
import {connect} from 'react-redux'

const ChatContainer = ({user}) => 
{
  const [clickedUser,setClickedUser]= useState(null);
  console.log("ChatConatainer ClickedUser:",clickedUser);
  return (
      <div className="chat-container">
          
          <ChatHeader user ={user}/>
          <div>
               <button className="option" onClick={()=>setClickedUser(null)}>Matches</button>
               <button className="option" disabled={!clickedUser}>Chats</button>
          </div>
          {!clickedUser && <MatchesDisplay matches ={user.user.matches} setClickedUser={setClickedUser}/>}
          {clickedUser  && <ChatsDisplay user={user.user} clickedUser ={clickedUser}/>}
      </div>
  )
}
function mapStateToProps (state )
  {   
    return state;
  }
export default connect (mapStateToProps ) (ChatContainer);