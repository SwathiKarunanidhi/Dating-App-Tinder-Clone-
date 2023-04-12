import { connect } from "react-redux";
import { useState, useEffect } from "react";
import * as actions from '../actions';
import {useCookies} from "react-cookie";


const MatchesDisplay = ({matches, get_matched_users, setClickedUser}) =>
{
  const [matchedProfiles,setMatchedProfiles]=useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  console.log("matchespassed",matches) 
  const matchedUsersArray = matches?.map(({user_id})=>user_id);
  console.log(matchedUsersArray);
  const userId = cookies.UserId;

  const getMatches = async () =>{
    try{
      console.log(matchedUsersArray)
      const res = await get_matched_users(JSON.stringify(matchedUsersArray));
      setMatchedProfiles(res.data);
      console.log("match-display",res.data);
      
    }
    catch(error){
      console.log(error);
    }
   
  }
  
  useEffect(() => {
    getMatches();
  }, [matches]);

  /*const filteredMatchedProfiles = matchedProfiles?matchedProfiles.filter(
    (matchedProfile) =>
      matchedProfile.filter((profile) => profile.uniqueId == userId).length > 0
  ):null;*/
 

  return (
      <div className="matches-display">
               
        {matchedProfiles?matchedProfiles.map((match,_index)=>
           <div key={{_index}} className="match-card" 
           onClick={() => setClickedUser(match)}
           >
               <div className="img-container">
               <img src={window.URL.createObjectURL(new Blob([Int8Array.from(match.Profile_Image.data.data)], 
                     {type: match.Profile_Image.contentType }))
                     } alt = {match.first_name}/>
                    
              </div> 
              <h3>{match.first_name}</h3>
         </div>
        ):<h2>loading...</h2>}

      </div>
  )
}
function mapStateToProps(state)
{
  return state;
}
export default connect(mapStateToProps, actions)(MatchesDisplay) ;