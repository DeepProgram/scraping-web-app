import {configureStore} from "@reduxjs/toolkit";
import authenticatedSlice from "./authenticated";

const store = configureStore({
    reducer: {
        authenticatedSlice: authenticatedSlice
    }
})

export default store