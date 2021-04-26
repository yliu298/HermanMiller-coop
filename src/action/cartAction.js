import {ADD_TO_CART, CART_DEL_ITEM, CHANGE_QTY, FETCH_CART} from "../helper";

export const addToCart = (chairObj) => {

    console.log('object from addtocart', chairObj);

        let cartArray = JSON.parse(localStorage.getItem("cartArray"));
        if(cartArray){
        let found = cartArray.find(el => el.buildedChair.id === chairObj.buildedChair.id);
        console.log('found', found)
        if (found === undefined){
            cartArray.push(chairObj)
        }else{
            let index = cartArray.indexOf(found);
            console.log('index', index)
            let compareObj = JSON.stringify(chairObj.buildedChair.profileCategories) === JSON.stringify(found.buildedChair.profileCategories);
            console.log(compareObj)
            if (compareObj){
                cartArray[index].itemQuantity += parseInt(chairObj.itemQuantity);
            }else{
                cartArray.push(chairObj);
            }
        }
        
        console.log('chairArray', chairObj)
        localStorage.setItem("cartArray", JSON.stringify(cartArray))
        }else{
            localStorage.setItem("cartArray", JSON.stringify([chairObj]))
        }
    return {
        type:ADD_TO_CART,
        payload:JSON.parse(localStorage.getItem("cartArray"))
    }
}

export const fetchCart = () => {
    return {
        type: FETCH_CART,
        payload: JSON.parse(localStorage.getItem("cartArray"))
    }
}

export const cartDelItem = (cartArray) => {
    if (cartArray.length === 0){
        localStorage.clear();
    }else {
        localStorage.setItem("cartArray", JSON.stringify(cartArray))
    }
    return {
        type: CART_DEL_ITEM,
        payload: JSON.parse(localStorage.getItem("cartArray"))
    }
}

export const cartChangeQty = (index, qty) => {
    return {
        type: CHANGE_QTY,
        payload: [JSON.parse(localStorage.getItem("cartArray")), index, qty]
    }
}