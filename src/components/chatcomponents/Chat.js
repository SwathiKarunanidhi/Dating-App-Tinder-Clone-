const Chat = ({descOrderMessages}) =>
{
  return (
      <div className="chat-display">
         {descOrderMessages.map((message, _index)=>
          <div key = {_index}>
            <div className="chat-message-header">
              <div className="img-container">
              <img src = {message.image} alt ={message.name}/>
               </div> 
               <p>{message.message}</p> 
            </div>
          </div>
         )}

      </div>
  )
}
export default Chat;