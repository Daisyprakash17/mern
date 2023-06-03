import * as actionTypes from '../constants/categoryConstants';

export const getcategoryReducer=(state={categories:[]},action)=>{
    switch(action.type)
    {
        case actionTypes.GET_CATEGORIES_REQUEST: 
            const newstate= {
                ...state,
                categories:action.payload
            } 
            return newstate
        case actionTypes.SAVE_ATTR:
            let updatedcategories=state.categories.map((item)=>{
                if(item.name===action.payload[0].name)
                return action.payload[0];
                else
                return item;
            })   
            return {
                ...state,
                categories:updatedcategories
            };

        case actionTypes.INSERT_CATEGORY:
                return {
                    ...state,
                categories:action.payload
                }
        case actionTypes.DELETE_CATEGORY:
            return {
                ...state,
                categories:action.payload
            }
            default:
            return state;
    }
}