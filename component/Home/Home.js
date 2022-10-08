import {Fragment} from "react";
import classes from "./Home.module.css"
import MainHeader from "../Header/MainHeader/MainHeader";
import Product from "./Product";
import Link from "next/link";
const Home = () => {
    return (
        <Fragment>

            <div className={classes.container}>
                <MainHeader></MainHeader>
                <div className={classes["container-img"]}>
                </div>
                <div className={classes.body}>
                    <div className={classes["body-text"]}>
                        <div className={classes["text-title"]}>
                            Get The Data Of Whole World
                        </div>
                        <div className={classes["text-body"]}>
                            Scrap any data from any website. Get access data from different website and use it for individual or compare for statistical purpose.
                        </div>
                        <button className={classes["button-read-more"]}>Read More</button>
                    </div>
                    <div className={classes["body-img"]}>

                    </div>
                </div>
                <div className={classes["item-indicator-container"]}>
                    <div className={classes["item-indicator"]}></div>
                    <div className={`${classes["item-indicator"]} ${classes["item-indicator-active"]}`}></div>
                    <div className={classes["item-indicator"]}></div>
                </div>
                <Product></Product>
                <div className={classes["about-container"]}>
                    <div className={classes["about-container-flexbox"]}>
                        <div className={classes["about-container__image"]}></div>
                        <div className={classes["about-container__body"]}>
                            <h2 className={classes["about-container__body-title"]}>
                                About Software
                            </h2>
                            <div className={classes["about-container__body-desc"]}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                dolor in reprehenderit in voluptate velit
                            </div>
                            <button className={classes["about-container__body-read-more"]}>Read More</button>
                        </div>
                    </div>
                    <div className={classes["extra-text"]}>
                        Why Choose Us
                    </div>
                </div>


            </div>

        </Fragment>
    )

}

export default Home