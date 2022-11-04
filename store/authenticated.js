import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    token: null,
    firstName: null
}

const authenticatedSlice = createSlice({
    name: "Authenticated Slice",
    initialState,
    reducers: {
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload
        },
        login: (state, action) => {
            state.isAuthenticated = true
            state.token = action.payload["token"]
            state.firstName = action.payload["firstname"]
        }
        ,
        logout: (state)=>{
            state.isAuthenticated = false
            state.token = null
            state.firstName = null
        }
    }
})

export default authenticatedSlice.reducer;
export const {setAuthenticated, login, logout} = authenticatedSlice.actions;