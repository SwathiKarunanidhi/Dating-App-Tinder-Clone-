import {useState} from "react";
import * as actions from "../actions";
import { connect } from "react-redux";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

const AuthModal = ({setShowModal,setIsSignUp, isSignUp, put_user, fetch_user}) => {
    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);
    const [error,setError] = useState(null);
    let navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const handleClick = () =>
    {
     setShowModal(false);
     setIsSignUp(true);

    }
    const handleRegister =  async (e) => {
      e.preventDefault();
    
      try{
        const values = {email: String(email),password: password}
        if(email===null)
        {
          setError("Enter email");
          return;
        } 
        
        else if (isSignUp && (password!==confirmPassword))
        {
            setError("Password doesn't match");
            return;
        }  
        else
        {  
            console.log("values:",values);
            const res =  isSignUp ?  await put_user(values) : await fetch_user(values);    
            const status = res.status ===201;
            if(status)
            {
            setCookie('UserId',res.data.user_id);
            setCookie('AuthToken',res.data.token);
            setCookie('Email',email);
            }
            console.log(cookies.UserId);
            console.log("res:",res);
            console.log("cookies",cookies);
          
                        
            if(status && isSignUp)
            {
             navigate('/Onboarding');
            }
            else if(status && !isSignUp)
            {
             navigate('/Dashboard');
            }        
            else
            {
              console.log(res.data);
              setError(res.data);
            }  
           
        }
        
      }
      catch(error)
      {
          console.log(email);
          console.log("Register:",error);
      }
     
    }
    
    return (
        <div className="auth-modal">
           <div className="close-icon" onClick={handleClick}>ⓧ</div>
           <h2>{isSignUp?"Create Account":"Login"}</h2>
           <form  onSubmit={handleRegister}>
               <input
               type="email"
               placeholder="email"
               id="email"
               required={true}
               name="email"
               onChange= {(e)=>{setEmail(e.target.value)}}
               />            
               <input
               type="password"
               id="password"
               name="password"
               placeholder="password"
               required={true}
               onChange ={(e)=>{setPassword(e.target.value)}}
               />
                {isSignUp && <input
               type="password"
               id="confirmpassword"
               name="confirmpassword"
               placeholder="confirm password"
               required={true}
               onChange ={(e)=>{setConfirmPassword(e.target.value)}}
               />}
               <input className="secondary-button" type="submit" />
               <p className="error">{error}</p>
           </form>
           
        </div>
    )
}
function mapStateToProps (state )
  {
    console.log("state",state);
    console.log(actions)
    return state;
  }
export default connect(mapStateToProps, actions)(AuthModal);