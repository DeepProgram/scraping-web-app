import classes from "./LoginHome.module.css"
import axios from "axios";
import {Fragment, useState} from "react";
import {useDispatch} from "react-redux";
import {login} from "../../store/authenticated";
import SuccessAnimation from "../UI/SuccessAnimation";
import LoggingAnimation from "../UI/LoggingAnimation";
import Router from 'next/router'
import MainHeader from "../Header/MainHeader/MainHeader";

const API_URL = "http://20.197.51.102/"
const LoginHome = () => {
    const [loginInAnimation, setLoginInAnimation] = useState(false)
    const [loginInMessageAnimation, setLoginInMessageAnimation] = useState(false)
    const [emailPassDoesntMatch, setEmailPassDoesntMatch] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    const loginButtonHandler = () => {
        axios.post(`${API_URL}login/email`, {
            "email": email,
            "password": password
        }).then(response => {
            return response.data
        }).then(data => {
            if (data["code"] === 1) {
                setLoginInAnimation(true)
                setTimeout(() => {
                    setLoginInMessageAnimation(true)
                }, 1000)
                setTimeout(() => {
                    dispatch(login(
                        {
                            "token": data["token"],
                            "firstname": data["first_name"]
                        }
                    ))

                    Router.push("/")
                    setTimeout(() => {
                        setLoginInAnimation(false)
                        setLoginInMessageAnimation(false)
                    }, 2000)

                }, 4000)

            } else {
                setEmailPassDoesntMatch(true)
                setTimeout(()=>{
                    setEmailPassDoesntMatch(false)
                },2000)
            }
        })
    }

    const emailHandler = (event) => {
        setEmail(event.target.value)
    }
    const passwordHandler = (event) => {
        setPassword(event.target.value)
    }

    return (
        <Fragment>
            {!loginInAnimation && <MainHeader/>}
            {!loginInAnimation &&
                <Fragment>
                    { emailPassDoesntMatch &&
                        <div className={classes["email-used-modal"]}>
                            <div className={classes["email-used-modal__title"]}>Email & Password Doesn&apos;t Match
                            </div>
                        </div>
                    }
                    <div className={classes.container}>
                        <div className={classes.content}>
                            <div className={classes.banner}>
                                <h1>YOUR TEXT HERE</h1>
                                <h3>Here&apos;s the information, about your company, product, I don&apos;t know.</h3>
                            </div>
                            <div className={classes.form}>
                                <img src="https://i.pinimg.com/236x/4d/a8/bb/4da8bb993057c69a85b9b6f2775c9df2.jpg"
                                     alt="profile"/>
                                <p className={classes.p}>Need an Account? <a href=""> Sign Up</a></p>
                                <input className={classes.input} type="email" placeholder="Email"
                                       onChange={emailHandler}/>
                                <input className={classes.input} type="password" placeholder="Password"
                                       onChange={passwordHandler}/>
                                <button className={classes.button} type="click" onClick={loginButtonHandler}>Sign In
                                </button>
                                <a href="" id="r">Forgot Your Password?</a>
                            </div>
                        </div>
                    </div>
                </Fragment>
            }
            {loginInMessageAnimation && <SuccessAnimation>
                <span>L</span><span>O</span><span>G</span><span>G</span><span>I</span><span>N</span>
                &nbsp;
                <span>I</span><span>N</span>
            </SuccessAnimation>
            }
            {
                loginInAnimation && <LoggingAnimation/>
            }
        </Fragment>
    )
}

export default LoginHome