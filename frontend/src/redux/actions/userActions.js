import { LOGIN_USER ,LOGOUT_USER} from "../constants/userConstants";
import axios from 'axios'
export const setReduxUserState=(userCreated)=>{
    return (dispatch)=>{
        dispatch({
            type:LOGIN_USER,
            payload:userCreated
        })
    }
}

export const logout=()=>{
    return  (dispatch)=>{
        document.location.href='/login';
        axios.get('/api/logout').then((res)=>{
            console.log(res);
        });
        localStorage.removeItem('userinfo')
        sessionStorage.removeItem('userinfo')
        localStorage.removeItem('cart');
        dispatch({type:LOGOUT_USER})
    }
}