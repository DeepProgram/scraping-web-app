import classes from "./SuccessAnimation.module.css"

const SuccessAnimation = (props) => {
    return (
        <div className={classes["completion-container"]}>
            <div className={classes["success-block"]}>
                <div className={classes.title}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default SuccessAnimation