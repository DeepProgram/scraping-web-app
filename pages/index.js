import Head from 'next/head'
import Image from 'next/image'
import Home from "../component/Home/Home";
import {useEffect} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {login} from "../store/authenticated";
export default function HomePage() {

  const dispatch = useDispatch()

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if (!token) return
    axios.get("login/token", {
      headers: {Authorization: `Bearer ${token}`}
    }).then(response=>{
      return response.data
    }).then(data=>{
      if (data["status_message"] === "user_validated"){
        dispatch(login({
          "token": token,
          "firstname": data["first_name"]
        }))
      }
    })
  },[dispatch])

  return (
    <Home></Home>
  )
}
