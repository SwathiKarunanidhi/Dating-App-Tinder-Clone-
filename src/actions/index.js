import axios from "axios";
import { FETCH_USER } from "./types";
import { PUT_USER } from "./types";
import { UPDATE_USER } from "./types";
import { CURRENT_USER } from "./types";
import { GENDERED_USERS } from "./types";
import { UPDATE_MATCHES } from "./types";
import { MATCHED_USERS } from "./types";
import { GET_MESSAGES, SEND_MESSAGES } from "./types";

   export const fetch_user = (values) =>
   async(dispatch) =>
    {
      let response ;
      try {
         response = await axios.post('/api/getUser',values);
         console.log("in fetch action:",response)
         dispatch({ type: FETCH_USER, payload: response.data});
         } 
        
      catch (err) {
         response = err;
         console.log("error:",err);
         
        }        
      finally
      {
         return response;
      }       
       
    };

   export const put_user = (values) =>
    async(dispatch) =>
     {
      let response ;
      try {
         response = await axios.post('/api/createUser',values);
         console.log("response in indexreducer:",response.data);
         dispatch({ type: PUT_USER, payload: response.data});
         } 
      catch (err) {
         response = err;
         console.log("error in put:",err);
        }        
      finally
      {
         return response;
      }       
     };
 
   export const update_user = (formData,config) =>
    async(dispatch) =>
     {
      let response ;
      console.log("we are in update user action");
      try {
         response = await axios.post('/api/updateUser',formData);
         console.log("response in indexreducer:",response.data);
         dispatch({ type: UPDATE_USER, payload: response.data});
         } 
      catch (err) {
         response = err;
         console.log("error in put:",err);
        }        
      finally
      {
         return response;
      }       
     };
    
   export const get_current_user = (value) =>
      async (dispatch) =>
      {
      let response ;
      console.log("we are in getcurrentuser action");
      try {
         response = await axios.get(`/api/getCurrentUser?user_id=${value}`);
         console.log("response in indexaction get user:",response.data);
         dispatch({ type: CURRENT_USER, payload: response.data});
         } 
      catch (err) {
         response = err;
         console.log("error:",err);
        }        
      finally
      {
         console.log("sending response to dashboard")
         return response;
      }   
      }

   export const get_gendered_users = (value) =>
      async (dispatch) =>
      {
      let response ;
      console.log("we are in getting gendered users");
      try {
         response = await axios.get('/api/getGenderedUsers',
                  {
                     params:
                         {  gender:value }
                  }
                  );
         console.log("response in indexaction:",response.data);
         dispatch({ type: GENDERED_USERS, payload: response.data});
         } 
      catch (err) {
         response = err;
         console.log("error in put:",err);
        }        
      finally
      {
         return response;
      }   
      }   

   export const update_matches = (user_id,swipedUserId) =>
      async(dispatch) =>
     {
     let response ;
     console.log("we are in update matches action");
     try {
       response = await axios.put('/api/updateMatches',{user_id,swipedUserId});
       console.log("response in indexreducer:",response.data);
       dispatch({ type: UPDATE_MATCHES, payload: response.data});
       } 
     catch (err) {
       response = err;
       console.log("error in put:",err);
      }        
     finally
     {
       return response;
     }       
    }  
    
    export const get_matched_users = (value) =>
      async (dispatch) =>
      {
      let response ;
      console.log("we are in getting matched users");
      console.log("Value:",value);
      try {
         response = await axios.get('/api/getMatchedUsers',
                  {
                     params:
                         {  userIds:value }
                  }
                  );
                 
         console.log("response in indexaction:",response.data);
         dispatch({ type: MATCHED_USERS, payload: response.data});
         } 
      catch (err) {
         response = err;
         console.log("error in put:",err);
        }        
      finally
      {
         return response;
      }   
      }  

    export const get_user_messages = (value) =>
     async (dispatch) =>
      {
      let response ;
      console.log("we are in getting messages");
      console.log("Value:",value);
      try {
         response = await axios.get('/api/getUserMessages',
                  {
                     params:
                         {  userId:value.userId,
                            correspondingUserId:value.correspondingUserId }
                  }
                  );
                 
         console.log("response in indexaction:",response.data);
         dispatch({ type: GET_MESSAGES, payload: response.data});
         } 
      catch (err) {
         response = err;
         console.log("error in put:",err);
        }        
      finally
      {
         return response;
      } 

    }

    export const send_messages = (value) =>
     async (dispatch) =>
      {
      let response ;
      console.log("we are in sending messages");
      console.log("Value:",value);
      try {
         response = await axios.post('/api/sendMessages',value);     
         console.log("response in indexaction:",response.data);
         dispatch({ type: SEND_MESSAGES, payload: response.data});
         } 
      catch (err) {
         response = err;
         console.log("error in put:",err);
        }        
      finally
      {
         return response;
      } 

    }