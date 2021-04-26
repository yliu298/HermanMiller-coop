import {FETCH_USER} from "../helper";


const initialState = {
    streams: [],
    isSignedIn: false,
    user: null,
    token: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER:
            return {...state, streams:[action.payload]};
        default:
            return state
    }
};

export default userReducer