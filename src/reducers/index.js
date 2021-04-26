import {combineReducers} from "redux";
import officeChairReducer from "./officeChairReducer";
import {FETCH_OFFICE_CHAIR} from "../helper";
import cartReducer from "./cartReducer";
import userReducer from "./userReducer";
import {reducer as formReducer } from "redux-form";
import paymentReducer from "./paymentReducer";
import orderReducer from "./orderReducer";


export  default combineReducers({
    officeChairReducer,
    cartReducer,
    userReducer,
    paymentReducer,
    orderReducer,
    form: formReducer
})