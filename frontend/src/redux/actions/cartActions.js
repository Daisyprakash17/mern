import * as actionTypes from "../constants/cartConstants"

import axios from 'axios'
export const addtocart =(productId,quantity)=>{
     
    return async(dispatch,getState)=>{
        const {data}=await axios.get(`/api/products/get-one/${productId}` )
        dispatch({
            type:actionTypes.ADD_TO_CART,
            payload:{
                productID:data._id,
                name:data.name,
                price:data.price,
                image:data.images[0]??null,
                count:data.count,
                quantity,
            }
        })
            localStorage.setItem('cart',JSON.stringify(getState().cart.cartItems))
    }
}

// here will defile the action and then reduce will use that actoin to reamove hte 
export const removeFromCart=(productID,quantity,price)=>{
    return async(dispatch,getState)=>{
        dispatch({
            type:actionTypes.REMOVE_FROM_CART,
            payload:{
                productID,
                quantity,
                price
            }
        })
        localStorage.setItem('cart',JSON.stringify(getState().cart.cartItems))
    }
}

export const removeAllProducts=()=>{
    return async(dispatch,getState)=>{ 
        dispatch({
            type:actionTypes.REMOVE_ALL_PRODUCTS,
            payload:{}
        })
        localStorage.setItem('cart',JSON.stringify(getState().cart.cartItems))
    }
}