import React, { useLayoutEffect } from 'react'
import ProductListPageComponent from './components/ProductListPageComponent'

import axios from 'axios'
import {useSelector} from 'react-redux'

let filtersUrl = "";
const proceedFilters = (filters) => {
  filtersUrl = "";
  Object.keys(filters).map((key, index) => {
     if (key === "price") filtersUrl += `&price=${filters[key]}`; 
     else if (key === "rating") {
         let rat = "";
         Object.keys(filters[key]).map((key2, index2) => {
             if (filters[key][key2]) rat += `${key2},`;
             return "";
         })
         filtersUrl += "&rating=" + rat;
     } else if (key === "category") {
         let cat = "";
         Object.keys(filters[key]).map((key3, index3) => {
             if (filters[key][key3]) cat += `${key3},`;
             return "";
         })
         filtersUrl += "&category=" + cat;
     } else if (key === "attrs") {
        if (filters[key].length > 0) {
           let val = filters[key].reduce((acc, item) => {
               let key = item.key;
               let val = item.values.join("-");
               return acc + key + "-" + val + ",";
           }, "") 
           filtersUrl += "&attrs=" + val;
        } 
     }
     return "";
  })
  console.log('the url of filter',filtersUrl)
  return filtersUrl;
}
const getProducts=async(categoryName="",pageNumParam=null,searchQuery="", filters={},sortOption="")=>{
  filtersUrl = proceedFilters(filters);
  console.log(filters);
  const search = searchQuery ? `/search/${searchQuery}` : "";
  const category = categoryName ? `/category/${categoryName}` : "";
  const sorted=sortOption?`&sort=${sortOption}`:""
  const url = `/api/products${category}${search}?pageNum=${pageNumParam}${filtersUrl}${sorted}`;
   console.log('the url is ',url);
  
  const {data}=await axios.get(url); 
  // console.log(data);
  return data;
}
export default function ProductListPage() {
    const {categories}=useSelector((state)=>state.getCategories);
  return <ProductListPageComponent getProducts={getProducts}
    categories={categories}
  />
}
