import { combineReducers } from "redux";
import loginReducer from "./login";

const AllReducer = combineReducers({
    loginReducer,
})

export default AllReducer;