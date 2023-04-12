
import {useState} from "react";

const Login = () => {
    const {email,setEmail} = useState(null);
    const {password,setPassword} = useState(null);
    const {error,setError} = useState(null);

    const handleLogin = (e) =>{
      e.preventDefault();
      }

    return (
        <div>
           <form onSubmit={handleLogin}>
             <input
               type="email"
               placeholder="email"
               id="email"
               name="email"
               required ={true}
               onChange= {(e)=>{setEmail(e.target.value)}}
               />
               <input
               type="password"
               id="password"
               name="password"
               required={true}
               onChange ={(e)=>{setPassword(e.target.value)}}
               />
               <input type= "submit"/>        
               <p>{error}</p>
               
           </form>
        </div>
    )
}

export default Login;