import {CHECKOUT_SUCCESS} from "../helper";

const initialState = {
    backToPage: false
}

const paymentReducer = (state = initialState, action) => {
    const {type, payload} =action;
    switch (type){
        case CHECKOUT_SUCCESS:
            return  {...state, backToPage: true}
        default:
            return state
    }
}

export default paymentReducer