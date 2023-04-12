import { useState} from'react';
import AuthModal from '../components/AuthModal';
import Nav from "../components/Nav";
import { useCookies } from 'react-cookie';

const Home = () => {
    
        
        const[isSignUp,setIsSignUp]= useState(true);
        const[showModal, setShowModal] = useState(false);
        const [cookies, setCookie, removeCookie] = useCookies(['user']);
        const authToken = cookies.AuthToken;
        const handleClick = () => {
            if (authToken) {
                removeCookie('UserId', cookies.UserId)
                removeCookie('AuthToken', cookies.AuthToken)
                window.location.reload()
                return
            }
           setShowModal(true);
           setIsSignUp(true);
           
        }
        
        return (
            <div className="overlay">
               <Nav 
                minimal={false}
                setShowModal={setShowModal}
                authToken={authToken}
                showModal={showModal}
                setIsSignUp={setIsSignUp}
                />
                 <div className ="home">
                 <h1 className="primary-title">Swipe Right®</h1>    
                 <button className="primary-button" onClick={handleClick}>
                     {authToken?"signout":"createAccount"}
                 </button>
                 {showModal && (<AuthModal setShowModal={setShowModal}                                      
                                           isSignUp={isSignUp}
                             />)}
                 </div>
            </div>
        )
    }
    
    
  export default Home;