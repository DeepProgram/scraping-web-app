import classes from "./SuccessAnimation.module.css"

const SuccessAnimation = () => {
    return (
        <div className={classes["completion-container"]}>
            <div className={classes["success-block"]}>
                <div className={classes.title}>
                    <span>E</span><span>X</span><span>T</span><span>R</span><span>A </span><span>C</span><span>T</span><span>I</span><span>O</span><span>N</span>
                    &nbsp;
                    <span>C</span><span>O</span><span>M</span><span>P</span><span>L</span><span>E</span><span>T</span><span>E</span><span>D</span>
                </div>
            </div>
        </div>
    )
}

export default SuccessAnimation