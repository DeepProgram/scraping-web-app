import {useState} from "react";
import {logout} from "../../store/authenticated";
import {useDispatch} from "react-redux";

const useLogOut = () => {
    const [showLightSaverAnimation, setShowLightSaverAnimation] = useState(false)
    const [showLoggingOutMessage, setShowLoggingOutMessage] = useState(false)

    const dispatch = useDispatch()

    const initializeLogout = () => {
        setShowLightSaverAnimation(true)
        const timeoutId = setTimeout(() => {
            setTimeout(() => {
                setShowLoggingOutMessage(true)
            }, 1000)
            setTimeout(() => {
                setShowLightSaverAnimation(false)
                setShowLoggingOutMessage(false)
                dispatch(logout())
            }, 2000)
        }, 1000)
    }

    return {
        showLightSaverAnimation,
        showLoggingOutMessage,
        initializeLogout
    }

}

export default useLogOut