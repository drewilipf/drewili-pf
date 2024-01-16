import userSlice, {
  getUserSlice,
  postUserSlice,
  putUserSlice,
  getUserByIdSlice,
  deletedUserSlice,
  postGoogleSlice,
  putPassRecoverySlice,
  getUserByUsernameSlice
} from "./userSlice";
import axios from "axios";

const API_URL = "https://drewili-pf-back.onrender.com/user";

export const getUser = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(API_URL);

      const users = response.data;

      dispatch(getUserSlice({ users }));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
};
export const postUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(API_URL, userData);

      const users = response.data;

      dispatch(postUserSlice({ users }));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
};
export const putUser = (id, userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, userData);
      const userId = response.data;
      dispatch(putUserSlice({ userId }));
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
};
export const getUserId = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/bypk/${id}`);
      const user = response.data;
      dispatch(getUserByIdSlice({ user }));
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
};
export const getUserByUsername = (username) => {
  return async (dispatch) => {
    try {
      console.log("data recibida al thunk", `${API_URL}/username?username=${username}`)
      const response = await axios.get(`${API_URL}/username?username=${username}`);
      const user = response;
      console.log("thunk response", user.status)
      dispatch(getUserByUsernameSlice(user.status));
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Si es un error 400, envía el mensaje de error al slice
        dispatch(getUserByUsernameSlice(error.response.status))}
      console.error("Error fetching product:", error);
      
    }
  };
};
export const deletedUser = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      const userId = response.data;
      console.log(userId);
      dispatch(deletedUserSlice({ userId }));
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
};
export const postGoogle = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}/google`, userData);

      const users = response.data;

      dispatch(postGoogleSlice(users));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
};

export const putPassRecovery = (passrecoverydata) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${API_URL}/password/update`, {userName: passrecoverydata.username, password: passrecoverydata.password});
      console.log(response.status)
        dispatch(putPassRecoverySlice(response.status));
     
    } catch (error) {
      console.error("Error al enviar datos:", error);

      // Despachar la acción para actualizar el estado con el resultado de la modificación de contraseña (en caso de error)
      dispatch(putPassRecoverySlice({ userModificationResult: { success: false, error: error.message } }));
    }
  };
};




