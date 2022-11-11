import {useDispatch} from "react-redux";
import axios from "axios";
import {login} from "../../store/authenticated";
import {useState} from "react";


const API_URL = "http://20.197.51.102/"
const useLoginWithToken = () => {
    const [gotApiResponse, setGotApiResponse] = useState(false)
    const dispatch = useDispatch()

    const loginWithToken = async () => {
        const token = localStorage.getItem("token")
        if (!token) {
            setGotApiResponse(true)
            return
        }
        axios.get(`${API_URL}login/token`, {
            headers: {Authorization: `Bearer ${token}`}
        }).then(response => {
            return response.data
        }).then(data => {
            if (data["status_message"] === "user_validated") {
                dispatch(login({
                    "token": token,
                    "firstname": data["first_name"]
                }))
                setGotApiResponse(true)
            }
        }).catch(err => {
            setGotApiResponse(true)
            console.log("Index Page Error")
        })
    }
    return {
        gotApiResponse,
        loginWithToken
    }
}

export default useLoginWithToken