import MainHeader from "../Header/MainHeader/MainHeader";
import classes from "./Upwork.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {Fragment, useEffect, useState} from "react";
import ProgressBar from "../UI/ProgressBar";

import DataTable from "./DataTable";
import axios from "axios";
import SuccessAnimation from "../UI/SuccessAnimation";


const searchPages = 2;
const API_URL = "http://20.193.147.43:8000/"
const HomeUpwork = () => {
    const [loadingState, setLoadingState] = useState(null)
    const [searchKey, setSearchKey] = useState("")
    const [statusReport, setStatusReport] = useState(Array(5+searchPages).fill(false))
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


    const inputHandler=(event)=>{
        setSearchKey(event.target.value)
    }

    const searchButtonHandler = () => {
        setShowSuccessMessage(false)
        setUpworkData([])
        setStatusReport(Array(5+searchPages).fill(false))
        setLoadingState(false)
        axios.post(`${API_URL}upwork/start-scraping?search_key=${searchKey.trim()}&search_pages=${searchPages}`)
            .then(res => {
                return res.data
            })
            .then(data => {
                setStatusReport(prevState => {
                    prevState[0] = true
                    return prevState
                })
                setLoadingState(true)
                ifDataAvailableOnDatabase(data["feedback"]["uuid"])
                // ifDataAvailableOnDatabase("417deb55-0a42-43cf-aaaf-7db043839c42")
            })
            .catch(err => {
                console.log(`Error Found On START SCRAPING Endpoint (${err})`)
            })
    }

    const ifDataAvailableOnDatabase = (str_uuid)=>{
        axios.get(`${API_URL}upwork/status?str_uuid=${str_uuid}`)
            .then(res=>{
                return res.data
            })
            .then(data=>{
                delay = 2000;
                if (data["status_message"] === "completed"){
                    setShowSuccessMessage(true)
                    setStatusReport(prevState => {
                        const newData = [...prevState]
                        newData[statusReport.length-1] = true
                        return newData
                    })
                    setShowSuccessMessage(true)
                    return
                }
                if (data["status_message"] === true){
                    getUpworkData(str_uuid)
                }
                else if(data["status_message"] === "automation_started"){
                    setStatusReport(prevState => {
                        const newData = [...prevState]
                        newData[1] = true
                        return newData
                    })
                }
                else if(data["status_message"] === "selenium_started"){
                    setStatusReport(prevState => {
                        const newData = [...prevState]
                        newData[2] = true
                        return newData
                    })
                }
                else if(data["status_message"] === "page_loaded"){
                    setStatusReport(prevState => {
                        const newData = [...prevState]
                        newData[3] = true
                        return newData
                    })
                }
                else if(data["status_message"] === "page_scraped"){
                    setStatusReport(prevState => {
                        const newData = [...prevState]
                        newData[3+data["page_no"]] = true
                        return newData
                    })
                }
                timeout = setTimeout(ifDataAvailableOnDatabase.bind(null, str_uuid), delay);
            })
            .catch(err=>{
                delay = delay * 2;
                timeout = setTimeout(ifDataAvailableOnDatabase.bind(null, str_uuid), delay);
            })
        clearTimeout(timeout)
    }



    const getUpworkData = (str_uuid) => {
        // console.log("Requesting Data")
        axios.get(`${API_URL}upwork/get-data?str_uuid=${str_uuid}`)
            .then(res => {
                return res.data
            })
            .then(data => {
                // console.log("Found Data")
                delay = 2000;
                if (data["proces_status"] === "processing") {
                    setUpworkData(prevState => {
                        return [...prevState, data.data]
                    })
                }
            })
            .catch(err => {
                console.log(`Error On Getting Upwork Data Endpoint (${err})`)
            })
    }

    return (
        <Fragment>
            <MainHeader/>
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
                        </div>
                    </div>
                </div>
                {showSuccessMessage && <SuccessAnimation/>}
                {loadingState && <ProgressBar status={statusReport}/>}
                {upworkData.length !== 0 && <DataTable dataList={upworkData}/>}
            </div>
        </Fragment>

    )
}

export default HomeUpwork