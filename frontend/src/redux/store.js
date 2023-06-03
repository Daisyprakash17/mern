
import {combineReducers, createStore,applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducers';
import { userRegisterLoginReducer } from './reducers/userReducres';
import { getcategoryReducer } from './reducers/categoryReducers';
import { adminChatReducer } from "./reducers/adminChatReducers";
const reducer=combineReducers({
    cart:cartReducer,
    userRegisterLogin:userRegisterLoginReducer,
    getCategories:getcategoryReducer,
    adminChat: adminChatReducer,

})

// storing the user's login detail in the local storage because 
// as soom we refresh the page that data in the redux will be set to the default values
// so we will store the data in the local storage
const userInfoLocalStorage=()=>{
    if(localStorage.getItem('userinfo'))
    return JSON.parse(localStorage.getItem('userinfo'));
    
    if(sessionStorage.getItem('userinfo'))
    return JSON.parse(sessionStorage.getItem('userinfo'));

    return {}
}
const getCartItemFromLS=()=>{
    if(localStorage.getItem('cart'))
    return JSON.parse(localStorage.getItem('cart'));
    return []
}
const getCartItemsCount=()=>{
    const items=localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[];
    let sum=0;
    items.map((item)=>{
        sum+=Number(item.quantity);
    })
    return sum;
}
const getCartItemsTotal=()=>{
    const items=localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[];
    let total=0;
    items.map((item)=>{
        total+=Number(item.quantity)*Number(item.price);
    })
    return total;
}
const INITIAL_STATE={
    cart:{
        cartItems:getCartItemFromLS(),
    itemsCount:getCartItemsCount(),
    cartSubTotal:getCartItemsTotal(),
    },
    userRegisterLogin:{
        userinfo : userInfoLocalStorage()
    },
    getCategories:[]
}
const middleware=[thunk];
const store=createStore(reducer,INITIAL_STATE,composeWithDevTools(applyMiddleware(...middleware)))
// this is the simple way to implement the reducer in which we have to define actions using dispatch and reducer
// and then pass theese reducer so as to create the store

// const counterReducer=(state={value:0},action)=>{
//     switch(action.type)
//     {
//         case 'add':
//             return {value:state.value+1+action.somevalue}
//     }
//     return state;
// }
// const store=createStore(counterReducer,composeWithDevTools());
 
// store.dispatch({
//     type:'add',
//     somevalue:10
// }) 
export default store;