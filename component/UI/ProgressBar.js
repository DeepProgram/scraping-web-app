import classes from "./ProgressBar.module.css"
import {useEffect} from "react";
import styled from 'styled-components'
import {keyframes} from "styled-components";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";


const Container = styled.div`
    margin: ${props => props.containerMarginTop || 5}rem 0 0 0;
    background-color: var(--dark-blue);
    border-radius: 1rem;
    width: 70vw;
    height: 1rem;
    position: relative;
`

const TooltipContainer = styled.div`
    transform: translateX(calc(${props => props.toolTipPosition || "0"} * 1%));
    transition: var(--transition);
    will-change: transform;
    width: 100%;
    border-radius: 1rem;
`

const Tooltip = styled.div`
    --color: rgb(0, 0, 0);
    background: var(--color);
    font-size: 12px;
    color: aliceblue;
    bottom: 100%;
    display: ${props => props.displayTooltip || "block"};
    margin-bottom: 15px;
    padding: 1rem 3rem 1rem 1rem;
    position: absolute;
    min-width: 10%;
    transform: translateX(calc(1 * -1%));
    transition: var(--transition);
    will-change: transform;
`
const TooltipIndicator = styled.div`
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    height: 0px;
    top: 100%;
    transform: translateX(calc(1 * 1%));
    transition: var(--transition);
    will-change: transform;
    
    &:after{
        content: " ";
        border-left: solid transparent 0.7rem;
        border-right: solid transparent 0.7rem;
        border-top: solid 0.7rem var(--color);
        position: absolute;
        left: 0.5rem;
        bottom: -0.7rem;
        margin-left: -0.5rem;
        height: 0;
        width: 0;
        transform: translateX(calc(1 * -1%)) translateY(0px);
        transition: var(--transition);
        will-change: transform;
    }
`
const Bar = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    overflow-x: hidden;
    overflow-y: hidden;
    border-radius: inherit;
    align-items: center;
    
    &:after{
        content: "";
        width: 100%;
        height: 100%;
        background-color: #008EC9;
        transform: translateX(calc(-100% + ${props => props.donePosition || "25"} * 1%));
        transition: var(--transition); 
    }
`
const IndexStep = styled.div`
    position: relative;
    z-index: 1;
    color: white;
    width: 1rem;
    height: 1rem;
    font-size: 10px;
    background-color: rgba(211, 211, 211, 1);
    border-radius: 50%;
    float: left;
    
    &.not-first{
        margin-left: calc(${props => props.circlePercentage || "33"}% - 1rem);
    }
    &.last{
        float: right;
    }
    &.accomplished {
        background-color: #019766;
        box-shadow: 0px 0px 2px 4px #10E279;
    }
`

const positionMessage = ["Scraping Request Submitted", "Scraping Program Started", "Automation Tool Opened",
                            "Page Loaded"]

const ProgressBar = (props) => {
    let statusList = props.status
    const completionPos = statusList.reduce((total,conditionValue) => total+(conditionValue===true), 0)-1;
    const barBlueCount = completionPos
    const toolTipPosition = completionPos;

    statusList = statusList.map((obj, index, mainArray) => {
        if (index === 0) {
            return (
                <IndexStep key={index} className={statusList[index] && "accomplished"}></IndexStep>
            )
        } else if (index === mainArray.length - 1) {
            return (
                <IndexStep key={index}
                           className={`${"last"} ${statusList[index] && "accomplished"}`}></IndexStep>
            )
        } else {
            return (
                <IndexStep key={index} className={`${"not-first"} ${statusList[index] && "accomplished"}`}
                           circlePercentage={(100 / (mainArray.length - 1))}></IndexStep>
            )
        }
    })

    return (
        <div className={classes["root-container"]}>
            <Container containerMarginTop={props.status[statusList.length-1] === true && "1.9"}>
                <TooltipContainer toolTipPosition={((100 / (statusList.length - 1)) * (toolTipPosition))}>
                    <Tooltip displayTooltip={props.status[statusList.length-1] === true && "none"}>
                        {(completionPos <= 3)?positionMessage[completionPos]: `Page ${completionPos-3} Scraped`}
                        <TooltipIndicator></TooltipIndicator>
                    </Tooltip>
                </TooltipContainer>
                <Bar donePosition={(((100) / (statusList.length - 1)) * (barBlueCount + 0.05))}></Bar>
                {statusList}
            </Container>
        </div>
    )
}

export default ProgressBar