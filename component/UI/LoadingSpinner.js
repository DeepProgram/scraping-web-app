import classes from "./LoadingSpinner.module.css"

const LoadingSpinner = () => {
    return (
        <div className={classes["container"]}>
            <div className={classes.ring}>
                <div className={classes.text}>Extracting</div>
                <span className={classes.span}></span>
            </div>
        </div>


    )
}

export default LoadingSpinner