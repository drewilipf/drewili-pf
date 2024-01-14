import userSlice, {
  getUserSlice,
  postUserSlice,
  putUserSlice,
  getUserByIdSlice,
  deletedUserSlice,
  postGoogleSlice,
  putPassRecoverySlice,
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
      const response = await axios.put(`${API_URL}/password/update`, passrecoverydata);
      

      // Verificar si la respuesta tiene un código de estado 200
      if (response.status === 200) {
        const userModificated = response.status; // Asumo que la información que necesitas está en response.data

        // Despachar la acción para actualizar el estado con el resultado de la modificación de contraseña
        dispatch(putPassRecoverySlice({ userModificationResult: { success: true, userModificationResult: userModificated } }));
      console.log(userModificated)
      } else {
        console.error("Error en la solicitud:", response.status);

        // Despachar la acción para actualizar el estado con el resultado de la modificación de contraseña (en caso de error)
        dispatch(putPassRecoverySlice({ userModificationResult: { success: false, error: "Error en la solicitud" } }));
      }
    } catch (error) {
      console.error("Error al enviar datos:", error);

      // Despachar la acción para actualizar el estado con el resultado de la modificación de contraseña (en caso de error)
      dispatch(putPassRecoverySlice({ userModificationResult: { success: false, error: error.message } }));
    }
  };
};




