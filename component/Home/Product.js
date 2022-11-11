import classes from "./Product.module.css"
import Link from "next/link";

const Product = () => {
    return (
        <section className={classes["main-container"]}>
            <div className={classes["product-list"]}>
                <div className={classes["product-item"]}>
                    <div
                        className={`${classes["product-item__upper"]} ${classes["product-item__upper-highlight-green"]}`}>
                        <div className={classes["product-item__upper-title"]}>Upwork Scrapper</div>
                        <div className={classes["product-item__upper-price"]}>0$</div>
                        <div className={classes["product-item__upper-month"]}>Per Request</div>
                    </div>
                    <div className={classes["product-item__lower"]}>
                        <div className={classes["product-item__lower-text"]}>
                            10 User
                        </div>
                        <div className={classes["product-item__lower-text"]}>
                            Get Latest Updates
                        </div>
                        <div className={classes["product-item__lower-text"]}>
                            No Signup Needed
                        </div>
                        <div className={classes["product-item__lower-text"]}>
                            Download Scraped Data
                        </div>

                        <Link href="/upwork">
                            <button className={classes["product-item__lower-button"]}>Use Product</button>
                        </Link>

                    </div>
                </div>
                <div className={classes["product-item"]}>
                    <div className={classes["product-item__upper"]}>
                        <div className={classes["product-item__upper-title"]}>Freelancing Scrapper</div>
                        <div className={classes["product-item__upper-price"]}>0$</div>
                        <div className={classes["product-item__upper-month"]}>Per Request</div>
                    </div>
                    <div className={classes["product-item__lower"]}>
                        <div className={classes["product-item__lower-text"]}>
                            1 User
                        </div>
                        <div className={classes["product-item__lower-text"]}>
                            Get Latest Updates
                        </div>
                        <div className={classes["product-item__lower-text"]}>
                            No Signup Needed
                        </div>
                        <div className={classes["product-item__lower-text"]}>
                            Download Scraped Data
                        </div>
                        <Link href="/upwork">
                            <button className={classes["product-item__lower-button"]}>Use Product</button>
                        </Link>
                    </div>
                </div>
                <div className={classes["product-item"]}>
                    <div
                        className={`${classes["product-item__upper"]} ${classes["product-item__upper-highlight-pink"]}`}>
                        <div className={classes["product-item__upper-title"]}>Steam Product Scrapper</div>
                        <div className={classes["product-item__upper-price"]}>1$</div>
                        <div className={classes["product-item__upper-month"]}>Per Request</div>
                    </div>
                    <div className={classes["product-item__lower"]}>
                        <div className={classes["product-item__lower-text"]}>
                            100 User
                        </div>
                        <div className={classes["product-item__lower-text"]}>
                            No Signup Needed
                        </div>
                        <div className={classes["product-item__lower-text"]}>
                            Check Discounted Products
                        </div>
                        <div className={classes["product-item__lower-text"]}>
                            Download Products Data
                        </div>
                        <Link href="/upwork">
                            <button className={classes["product-item__lower-button"]}>Use Product</button>
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Product