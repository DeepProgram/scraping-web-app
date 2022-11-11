import LoginHome from "../../component/Login/LoginHome";
import {Fragment, useEffect, useState} from "react";
import useLoginWithToken from "../../component/CustomHooks/useLoginWithToken";
import {useSelector} from "react-redux";
import {useRouter} from 'next/router'

const API_URL = "http://20.197.51.102/"
const LoginIndex = (props) => {
    const {gotApiResponse, loginWithToken} = useLoginWithToken()
    const {isAuthenticated} = useSelector(state => state.authenticatedSlice)
    const router = useRouter()

    useEffect(() => {
        loginWithToken()
    }, [loginWithToken])

    useEffect(() => {
        if (gotApiResponse && isAuthenticated) {
            router.push("/")
        }
    }, [gotApiResponse])


    return (
        <Fragment>
            {
                gotApiResponse && !isAuthenticated && <LoginHome/>
            }

        </Fragment>
    )
}


export default LoginIndex