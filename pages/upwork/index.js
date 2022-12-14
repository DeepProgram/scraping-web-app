import HomeUpwork from "../../component/Upwork/Home";
import {Fragment, useEffect} from "react";
import {useSelector} from "react-redux";
import NotAuthenticatedHome from "../../component/Upwork/NotAuthenticatedHome";
import axios from "axios";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";
import SuccessAnimation from "../../component/UI/SuccessAnimation";
import LoggingAnimation from "../../component/UI/LoggingAnimation";
import useLogOut from "../../component/CustomHooks/useLogOut";
import useLoginWithToken from "../../component/CustomHooks/useLoginWithToken";

const API_URL = "http://20.197.51.102/"
const UpworkHomePage = (props) => {
    const {gotApiResponse, loginWithToken} = useLoginWithToken()
    const {isAuthenticated} = useSelector(state => state.authenticatedSlice)
    const {showLightSaverAnimation, showLoggingOutMessage, initializeLogout} = useLogOut()
    const loggingOutHandler = () => {
        initializeLogout()
    }

    useEffect(() => {
        loginWithToken()

    }, [loginWithToken])

    return (
        <Fragment>
            {isAuthenticated && !showLightSaverAnimation && <HomeUpwork loggingOutHandler={loggingOutHandler}/>}
            {!isAuthenticated && !showLightSaverAnimation && gotApiResponse &&
                <NotAuthenticatedHome popularSearches={props.popularSearches}/>}
            {showLoggingOutMessage && <SuccessAnimation>
                <span>L</span><span>O</span><span>G</span><span>G</span><span>I</span><span>N</span><span>G</span>
                &nbsp;
                <span>O</span><span>U</span><span>T</span>
            </SuccessAnimation>}
            {showLightSaverAnimation && <LoggingAnimation/>}
        </Fragment>
    )
}

export async function getStaticProps() {
    const popularSearches = []
    try {
        const responseData = (await axios.get(`${API_URL}upwork/popular-searches`)).data
        for (const searchQuery of responseData["top_searches"]) {
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