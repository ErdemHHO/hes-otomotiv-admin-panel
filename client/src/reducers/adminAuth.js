
import {ADMINAUTH,ADMINLOGOUT} from "../constants/actionTypes";

const adminAuthReducer=(state={adminAuthData:null},action)=>{

    switch (action.type) {
        case ADMINAUTH:
            localStorage.setItem('adminProfile',JSON.stringify({...action?.data}))
            return {...state,adminAuthData:action?.data}
        case ADMINLOGOUT:
            localStorage.clear();
            return {...state,adminAuthData:null}
        default:
            return state
    }

}

export default adminAuthReducer;