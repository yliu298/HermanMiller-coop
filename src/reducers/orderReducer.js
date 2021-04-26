import {CHECKOUT_SUCCESS, CREATE_ORDER_SUCCESS, CREATING_ORDER, RE_LOGIN} from "../helper";

const initialState = {
    orderStatus: false,
    reLogin: false,
    loading: false
}

const orderReducer = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case CREATING_ORDER:
            return {...state, loading: true}
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                orderStatus: true,
                loading: false
            }
        case RE_LOGIN:
            return {
                ...state,
                reLogin: true
            }
        case CHECKOUT_SUCCESS:
            return {
                ...state,
                orderStatus: false
            }
        default:
            return state
    }
}

export default  orderReducer