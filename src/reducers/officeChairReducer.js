import {CHAIR_SELECTED, FETCH_OFFICE_CHAIR} from "../helper";

const initState = {
    allChair:[],
    singleChair:{}
}

export default (state = initState, action) =>{
    switch (action.type){
        case FETCH_OFFICE_CHAIR:
            return {...state, allChair: [...action.payload]}
        case CHAIR_SELECTED:
            return {...state, singleChair: {...action.payload}}
        default:
            return state;
    }
}