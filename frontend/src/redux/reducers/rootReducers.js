import { combineReducers } from "redux";
import { userReducers } from "./UserReducer/userReducer";

const rootReducer = combineReducers({
    userReducers
});

export default rootReducer;