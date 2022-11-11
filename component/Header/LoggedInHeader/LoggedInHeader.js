import classes from "./LoggedInHeader.module.css"
import {useState} from "react";
import {useSelector} from "react-redux";
import Link from "next/link";


const LoggedInHeader = (props) => {

    const [showServices, setShowServices] = useState("hide-dropdown")
    const [showAccount, setShowAccount] = useState("hide-dropdown")
    const {firstName} = useSelector(state => state.authenticatedSlice)

    const onServicesClickHandler = () => {
        if (showServices === "") setShowServices("hide-dropdown")
        else setShowServices("")
    }

    const onAccountClickHandler = () => {
        if (showAccount === "") setShowAccount("hide-dropdown")
        else setShowAccount("")
    }

    const logoutHandler = () => {
        localStorage.removeItem("token")
        props.loggingOutHandler()
    }

    return (
        <nav className={`${classes.navbar}`}>
            <div className={classes["navbar-brand"]}>Brand<b>Name</b></div>
            <div id="navbarCollapse" className={classes["navbar-collapse"]}>
                <div className={classes["navbar-nav"]}>
                    <div className={`${classes["nav-item"]}`}>
                        <div className="nav-item nav-link dropdown-toggle"
                             onClick={onServicesClickHandler}>Services
                        </div>
                        <div className={`${classes["dropdown-menu"]} ${classes[showServices]}`}>
                            <Link href={"/upwork"}><a className={`${classes["navbar-hover"]} dropdown-item`}>Upwork
                                Scrapper</a>
                            </Link>
                            <a className={`${classes["navbar-hover"]} dropdown-item`}>Freelancing Scrapper</a>
                            <a className={`${classes["navbar-hover"]} dropdown-item`}>Steam Discount Checker</a>
                            <a className={`${classes["navbar-hover"]} dropdown-item`}>Proxy Scrapper</a>
                        </div>
                    </div>
                </div>
                <div className={classes["navbar-nav"]}>
                    <div className={`${classes["nav-item"]}`}>
                        <div className={`${classes["nav-item"]} ${classes["nav-link"]} dropdown-toggle`}
                             onClick={onAccountClickHandler}>{firstName}</div>
                        <div className={`${classes["dropdown-menu"]} ${classes[showAccount]}`}>
                            <a className={`${classes["navbar-hover"]} dropdown-item`}>Settings</a>
                            <a className={`${classes["navbar-hover"]} dropdown-item`}
                               onClick={logoutHandler}>Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default LoggedInHeader