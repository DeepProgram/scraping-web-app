import classes from "./DataTable.module.css"
import DetailsModal from "../UI/Modal/DetailsModal";
import {Fragment, useState} from "react";


const DataTable = (props) => {
    const [showModal, setShowModal] = useState({
        show: false,
        data: -1
    })

    const buttonHandler = (event) => {
        setShowModal({show: true, data: parseInt(event.target.id)})
    }
    const modalCloseButtonClicked = () => {
        setShowModal({show: false, data: -1})
    }

    const backDropClicked = () => {
        setShowModal({show: false, data: -1})
    }
    return (
        <Fragment>
            {showModal.show && showModal.data !==-1 && <DetailsModal JobData={props.dataList[showModal.data]}
                                             modalCloseButtonClicked={modalCloseButtonClicked} backDropClicked={backDropClicked}/>}
            {!showModal.show && <div className={classes["table-container"]}>
                <section className={classes.section}>
                    <h1 className={classes.h1}>Upwork Job Table</h1>
                    <div className={classes["tbl-header"]}>
                        <table cellPadding="0" cellSpacing="0" border="0">
                            <thead>
                            <tr className={classes.tr}>
                                <th className={`${classes.th} ${classes["th-title"]}`}>Title</th>
                                <th className={classes.th}>Posted For</th>
                                <th className={classes.th}>Post Time</th>
                                <th className={classes.th}>Payment Type</th>
                                <th className={classes.th}>Amount</th>
                                <th className={classes.th}>Experience Level</th>
                                <th className={classes.th}>Job URL</th>
                                <th className={classes.th}>Details</th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                    <div className={classes["tbl-content"]}>
                        <table cellPadding="0" cellSpacing="0" border="0" className={classes.table}>
                            <tbody>
                            {props.dataList.map((obj, index) => {
                                return (
                                    <tr key={index}>
                                        <td className={`${classes.td} ${classes["td__title"]}`}>{obj["title"]}</td>
                                        <td className={`${classes.td} ${classes["td__posted-for"]}`}>{obj["details"]["job_applicable_location"]}</td>
                                        <td className={`${classes.td} ${classes["td__posted-time"]}`}>{obj["details"]["job_posted_time"]}</td>
                                        <td className={`${classes.td} ${classes["td__payment-type"]}`}>{obj["details"]["job_type_details"]["payment_type"]}</td>
                                        <td className={`${classes.td} ${classes["td__amount"]}`}>{obj["details"]["job_type_details"]["amount"]}</td>
                                        <td className={`${classes.td} ${classes["td__experience-level"]}`}>{obj["details"]["job_type_details"]["Experience Level"]}</td>
                                        <td className={`${classes.td} ${classes["td__job-url"]}`}>{obj["url"]}</td>
                                        <td className={`${classes.td} ${classes["td__details"]}`}>
                                            <button className={classes["button-details"]} id={index.toString()}
                                                    onClick={buttonHandler}>Details
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
            }
        </Fragment>
    )
}

export default DataTable