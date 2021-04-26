import {ADD_TO_CART, CART_DEL_ITEM, CHANGE_QTY, FETCH_CART} from "../helper";

const initialState = {
    cartItem: [],
};

const cartReducer = (state = initialState, action) => {

    switch (action.type){
        case ADD_TO_CART:
        case FETCH_CART:
        case CART_DEL_ITEM:
            return{...state, cartItem: action.payload}
        case CHANGE_QTY:
            let newQtyCart = action.payload[0];
            newQtyCart[action.payload[1]].itemQuantity = action.payload[2];
            localStorage.setItem("cartArray", JSON.stringify(newQtyCart));
            return{...state, cartItem: newQtyCart}
        default:
            return state
    }
}


export default cartReducer