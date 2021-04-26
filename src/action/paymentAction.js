import {
    CHECKOUT_FAILED,
    CHECKOUT_SUCCESS,
    CREATE_ORDER_FAILED,
    CREATE_ORDER_SUCCESS,
    CREATING_ORDER,
    ORDER_STORAGE,
    RE_LOGIN,
    TOKEN
} from "../helper";
import request from "../api/request";

export const actCreateOrder = (order) => (dispatch) =>{
    console.log("changed fetching?")
    dispatch({ type:CREATING_ORDER })

    let patch = {}
    patch.taxRate = 1.13;
    patch.isActive = true;
    patch.isDelete = false;
    patch.orderItems = []
    order.map((item,index1) => {
        patch.orderItems.push({
            quantity: parseInt(item.itemQuantity),
            product:item.buildedChair.id,
            profileItems:[],

        })
        item.buildedChair.profileCategories.map((cat,index2) => {
            cat.profileItems.map((profileItem, index3) => {
                if (profileItem.checked === true){
                    patch.orderItems[index1].profileItems.push(profileItem.id)
                }
            })
        })
        console.log(patch)
    })
    console.log('line37', patch)
    const token = localStorage.getItem(TOKEN)

    return(
        request.post("order",patch,{headers:{"Authorization":`bearer ${token}`}}).then(res => {
            if (res.data.code === 8241){
                dispatch({
                    type: RE_LOGIN,
                    payload:res.data
                })
            } else{
                console.log(`${CREATE_ORDER_SUCCESS}`,res)
                console.log(`${CREATE_ORDER_SUCCESS}`,res.data.data.id)
                localStorage.setItem(ORDER_STORAGE,JSON.stringify(res.data.data.id))
                dispatch({
                    type:CREATE_ORDER_SUCCESS,
                    payload:res
                })
            }

        }).catch(error =>{
            if (error.response.data.code === 8241){
                //8241 means token has expired
                localStorage.removeItem(TOKEN)
                dispatch({
                    type: RE_LOGIN,
                    payload:error.response.data
                })
            } else {
                console.log(`${CREATE_ORDER_FAILED}`,error.response)
                dispatch({
                    type: CREATE_ORDER_FAILED,
                    payload:error.response
                })
            }
        })
    )

}

export const actPayment = (res, order) => {
    let data = {};
    data.order = [];
    let cartArr = JSON.parse(localStorage.getItem("cartArray"));
    data.order[0] = JSON.parse(localStorage.getItem(ORDER_STORAGE));
    data.gateway = res.payer.payment_method;
    data.status = res.state;
    data.transactionId = res.id;
    data.amount = parseFloat(res.transactions.map(a=>a.amount.total));
    data.notes = "placeholder";
    const token = localStorage.getItem(TOKEN)

    return(dispatch)=>{
        request.post("payment", data,{headers:{"Authorization":`bearer ${token}`}})
            .then(res=>{
                localStorage.removeItem("cartArray")
                dispatch({
                    type:CHECKOUT_SUCCESS,
                    payload:res
                })
            })
            .catch(error=>{
                dispatch({
                    type:CHECKOUT_FAILED,
                    payload:error.response
                })
            })
    }
}