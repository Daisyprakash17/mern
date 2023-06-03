import * as actionTypes from '../constants/categoryConstants'
import axios from "axios"

export const getCategories=()=>{
    return async(dispatch)=>{ 
            const {data}=await axios.get('/api/categories/')
           
        dispatch({
            type:actionTypes.GET_CATEGORIES_REQUEST,
            payload:data,
        })
    }
}

export const saveattributetoCatDoc=(key,value,categoryChoosen)=>{
    return async (dispatch,getState)=>{ 
        const {data}=await axios.post('/api/categories/attr',{key,value,categoryChoosen});
        if(data.message==='category Updated')
        {
            dispatch({
                type:actionTypes.SAVE_ATTR,
                payload:[...data.category]
            })
        }
    }
}

export const newCategory=(category)=>{
    return async(dispatch,getState)=>{
        const cat=getState().getCategories.categories;
        const {data}=await axios.post('/api/categories',{category});
        if(data.message==='category created')
        {
            dispatch({
                type:actionTypes.INSERT_CATEGORY,
                payload:[...cat,data.category]
            })
        }
    }
}

export const deleteCategory=(category)=>{
    return async(dispatch,getState)=>{
            console.log('the category that we want to delete is ',category)
            const cat=getState().getCategories.categories;
            const filteredCategories=cat.filter((item)=>item.name!==category);
            const {data}=await axios.delete(`/api/categories/`+encodeURIComponent(category));
            if(data.message==='category deleted')
            {
                dispatch({
                    type:actionTypes.DELETE_CATEGORY,
                    payload:[...filteredCategories]
                })
            }
    }
}