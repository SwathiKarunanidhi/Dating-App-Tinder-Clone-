import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import "./index.css";
import * as actions from "./actions";
import { connect } from "react-redux";
import { useCookies } from "react-cookie";
import {BrowserRouter,Routes,Route } from "react-router-dom"
import Onboarding from "./Pages/Onboarding";



const App = () => {
    const [cookies,setCookie,removeCookie]= useCookies(['null']);
    const authToken = cookies.AuthToken;
    return (
        <div>
           <BrowserRouter>
           <Routes>    
           <Route path='/' element ={<Home/>}/>
           {authToken && <Route path = '/Dashboard' element={<Dashboard/>}/>}
           {authToken && <Route path='/Onboarding' element ={<Onboarding/>}/>}
           </Routes>
           </BrowserRouter> 
           
        </div>
    )
}
export default connect (null,actions)(App);
