import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index';





export const signin = (form, history) => async (dispatch) => {
    try{
        const { data } = await api.signin(form)

        dispatch({ type: AUTH, data });

        history('/');
    }catch(error) {
        console.log(error.message);
    }
}

export const RegisterNow = (formData, history) => async (dispatch) => {
    try {
        
        const { data } = await api.RegisterNow(formData);

        dispatch({ type: AUTH, data });

        history('/');
    } catch (error) {
        console.log(error);
    }
};