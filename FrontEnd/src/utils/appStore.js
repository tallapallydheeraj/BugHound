import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import showOneReducer from "./showOne"
import bugsReducer from "./bugsSlice"
import tablesReducer from "./tablesSlice"
import areaReducer from "./areaSlice"

const appStore = configureStore({
    reducer:{
        user:userReducer,
        showOne:showOneReducer,
        bugs: bugsReducer,
        tables:tablesReducer,
        area:areaReducer
    }
})

export default appStore;