import React from 'react'
import HomePageComponent from './components/HomePageComponent'
import {useSelector} from 'react-redux'



export default function Homepage() {
  const { categories } = useSelector((state) => state.getCategories);

  return <HomePageComponent categories={categories} />;
}
