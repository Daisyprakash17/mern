import React from 'react'
import CartPageComponent from './components/CartPageComponent'

import {useSelector,useDispatch} from 'react-redux'
import {addtocart ,removeFromCart} from '../redux/actions/cartActions'
export default function CartPage() {
  const {cartItems,cartSubTotal,}=useSelector((state)=>state.cart);
  const reduxdispatch=useDispatch();
  return <CartPageComponent cartItems={cartItems} cartSubTotal={cartSubTotal} reduxdispatch={reduxdispatch} addtocart={addtocart} removeFromCart={removeFromCart}/>
}
