import axios from "axios";
import {lng, API_URL} from "../../dictionary/text";

const initState = {
    occupations: [],
}

const rootReduce = (state = initState, action) =>{
        if( action.type === "GET_OCCUPATIONS"){
                    return { ...state,
                        occupations: action.occupations };
                             
        }
        
    return {...state};
}

export default rootReduce;