import React from 'react'
import AnalyticsPageComponent from './components/AnalyticsPageComponent'

import socketIOClient from "socket.io-client";

import axios from 'axios';
const fetchOrdersForFirstDate = async (abctrl, firstDateToCompare) => {
  const { data } = await axios.get("/api/orders/analysis/" + firstDateToCompare, {
  signal: abctrl.signal,
});
return data;
}

const fetchOrdersForSecondDate = async (abctrl, secondDateToCompare) => {
const { data } = await axios.get("/api/orders/analysis/" + secondDateToCompare, {
  signal: abctrl.signal,
});
return data;
};
export default function AdminAnalyticsPage() {
  return (
    <AnalyticsPageComponent fetchOrdersForFirstDate={fetchOrdersForFirstDate} fetchOrdersForSecondDate={fetchOrdersForSecondDate} socketIOClient={socketIOClient}/>
  )
}
