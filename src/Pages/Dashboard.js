import { useEffect, useState } from "react";
import TinderCard from 'react-tinder-card';
import { useCookies } from "react-cookie";
import {connect} from "react-redux";
import * as actions from '../actions';
import ChatContainer from '../components/chatcomponents/ChatContainer';



const Dashboard = ({get_current_user, get_gendered_users, update_matches, currentuser}) => {
       
    const [user, setUser] = useState(null);
    const [genderedUsers,setGenderedUsers] =useState(null);  
    const [lastDirection,setLastDirection]=useState(null);  
    const [cookies] = useCookies(['user']);
    const user_id = cookies.UserId; 
    
    

    useEffect( () => {
      console.log("calling get user..")
      getUser();
      
   }, [])
   
   useEffect( () => {
    if(user)
    {  
     getGenderedUsers(user.user);
    } 
  }, [user])

    const getUser = async () =>
    {
     try {
        console.log("getting current user:")
        const res = await get_current_user(user_id);
        setUser(res.data);       
     }
     catch(err)
     {
         console.log(err);
     }
    }  

    const getGenderedUsers = async (user) =>
    {
     try {
        console.log("gendered users")
        console.log("user in GU", user.Gender_Interest);
        const res = await get_gendered_users(user.Gender_Interest);
        console.log("gendered",res.data);
        setGenderedUsers(res.data);
        }

     catch(err)
     {
         console.log(err);
     }
    }  
    const swiped = async (direction,swipedUserId) => 
    {
      if(direction == 'right')
       {
        try{
          let res = await update_matches(user_id,swipedUserId);
          console.log(res);
          getUser();
        }
        
        catch(err){
          console.log(err);
        }
        
       } 
      setLastDirection(direction); 
    }
    const outOfFrame = () => 
    {

    }
    const onSwipe = () => 
    {

    } 
    const onCardLeftScreen = () =>
    {

    }  
    
    const matchedUsers  = genderedUsers?user.user.matches.map(({uniqueId})=>uniqueId).concat(user_id):console.log("userhere:",user);
    const filteredMatches = genderedUsers?.filter(
      genderedUser => !matchedUsers.includes(genderedUser.uniqueId)
    )
    
    
    
    return (
        <>
             {user && 
                <div className="dashboard">
                
                <ChatContainer user={user}/>
                <div className="swipe-container">
                    <div className="card-container">
                      {filteredMatches? filteredMatches.map((maybematchuser)=> 
                                                                         
                            <TinderCard
                                className="swipe"
                                key={maybematchuser.first_name}
                                onSwipe={(dir) => swiped(dir, maybematchuser.uniqueId)}
                                onCardLeftScreen={() => outOfFrame()}>                               
                                <div style={{backgroundImage: "url(" + window.URL.createObjectURL(new Blob([Int8Array.from(maybematchuser.Profile_Image.data.data)], {type: maybematchuser.Profile_Image.contentType })) + ")"}} className="card">
                                <h3>{maybematchuser.first_name}</h3>
                                </div>
                            </TinderCard>
                            
                           
                          ):<h2>loading...</h2>}
                        <div className="swipe-info">
                            {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
                        </div>
                    </div>
                </div>
                
            
                
               </div>
               
            }
       </>
    )
}

function mapStateToProps (state )
  {
    
    return { currentuser:state.auth};
  }
export default connect(mapStateToProps, actions)(Dashboard);