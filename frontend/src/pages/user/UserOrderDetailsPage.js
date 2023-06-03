 

 import React from 'react'
import UserOrderDetailsPageComponent from './components/UserOrderDetailsPageComponent'
import {useSelector} from 'react-redux'
import axios from  'axios'
import {loadScript} from "@paypal/paypal-js"
 export default function UserOrderDetailsPage() {
  const {userinfo}=useSelector((state)=>state.userRegisterLogin);
  const getuser=async()=>{
    const {data}=await axios.get('/api/users/profile/'+userinfo._id);
    
    return data;
  }
  const getorder=async(orderid)=>{
    const {data}=await axios.get('/api/orders/user/'+orderid);
    return data
  }
  // this is where we are loading the paypal script to render the button aand
   // also inttiallizing the methods like oncreate,oncancel,onapprove ,ondelete
  const loadpaypalscripthandler=(cartSubTotal,cartItems,orderId,updatestateafterOrder)=>{
    loadScript({"client-id":"AQ1YHXWN_qRdz6oqx6lhiWmKNTEpwOkPzA3hrUNYcfKl_zGL-7zPZsHSh-cvHchLaV_xdOJ1zbKMg6Js"})
    .then((paypal)=>{
        paypal.Buttons(buttons(cartSubTotal,cartItems,orderId,updatestateafterOrder)).render("#paypal-container-element")
    })
    .catch((err)=>{
        console.log("fail to load the paypal JS SDK script",err);
    })
  }
  // dumpu user id and password to make payment
  // userid sb-zy43aa25591279@personal.example.com
  // password password used to auto update so copy from paypal developer 
  const buttons = (cartSubtotal, cartItems,orderId,updatestateafterOrder) => {
    return {
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: cartSubtotal,
                            breakdown: {
                                item_total: {
                                    currency_code: "USD",
                                    value: cartSubtotal,
                                }
                            }
                        },
                        items: cartItems.map(product => {
                            return {
                               name: product.name,
                                unit_amount: {
                                   currency_code: "USD", 
                                   value: product.price,
                                },
                                quantity: product.quantity,
                            }
                        })
                    }
                ]
            })
        },
        onCancel: onCancelHandler,
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (orderData) {
              var transaction = orderData.purchase_units[0].payments.captures[0];
              if (transaction.status === "COMPLETED" && Number(transaction.amount.value) === Number(cartSubtotal)) {
                  updateOrder(orderId).then((data)=>{
                    if(data.isPaid)
                    updatestateafterOrder(data.paidAt)
                  }).catch((err)=>{console.log(err)})
              }
          })
      },
        onError: onErrorHandler,
    }
}

  
  const onCancelHandler=function(){
    console.log('cancel');
  }
   
  const onErrorHandler=function(){
    console.log('error');
  }
  const updateOrder=async(orderId)=>{
    const {data}=await axios.put("/api/orders/paid/"+orderId);
    return data;
  }
  return <UserOrderDetailsPageComponent
    userinfo={userinfo}
    getuser={getuser}
    getorder={getorder}
    loadpaypalscripthandler={loadpaypalscripthandler}
    />
 }
 