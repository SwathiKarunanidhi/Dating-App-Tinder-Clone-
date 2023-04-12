import { GENDERED_USERS, MATCHED_USERS, UPDATE_MATCHES} from "../actions/types";

export default function (state = null, action) 
{
  
switch (action.type)
{
  case GENDERED_USERS:
     return action.payload  || false; 
  case UPDATE_MATCHES: 
     return action.payload  || false; 
  case MATCHED_USERS:
     return action.payload  || false;  
  default:   
      return state; 

}
}