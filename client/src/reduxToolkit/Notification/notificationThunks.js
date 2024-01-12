import {
    postNotificationStart,
    postNotificationSuccess,
    postNotificationFailure,
  } from "./notificationSlice";
  import axios from "axios";
  
  const API_URL = "https://drewili-pf-back.onrender.com/nodemailer/";
  
  export const postNotificationCreation = (maildata) => {
    return async (dispatch) => {
      try {
        dispatch(postNotificationStart());
  
        const response = await axios.post(`${API_URL}userregister`, maildata);
  
        dispatch(postNotificationSuccess({ notification: response.data }));
      } catch (error) {
        dispatch(postNotificationFailure({ error: error.message }));
      }
    };
  };
  
  export const postNotificationUserConfirmBuy = (usermaildata) => {
    return async (dispatch) => {
      try {
        dispatch(postNotificationStart());

        console.log("estos son los datos que recibe el thunk del usermail", usermaildata)
  
        const response = await axios.post(`${API_URL}userCormirmBuy`, usermaildata);
  
        dispatch(postNotificationSuccess({ notification: response.data }));
      } catch (error) {
        dispatch(postNotificationFailure({ error: error.message }));
      }
    };
  };

  export const postNotificationAdminConfirmBuy = (adminmaildata) => {
    return async (dispatch) => {
      try {
        dispatch(postNotificationStart());
        console.log("estos son los datos que recibe el thunk del adminmail", adminmaildata)
        const response = await axios.post(`${API_URL}adminConfirmBuy`, adminmaildata);
  
        dispatch(postNotificationSuccess({ notification: response.data }));
      } catch (error) {
        dispatch(postNotificationFailure({ error: error.message }));
      }
    };
  };

  export const postNotificationRecoveryPassword = (emailData) => {
    return async (dispatch) => {
      try {
        dispatch(postNotificationStart());
        console.log("estos son los datos que recibe el thunk del recovery", emailData)
        const response = await axios.post(`${API_URL}adminConfirmBuy`, emailData);
  
        dispatch(postNotificationSuccess({ notification: response.data }));
      } catch (error) {
        dispatch(postNotificationFailure({ error: error.message }));
      }
    };
  };
 
  
  