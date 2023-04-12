import { FETCH_USER } from "../actions/types";
import { PUT_USER } from "../actions/types";
import { UPDATE_USER } from "../actions/types";
import { CURRENT_USER } from "../actions/types";

export default function (state = null, action) 
{
  
switch (action.type)
{
  case FETCH_USER:
      return action.payload || false;
  case PUT_USER:
      return action.payload || false;  
  case UPDATE_USER:
      return action.payload || false; 
  case CURRENT_USER:
      return action.payload || false;  
  
  default:   
      return state; 

}
}