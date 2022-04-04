import * as t from "../types";

const main = (state = {
    user: null,
}, action) => {

  switch(action.type){
    case t.SET_CURRENT_USER:
      return { 
        ...state,
        user: action.payload
      };
      
    default:
      return {...state};
    }
}

export default main;