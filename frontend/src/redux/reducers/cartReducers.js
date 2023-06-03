import * as actionTypes from "../constants/cartConstants"

const CART_INTIAL_STATE={
    cartItems:[],
    itemsCount:0,
    cartSubTotal:0,
}
export const cartReducer =(state=CART_INTIAL_STATE,action)=>{
     switch(action.type)
     {
        case actionTypes.ADD_TO_CART:
            const productBeingAddedtocart=action.payload;
            const productAlreadyExits=state.cartItems.find((x)=>x.productID===productBeingAddedtocart.productID);
            const currentstate={...state};
            
            if(productAlreadyExits)
            {
                currentstate.itemsCount=0;
                currentstate.cartSubTotal=0;
                currentstate.cartItems=state.cartItems.map((x)=>{
                    if(x.productID===productBeingAddedtocart.productID)
                    {
                        // if product match that we just have to replace it with the already presetn product
                        currentstate.itemsCount+=Number(productBeingAddedtocart.quantity);
                        const sum=Number(productBeingAddedtocart.quantity)*Number(productBeingAddedtocart.price);
                        currentstate.cartSubTotal+=sum;

                    }
                    else
                    {
                        // if product do not matches
                        currentstate.itemsCount+=Number(x.quantity);
                        const sum=Number(x.price)*Number(x.quantity);
                        currentstate.cartSubTotal+=sum;
                    }
                    if(x.productID===productBeingAddedtocart.productID)
                    return productBeingAddedtocart;
                    else
                    return x;
                })
            }
            else{
                currentstate.itemsCount+=Number(productBeingAddedtocart.quantity);
                const sum=Number(productBeingAddedtocart.quantity)*Number(productBeingAddedtocart.price);
                currentstate.cartSubTotal+=sum;
                currentstate.cartItems=[...state.cartItems,productBeingAddedtocart]
            }
            return currentstate;
         
        case actionTypes.REMOVE_FROM_CART:
            const removedState={...state}
            removedState.cartItems={} 
            removedState.cartItems=state.cartItems.filter((item)=>{
                if(item.productID!==action.payload.productID)
                    return item
            })
            removedState.itemsCount=state.itemsCount-Number(action.payload.quantity)
            removedState.cartSubTotal=state.cartSubTotal-Number(action.payload.quantity)*Number(action.payload.price)
             
            return  removedState
        case actionTypes.REMOVE_ALL_PRODUCTS:
            const removedState2={...state}
            removedState2.cartItems=[]
            removedState2.itemsCount=0
            removedState2.cartSubTotal=0
            return removedState2
        default :
        return state;
     }
}