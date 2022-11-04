import classes from "./SignupHome.module.css"
import {Fragment, useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {login} from "../../store/authenticated";
import LoggingAnimation from "../UI/LoggingAnimation";
import MainHeader from "../Header/MainHeader/MainHeader";
import SuccessAnimation from "../UI/SuccessAnimation";
import Router from 'next/router'

const API_URL = "http://20.197.51.102/"

const SignupHome = () => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailAlreadyUsedWarning, setEmailAlreadyUsedWarning] = useState(false)
    const [loginInAnimation, setLoginInAnimation] = useState(false)
    const [accountCreatedAnimation, setAccountCreatedAnimation] = useState(false)
    const [loginInMessageAnimation, setLoginInMessageAnimation] = useState(false)

    const dispatch = useDispatch()
    const onFirstNameChangeHandler = (event) => {
        setFirstName(event.target.value)
    }

    const onLastNameChangeHandler = (event) => {
        setLastName(event.target.value)
    }
    const onEmailChangeHandler = (event) => {
        setEmail(event.target.value)
    }
    const onPasswordChangeHandler = (event) => {
        setPassword(event.target.value)
    }

    const formSubmitHandler = (event) => {
        event.preventDefault()
        axios.post(`${API_URL}signup/email`, {
            "first_name": firstName.trim(),
            "last_name": lastName.trim(),
            "email": email.trim(),
            "password": password.trim()
        }).then(response => {
            return [response.status, response.data]
        }).then(data => {
            if (data[0] === 201) {
                dispatch(login({
                    "token": data[1]["token"],
                    "firstname": data[1]["first_name"]
                }))
                localStorage.setItem("token", data[1]["token"])
                setLoginInAnimation(true)
                setAccountCreatedAnimation(true)
                const timeoutId = setTimeout(() => {
                    setAccountCreatedAnimation(false)
                    setLoginInMessageAnimation(true)
                }, 2000)
                setTimeout(() => {
                    Router.push("/")
                    setLoginInMessageAnimation(false)
                }, 4000)
            } else {
                setEmailAlreadyUsedWarning(true)
                const timeoutId = setTimeout(() => {
                    setEmailAlreadyUsedWarning(false)
                }, 5000)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <Fragment>
            {!loginInAnimation && <MainHeader/>}
            {!loginInAnimation && <div className={classes["signup-container"]}>
                {emailAlreadyUsedWarning && <div className={classes["email-used-modal"]}>
                    <div className={classes["email-used-modal__title"]}>Email Is Already Used</div>
                </div>}
                <section className={classes.hero}>
                    <h1 className={classes.hero__title}>Learn to code by watching others</h1>
                    <p className={classes.hero__desc}>See how experienced developers solve problems in real-time.
                        Watching scripted
                        tutorials is
                        great,
                        but understanding how developers think is invaluable.</p>
                </section>
                <section className={classes["sign-up"]}>
                    <p className={classes["sign-up__desc"]}><span>Try it free 7 days</span> then $20/mo. thereafter</p>
                    <form className={classes["sign-up__form"]} onSubmit={formSubmitHandler}>
                        <div className={classes.form__input}>
                            <input className="" type="text" name="first-name" id="first-name" placeholder="First Name"
                                   value={firstName} required onChange={onFirstNameChangeHandler}/>
                            <span className="warning-icon">!</span>
                            <p className="warning">First name cannot be empty</p>
                        </div>

                        <div className={classes.form__input}>
                            <input className="" type="text" name="last-name" id="last-name" placeholder="Last Name"
                                   value={lastName}
                                   required onChange={onLastNameChangeHandler}/>
                            <span className="warning-icon">!</span>
                            <p className="warning">Last name cannot be empty</p>
                        </div>

                        <div className={classes.form__input}>
                            <input className="" type="email" name="email" id="email" placeholder="Email Address"
                                   value={email}
                                   required onChange={onEmailChangeHandler}/>
                            <span className="warning-icon">!</span>
                            <p className="warning">Looks like this is not an email</p>
                        </div>

                        <div className={classes.form__input}>
                            <input className="" type="Password" name="Password" id="Password" placeholder="Password"
                                   value={password} required onChange={onPasswordChangeHandler}/>
                            <span className="warning-icon">!</span>
                            <p className="warning">Password cannot be empty</p>
                        </div>

                        <input className={classes["submit-btn"]} type="submit" value="Claim your free trial"/>
                        <p className={classes.form__terms}>By clicking the button, you are agreeing to our <span>Terms and Services</span>
                        </p>
                    </form>
                </section>


            </div>}
            {loginInAnimation && <LoggingAnimation></LoggingAnimation>}
            {loginInMessageAnimation && <SuccessAnimation>
                <span>L</span><span>O</span><span>G</span><span>G</span><span>I</span><span>N</span>
                &nbsp;
                <span>I</span><span>N</span>
            </SuccessAnimation>}
            {accountCreatedAnimation &&
                <SuccessAnimation>
                    <span>A</span><span>C</span><span>C</span><span>O</span><span>U</span><span>N</span><span>T</span>
                    &nbsp;
                    <span>C</span><span>R</span><span>E</span><span>A</span><span>T</span><span>E</span><span>D</span>
                </SuccessAnimation>
            }
        </Fragment>
    )

}

export default SignupHome