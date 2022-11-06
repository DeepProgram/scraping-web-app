import HomeUpwork from "../../component/Upwork/Home";
import {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import NotAuthenticatedHome from "../../component/Upwork/NotAuthenticatedHome";
import axios from "axios";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";
import {login, logout} from "../../store/authenticated";
import SuccessAnimation from "../../component/UI/SuccessAnimation";
import LoggingAnimation from "../../component/UI/LoggingAnimation";

const API_URL = "http://20.197.51.102/"
const UpworkHomePage = (props)=>{
    const [showLightSaverAnimation, setShowLightSaverAnimation] = useState(false)
    const [showLoggingOutMessage, setShowLoggingOutMessage] = useState(false)
    const {isAuthenticated} = useSelector(state => state.authenticatedSlice)
    const dispatch = useDispatch()

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if (!token) return
    axios.get(`${API_URL}login/token`, {
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
    }).catch(err=>{
      console.log("Index Page Error")
    })
  },[dispatch])

    const loggingOutHandler = ()=>{
        setShowLightSaverAnimation(true)
        const timeoutId = setTimeout(()=>{
            setTimeout(()=>{
                setShowLoggingOutMessage(true)
            },1000)
            setTimeout(()=>{
                setShowLightSaverAnimation(false)
                setShowLoggingOutMessage(false)
                dispatch(logout())
            },2000)
        },1000)
    }


    return (
        <Fragment>
            {isAuthenticated && !showLightSaverAnimation && <HomeUpwork loggingOutHandler={loggingOutHandler}/>}
            {!isAuthenticated && !showLightSaverAnimation && <NotAuthenticatedHome popularSearches={props.popularSearches}/>}
            {showLoggingOutMessage && <SuccessAnimation>
                <span>L</span><span>O</span><span>G</span><span>G</span><span>I</span><span>N</span><span>G</span>
                    &nbsp;
                    <span>O</span><span>U</span><span>T</span>
            </SuccessAnimation>}
            {showLightSaverAnimation && <LoggingAnimation/>}
        </Fragment>
    )
}

export async function getStaticProps(){
    const popularSearches = []
    try {
        const responseData = (await axios.get(`${API_URL}upwork/popular-searches`)).data
        for (const searchQuery of responseData["top_searches"]){
            popularSearches.push(searchQuery);
        }
    } catch (err) {
        console.log("Error Fetching Question Data From API On GetStaticProps Fro")
    }
    return {
        props: {
            popularSearches: popularSearches,
        },
        revalidate: 1,
    }
}

export default UpworkHomePage