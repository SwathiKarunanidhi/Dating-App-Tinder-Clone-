import { useCookies } from "react-cookie";
import{connect} from 'react-redux'
const ChatHeader = ({user}) =>
{
   const [cookies,setCookie,removeCookie] = useCookies(['user']);
   const blob = new Blob([Int8Array.from(user.Profile_Image.data.data)], {type: user.Profile_Image.contentType });
   const image = window.URL.createObjectURL(blob);
   console.log(image);
   
   const logout = () =>
   {
     removeCookie('UserId',cookies.UserId);
     removeCookie('AuthToken', cookies.AuthToken);
     window.location.reload();
   }
   return (
      <div className ="chat-container-header">
         <div className='profile'>
            <div className='img-container'>
               <img src={image}  />
            </div>
            <p>{}</p>
            <h3>{user.first_name}</h3>
         </div>
         <i className='log-out-icon' onClick={logout}>⇦</i>
      </div>
  )
}
function mapStateToProps (state)
  {
    console.log("state",state);
   
    return state.auth;
  }
export default connect (mapStateToProps ) (ChatHeader);
