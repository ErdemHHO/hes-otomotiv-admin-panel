

import { ADMINAUTH } from "../constants/actionTypes";
import * as api from '../api/index'

export const adminSignin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.adminGirisYap(formData);
    dispatch({ type: ADMINAUTH, data });
    navigate('/');
    return { success: true, message: data.message };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
