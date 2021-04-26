import request from "../api/request";
import {FETCH_USER, TOKEN} from "../helper";


export const actFetchUser = formValue => async dispatch => {
    console.log(formValue);
    try{
        let res = await request.post('auth/login', formValue);
        console.log('login',res)
        dispatch({
            type: FETCH_USER,
            payload: res.data,
        });
        localStorage.setItem(TOKEN,res.data.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.data.user))

        window.location.href='/cart';
    } catch(e) {
        console.log(e);
        return e
    }
};
