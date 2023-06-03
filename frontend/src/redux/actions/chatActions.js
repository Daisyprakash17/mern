import * as actionTypes from '../constants/chatConstants'


export const setChatRooms=(user,message)=>{

    return async (dispatch)=>{
        dispatch({
            type:actionTypes.SET_CHATROOMS,
            payload:{
                user:user,
                message:message,
            }
        })
    }
}

export const setSocket=(socket)=>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.SET_SOCKET,
            payload:{
                socket:socket,
            }
        })
    }
}

export const setMessageRecieved=(value)=>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.MESSAGE_RECIEVED,
            payload:{
                value:value, // this value is either true or false 
            }
        })
    }
}
export const removeChatRoom=(socketId)=>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.REMOVE_CHATROOM,
            payload:{
                socketId:socketId,
            }
        })
    }
}