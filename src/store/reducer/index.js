import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice.js";
import profileReducer from "../slices/profileSlice.js";
import youTubeReducer from "../slices/youTubeSlice.js";
import filterReducer from "../slices/filterSlice.js";


const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    youtube: youTubeReducer,
    filter: filterReducer,
});

export default rootReducer;