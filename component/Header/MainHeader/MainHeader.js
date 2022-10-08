import Link from "next/link";
import classes from "./MainHeader.module.css";

const MainHeader = () => {
    return (
        <nav className={classes["nav-container"]}>
            <ul className={classes.ul}>
                <Link href="/"><li className={classes.logo}></li></Link>
                <li className={classes.lists}>
                    <div className={classes["list-item"]}>Signup</div>
                    <div className={classes["list-item"]}>Login</div>
                </li>
            </ul>
        </nav>
    )
}

export default MainHeader