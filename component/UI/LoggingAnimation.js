import classes from "./LoggingAnimation.module.css"
import {Fragment} from "react";

const LoggingAnimation = () => {
    return (
        <Fragment>
            <div className={classes.loader}>
                <div className={`${classes["ls-particles"]} ${classes["ls-part-1"]}`}></div>
                <div className={`${classes["ls-particles"]} ${classes["ls-part-2"]}`}></div>
                <div className={`${classes["ls-particles"]} ${classes["ls-part-3"]}`}></div>
                <div className={`${classes["ls-particles"]} ${classes["ls-part-4"]}`}></div>
                <div className={`${classes["ls-particles"]} ${classes["ls-part-5"]}`}></div>
                <div className={`${classes["lightsaber"]} ${classes["ls-left"]} ${classes["ls-green"]}`}></div>
                <div className={`${classes["lightsaber"]} ${classes["ls-right"]} ${classes["ls-red"]}`}></div>
            </div>
        </Fragment>

    )
}

export default LoggingAnimation