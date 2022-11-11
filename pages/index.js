import Home from "../component/Home/Home";
import {Fragment, useEffect} from "react";
import {useSelector} from "react-redux";
import useLoginWithToken from "../component/CustomHooks/useLoginWithToken";


const API_URL = "http://20.197.51.102/"

export default function HomePage() {
    const {gotApiResponse, loginWithToken} = useLoginWithToken()
    const {isAuthenticated} = useSelector(state => state.authenticatedSlice)

    useEffect(() => {
        if (!isAuthenticated) {
            loginWithToken()
        }
    }, [isAuthenticated, loginWithToken])




    return (
        <Fragment>
            {(gotApiResponse || isAuthenticated) && <Home></Home>}
        </Fragment>
    )
}
