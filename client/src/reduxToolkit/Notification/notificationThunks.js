import {
    postNotificationStart,
    postNotificationSuccess,
    postNotificationFailure,
  } from "./notificationSlice";
  import axios from "axios";
  
  const API_URL = "https://drewili-pf-back.onrender.com/notification";
  
  export const postNotificationCreation = (user_email, user_name ) => {
    return async (dispatch) => {
      try {
        dispatch(postNotificationStart());
        
       
        const response = await axios.post(API_URL/userRegister, {user_email, user_name } );
        userBuyConfirmation
        adminbuyconfirmation
        dispatch(postNotificationSuccess({ notification: response.data }));
      } catch (error) {
        dispatch(postNotificationFailure({ error: error.message }));
      }
    };
  };

  export const postNotificationBuy = (user_email, user_name, product ) => {
    return async (dispatch) => {
      try {
        dispatch(postNotificationStart());
        
       
        const response = await axios.post(API_URL/creation, {user_email, user_name, product } );
        
        dispatch(postNotificationSuccess({ notification: response.data }));
      } catch (error) {
        dispatch(postNotificationFailure({ error: error.message }));
      }
    };
  };
  
  