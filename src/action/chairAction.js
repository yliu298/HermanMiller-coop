import {CHAIR_SELECTED, FETCH_OFFICE_CHAIR} from "../helper";
import request from "../api/request";

export const actFetchOfficeChair = () => async dispatch => {
    try {
        let officeChairs = await request.get("product");
        console.log("officeChair", officeChairs)
        dispatch(
            {
                type: FETCH_OFFICE_CHAIR,
                payload: officeChairs.data.data
            }
        )
    } catch (e) {
        console.log("There is somthing wrong in feching chair data.")
    }
}

export const actSelectChair =(id)=> async dispatch => {
    console.log('action fetch one product')
    try {
        let selectedChair = await request.get(`product/${id}`);
        dispatch(
            {
                type: CHAIR_SELECTED,
                payload: selectedChair.data.data
            }
        )
    } catch (e) {
        console.log("There is somthing wrong in feching single chair data.")
    }
}