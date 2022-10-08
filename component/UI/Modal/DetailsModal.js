import classes from "./DetailsModal.module.css"
import {Fragment} from "react";
import {createPortal} from "react-dom";

const BackDropComponent = (props) => {
    return (<div className={classes.backdrop} onClick={() => {
        props.backDropClicked()
    }}></div>)
}

const ModalComponent = (props) => {
    const jobData = props.jobData
    let jobSkillContent = []
    const requiredSkills = jobData["details"]["required_skills"]
    for (const key in requiredSkills) {
        const itemBodyComponent = requiredSkills[key].map((obj, index) => {
            return (<span key={index} className={classes["job__skills-items-item__body-item"]}>{obj}</span>)
        })
        const itemComponent = (<div key={key} className={classes["job__skills-items-item"]}>
            <div className={classes["job__skills-items-item__title"]}>
                {key}
            </div>
            <div className={classes["job__skills-items-item__body"]}>
                {itemBodyComponent}
            </div>
        </div>)
        jobSkillContent.push(itemComponent)
    }

    const modalCloseHandler = () => {
        props.modalCloseButtonClicked()
    }
    return (<div className={classes["details-container"]}>
        <div className={classes["modal-container"]}>
            <div className={classes["modal"]}>
                <div className={classes["btn-modal-close"]} onClick={modalCloseHandler}></div>
                <div className={classes["modal__details"]}>
                    <h1 className={classes["modal__title"]}>Job Details</h1>
                    <p className={classes["job__title"]}>{jobData["title"]}</p>
                    <div className={classes["job__posted"]}>
                        <div
                            className={classes["job__posted-time"]}>Posted {jobData["details"]["job_posted_time"]}</div>
                        <div className={classes["job__posted-location"]}>
                            <div className={classes["job__posted-location__icon"]}>
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 14 14"
                                     role="img">
                                    <path
                                        d="M10.8 2.692C10.214.93 8.439-.188 6.558.025c-1.062.12-1.961.566-2.631 1.384-.866 1.058-1.17 2.244-.722 3.569.266.782.649 1.511 1.063 2.225.758 1.308 1.618 2.547 2.529 3.754l.199.261c.029-.034.049-.056.065-.077a39.597 39.597 0 002.367-3.432c.458-.752.888-1.518 1.216-2.332.153-.381.287-.768.334-1.174.061-.517-.016-1.021-.178-1.511zM6.982 5.611c-.955 0-1.699-.736-1.699-1.684 0-.946.748-1.682 1.707-1.681.979.002 1.723.728 1.723 1.682.002.958-.745 1.683-1.731 1.683zm3.248 4.078c2.23.383 3.77 1.138 3.77 2.02C14 12.973 10.866 14 7 14c-3.867 0-7-1.027-7-2.291 0-.881 1.533-1.635 3.756-2.018.324.49.678.996 1.059 1.52-.883.128-1.578.313-2.004.494.733.311 2.19.659 4.189.659 2 0 3.456-.349 4.189-.659-.428-.184-1.127-.369-2.017-.498.375-.516.728-1.021 1.058-1.518z"></path>
                                </svg>
                            </div>
                            <p className={classes["job__posted-location__text"]}>{jobData["details"]["job_applicable_location"]}</p>
                        </div>
                    </div>
                    <div className={classes["job__details"]}>{jobData["details"]["job_description"].split('\n').map((item, i) =>
                        <p key={i}>{item}</p>)}</div>
                    <div className={classes["job__extra_info"]}>
                        <div className={classes["job__extra_info__item"]}>
                            <div className={classes["job__extra_info__item-icon"]}>
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 14 14"
                                     role="img">
                                    <path
                                        d="M13.688.311L8.666 0 0 8.665 5.334 14 14 5.332 13.688.311zm-2.354 1.528a.827.827 0 11-.002 1.654.827.827 0 01.002-1.654zM6.441 9.892c-.384-.016-.761-.168-1.128-.455l-.73.729-.579-.578.73-.729a3.612 3.612 0 01-.498-.872 3.186 3.186 0 01-.223-.934l.965-.331c.018.339.094.672.229 1.002.133.325.297.586.488.777.164.164.32.264.473.295s.287-.009.4-.123a.422.422 0 00.131-.315c-.004-.123-.035-.249-.094-.381s-.146-.308-.27-.52a6.892 6.892 0 01-.39-.793 1.501 1.501 0 01-.086-.7c.028-.248.157-.486.383-.714.275-.273.596-.408.971-.402.369.008.74.149 1.109.423l.682-.682.578.577-.676.677c.176.224.326.461.446.707.121.25.205.495.252.734l-.965.354a3.638 3.638 0 00-.314-.84 2.369 2.369 0 00-.419-.616.863.863 0 00-.404-.253.344.344 0 00-.342.1.438.438 0 00-.109.458c.049.18.162.427.332.739.172.31.299.582.383.807.086.226.113.465.084.714-.03.252-.161.493-.393.723-.295.297-.635.436-1.016.422z"></path>
                                </svg>
                            </div>
                            <div className={classes["job__extra_info__item__text"]}>
                                <div
                                    className={`${classes["job__extra_info__item__text-header"]} ${classes["job__extra_info__item__text-highlighted"]}`}>
                                    {jobData["details"]["job_type_details"]["amount"]}
                                </div>
                                <div className={classes["job__extra_info__item__text-body"]}>
                                    {jobData["details"]["job_type_details"]["payment_type"]}
                                </div>
                            </div>
                        </div>

                        {jobData["details"]["job_type_details"]["Duration"] !== undefined &&
                            <div className={classes["job__extra_info__item"]}>
                                <div className={classes["job__extra_info__item-icon"]}>
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 14 14"
                                         role="img">
                                        <g>
                                            <path
                                                d="M0 1.999C0 1.447.45 1 1.007 1h11.986C13.55 1 14 1.447 14 1.999V13c0 .552-.45.999-1.007.999H1.007A1.003 1.003 0 010 13.001V2zM10 1h1V0h-1v1zM3 1h1V0H3v1zM1 5v8h12V5H1z"></path>
                                            <path
                                                d="M3.062 11h1.14V6.602h-.834l-1.272.366.222.906.744-.18V11zM4.97 9.548h2.766v-.99H4.97v.99zm6.702.09c0-.774-.516-1.11-1.134-1.242l1.056-.93v-.834H8.48v.948h1.68l-1.014.936.168.624H9.8c.48 0 .744.174.744.474 0 .288-.222.468-.57.468-.408 0-.738-.18-1.044-.504l-.744.738c.414.462.996.768 1.83.768.966 0 1.656-.576 1.656-1.446z"></path>
                                        </g>
                                    </svg>
                                </div>
                                <div className={classes["job__extra_info__item__text"]}>
                                    <div className={classes["job__extra_info__item__text-header"]}>
                                        {jobData["details"]["job_type_details"]["Duration"]}
                                    </div>
                                    <div className={classes["job__extra_info__item__text-body"]}>
                                        Duration
                                    </div>
                                </div>
                            </div>
                        }

                        <div className={classes["job__extra_info__item"]}>
                            <div className={classes["job__extra_info__item-icon"]}>
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 14 14"
                                     role="img">
                                    <path
                                        d="M12.8 8.4l-1.3-2.3v-.8C11.6 2.4 9.2 0 6.3 0S1.1 2.4 1.1 5.3c0 1.4.5 2.6 1.4 3.5v4.5c0 .4.3.7.7.7h5.3c.4 0 .7-.3.7-.7v-1h1.7c.4 0 .7-.3.7-.7V9h.9c.4 0 .5-.3.3-.6zM8.7 5.3v.4l.7.4c-.2.5-.4.9-.8 1.3L7.9 7c-.2.2-.5.3-.8.4v.8c-.2.1-.5.1-.8.1-.3 0-.5 0-.8-.1v-.8c-.2-.1-.5-.2-.7-.4l-.7.4c-.4-.4-.7-.8-.8-1.3l.7-.4v-.9l-.7-.4c.1-.5.4-1 .8-1.3l.7.4c.2-.2.5-.3.7-.4v-.8c.3-.1.5-.1.8-.1.3 0 .5 0 .8.1v.8c.3.1.5.2.8.4l.7-.4c.4.4.6.8.8 1.3l-.7.4v.5z"></path>
                                    <circle cx="6.3" cy="5.3" r=".9"></circle>
                                </svg>
                            </div>
                            <div className={classes["job__extra_info__item__text"]}>
                                <div className={classes["job__extra_info__item__text-header"]}>
                                    {jobData["details"]["job_type_details"]["Experience Level"]}
                                </div>
                                <div className={classes["job__extra_info__item__text-body"]}>
                                    Experience Level
                                </div>
                            </div>
                        </div>
                        <div className={classes["job__extra_info__item"]}>
                            <div className={classes["job__extra_info__item-icon"]}>
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 14 14"
                                     role="img">
                                    <path
                                        d="M10.8 2.692C10.214.93 8.439-.188 6.558.025c-1.062.12-1.961.566-2.631 1.384-.866 1.058-1.17 2.244-.722 3.569.266.782.649 1.511 1.063 2.225.758 1.308 1.618 2.547 2.529 3.754l.199.261c.029-.034.049-.056.065-.077a39.597 39.597 0 002.367-3.432c.458-.752.888-1.518 1.216-2.332.153-.381.287-.768.334-1.174.061-.517-.016-1.021-.178-1.511zM6.982 5.611c-.955 0-1.699-.736-1.699-1.684 0-.946.748-1.682 1.707-1.681.979.002 1.723.728 1.723 1.682.002.958-.745 1.683-1.731 1.683zm3.248 4.078c2.23.383 3.77 1.138 3.77 2.02C14 12.973 10.866 14 7 14c-3.867 0-7-1.027-7-2.291 0-.881 1.533-1.635 3.756-2.018.324.49.678.996 1.059 1.52-.883.128-1.578.313-2.004.494.733.311 2.19.659 4.189.659 2 0 3.456-.349 4.189-.659-.428-.184-1.127-.369-2.017-.498.375-.516.728-1.021 1.058-1.518z"></path>
                                </svg>
                            </div>
                            <div className={classes["job__extra_info__item__text"]}>
                                <div className={classes["job__extra_info__item__text-header"]}>
                                    {jobData["details"]["job_type_details"]["job_location"]}
                                </div>
                            </div>
                        </div>
                        <div className={classes["job__extra_info__item"]}>
                            <div className={classes["job__extra_info__item-icon"]}>
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 14 14"
                                     role="img">
                                    <path
                                        d="M12.998 3.5H9.799v-2c0-.549-.451-1-1.002-1H5.201c-.549 0-1 .451-1 1v2H1c-.55 0-1 .45-1 1v8c0 .551.45 1 1 1h12c.551 0 1-.449 1-1v-8c0-.549-.451-1-1.002-1zM5.702 2h2.597v1.5H5.702V2zM12.5 5v1.995h-11V5h11zm-11 7V8.494h11V12h-11z"></path>
                                </svg>
                            </div>
                            <div className={classes["job__extra_info__item__text"]}>
                                <div className={classes["job__extra_info__item__text-header"]}>
                                    {jobData["details"]["job_type_details"]["Project Type"]}
                                </div>
                                <div className={classes["job__extra_info__item__text-body"]}>
                                    Project Type
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes["job__skills"]}>
                        <div className={classes["job__skills-text"]}>
                            Skills and Expertise
                        </div>
                        <div className={classes["job__skills-items"]}>
                            {jobSkillContent}
                        </div>
                    </div>
                    <div className={classes["job__activity"]}>
                        <div className={classes["job__activity-title"]}>Activity On This Job</div>
                        <div className={classes["job__activity__items"]}>
                            <div className={classes["job__activity__items__item"]}>
                                <div className={classes["job__activity__items__item-title"]}>
                                    {jobData["details"]["job_activity"]["Proposals"]}
                                </div>
                                <div className={classes["job__activity__items__item-body"]}>
                                    Proposals
                                </div>
                            </div>
                            {jobData["details"]["job_activity"]["Last viewed by client"] !== undefined &&
                                < div className={classes["job__activity__items__item"]}>
                                    <div className={classes["job__activity__items__item-title"]}>
                                        {jobData["details"]["job_activity"]["Last viewed by client"]}
                                    </div>
                                    <div className={classes["job__activity__items__item-body"]}>
                                        Last viewed by client
                                    </div>
                                </div>}

                            <div className={classes["job__activity__items__item"]}>
                                <div className={classes["job__activity__items__item-title"]}>
                                    {jobData["details"]["job_activity"]["Interviewing"]}
                                </div>
                                <div className={classes["job__activity__items__item-body"]}>
                                    Interviewing
                                </div>
                            </div>
                            <div className={classes["job__activity__items__item"]}>
                                <div className={classes["job__activity__items__item-title"]}>
                                    {jobData["details"]["job_activity"]["Invites sent"]}
                                </div>
                                <div className={classes["job__activity__items__item-body"]}>
                                    Invites sent
                                </div>
                            </div>
                            <div className={classes["job__activity__items__item"]}>
                                <div className={classes["job__activity__items__item-title"]}>
                                    {jobData["details"]["job_activity"]["Unanswered invites"]}
                                </div>
                                <div className={classes["job__activity__items__item-body"]}>
                                    Unanswered invites
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>)
}


const DetailsModal = (props) => {
    return (<Fragment>
        {createPortal(<BackDropComponent
            backDropClicked={props.backDropClicked}/>, document.getElementById("backdrop-root"))}
        {createPortal(<ModalComponent jobData={props.JobData}
                                      modalCloseButtonClicked={props.modalCloseButtonClicked}/>, document.getElementById("modal-root"))}
    </Fragment>)
}

export default DetailsModal