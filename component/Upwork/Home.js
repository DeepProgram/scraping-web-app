import classes from "./Upwork.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {Fragment, useState} from "react";
import ProgressBar from "../UI/ProgressBar";

import DataTable from "./DataTable";
import axios from "axios";
import SuccessAnimation from "../UI/SuccessAnimation";
import LoggedInHeader from "../Header/LoggedInHeader/LoggedInHeader";
import {useSelector} from "react-redux";


const searchPages = 2;
const API_URL = "http://20.197.51.102/"
const HomeUpwork = (props) => {
    const [loadingState, setLoadingState] = useState(null)
    const [searchKey, setSearchKey] = useState("")
    const [statusReport, setStatusReport] = useState(Array(5 + searchPages).fill(false))
    // Search page = 2
    // 1. Scraping request submitted
    // 2. Scraping automation actually started
    // 3. Selenium opened
    // 4. Page has been loaded
    // 5. Page No 1 Scraped
    // 6. Page no 2 Scraped
    // 7. End
    const [upworkData, setUpworkData] = useState([])
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    let delay = 1000;
    let timeout = null

    const {token} = useSelector(state => state.authenticatedSlice)
    const inputHandler = (event) => {
        setSearchKey(event.target.value)
    }

    const searchButtonHandler = () => {
        setShowSuccessMessage(false)
        setStatusReport(Array(5 + searchPages).fill(false))
        setUpworkData([])
        setLoadingState(false)

        axios.get(`${API_URL}upwork/extract?query=${searchKey.trim()}`)
            .then(response => {
                return response.data
            })
            .then(data => {
                if (data["search_result"]) {
                    setUpworkData(data["search_result"])
                    setShowSuccessMessage(true)
                }
                else {
                    if (token){
                        refreshButtonHandler()
                    }
                }
            })
    }

    const refreshButtonHandler = () => {
        setShowSuccessMessage(false)
        setStatusReport(Array(5 + searchPages).fill(false))
        setUpworkData([])
        setLoadingState(false)
        axios.post(`${API_URL}upwork/start-scraping?search_key=${searchKey.trim()}&search_pages=${searchPages}`,
            null, {
                headers: {Authorization: `Bearer ${token}`}
            })
            .then(res => {
                return res.data
            })
            .then(data => {
                setStatusReport(prevState => {
                    prevState[0] = true
                    return prevState
                })
                setLoadingState(true)
                ifDataAvailableOnDatabase()
            })
            .catch(err => {
                console.log(`Error Found On START SCRAPING Endpoint (${err})`)
            })
    }

    const ifDataAvailableOnDatabase = () => {
        axios.get(`${API_URL}upwork/status`, {
                headers: {Authorization: `Bearer ${token}`}
            })
            .then(res => {
                return res.data
            })
            .then(data => {
                delay = 2000;
                console.log(data["status_message"])
                if (data["status_message"] === "completed") {
                    setShowSuccessMessage(true)
                    setStatusReport(prevState => {
                        const newData = [...prevState]
                        newData[statusReport.length - 1] = true
                        return newData
                    })
                    setShowSuccessMessage(true)
                    return
                }
                if (data["status_message"] === true) {
                    getUpworkData()
                } else if (data["status_message"] === "automation_started") {
                    setStatusReport(prevState => {
                        const newData = [...prevState]
                        newData[1] = true
                        return newData
                    })
                } else if (data["status_message"] === "selenium_started") {
                    setStatusReport(prevState => {
                        const newData = [...prevState]
                        newData[2] = true
                        return newData
                    })
                } else if (data["status_message"] === "page_loaded") {
                    setStatusReport(prevState => {
                        const newData = [...prevState]
                        newData[3] = true
                        return newData
                    })
                } else if (data["status_message"] === "page_scraped") {
                    setStatusReport(prevState => {
                        const newData = [...prevState]
                        newData[3 + data["page_no"]] = true
                        return newData
                    })
                }
                timeout = setTimeout(ifDataAvailableOnDatabase, delay);
            })
            .catch(err => {
                delay = delay * 2;
                timeout = setTimeout(ifDataAvailableOnDatabase, delay);
            })
        clearTimeout(timeout)
    }


    const getUpworkData = () => {
        axios.get(`${API_URL}upwork/get-data?search_key=${searchKey.trim()}`,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            .then(res => {
                return res.data
            })
            .then(data => {
                delay = 2000;
                if (data["proces_status"] === "processing") {
                    setUpworkData(data.data)
                }
            })
            .catch(err => {
                console.log(`Error On Getting Upwork Data Endpoint (${err})`)
            })
    }

    return (
        <Fragment>
            <LoggedInHeader loggingOutHandler={props.loggingOutHandler}/>
            <div className={classes["upwork-container"]}>
                <div className={classes["search-container"]}>
                    <div>
                        <div className={"input-group"}>
                            <div className={"form-outline"}>
                                <input type="search" id="form1"
                                       className={`${"form-control"}`} onChange={inputHandler} value={searchKey}/>
                            </div>
                            <button type="button" className={`${"btn"} ${"btn-primary"}`}
                                    onClick={searchButtonHandler}>
                                <FontAwesomeIcon icon={faSearch} className={classes["search-icon"]}/>
                            </button>
                            {showSuccessMessage &&
                                <button
                                    className={`${classes.refresh} ${(searchKey.trim().length === 0) ? classes["button-not-allowed"] : ""}`}
                                    onClick={refreshButtonHandler} disabled={searchKey.trim().length === 0}>Refresh
                                    List</button>
                            }
                        </div>
                    </div>
                </div>
                {showSuccessMessage && <SuccessAnimation>
                    <span>E</span><span>X</span><span>T</span><span>R</span><span>A</span><span>C</span><span>T</span>
                    <span>I</span><span>O</span><span>N</span>
                    &nbsp;
                    <span>C</span><span>O</span><span>M</span><span>P</span><span>L</span><span>E</span><span>T</span>
                    <span>E</span><span>D</span>
                </SuccessAnimation>}
                {loadingState && <ProgressBar status={statusReport}/>}
                {upworkData.length !== 0 && <DataTable dataList={upworkData}/>}
            </div>
        </Fragment>

    )
}

export default HomeUpwork