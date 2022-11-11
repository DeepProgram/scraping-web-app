import MainHeader from "../Header/MainHeader/MainHeader";
import {Fragment, useState} from "react";
import classes from "./NotAuthenticatedHome.module.css"
import axios from "axios";
import DataTable from "./DataTable";

const API_URL = "http://20.197.51.102/"
const NotAuthenticatedHome = (props) => {

    const [dataList, setDataList] = useState([])

    const onQueryClick = (event) => {
        axios.get(`${API_URL}upwork/extract?query=${props.popularSearches[event.target.id]}`)
            .then(response => {
                return response.data
            })
            .then(data => {
                setDataList(data["search_result"])
            })
    }

    return (
        <Fragment>
            <MainHeader/>
            <div className={classes.container}>
                <div className={classes["popular-box"]}>
                    <h1 className={classes.h1}>Popular Searches</h1>
                    <div className={classes["item-container"]}>
                        {props.popularSearches.map((obj, index) => {
                            return (
                                <div key={index} id={index} className={classes.item} onClick={onQueryClick}>{obj}</div>
                            )
                        })}
                    </div>
                </div>
                {dataList.length !== 0 && <DataTable dataList={dataList}/>}
            </div>

        </Fragment>
    )
}


export default NotAuthenticatedHome