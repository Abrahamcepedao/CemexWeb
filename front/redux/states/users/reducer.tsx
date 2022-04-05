import * as t from "./types";

import type { AppState, AppThunk } from '../../../redux/store';

const initialState = {
  user: null
}

const reducer = (state = initialState, action:any) => {

  switch(action.type){
    case t.SET_CURRENT_USER:
      return { 
        ...state,
        user: action.payload
      };
    
    case t.SET_CURRENT_USER:
      return { 
        ...state,
        user: action.payload
      };
      
    default:
      return {...state};
    }
}

export const selectUser = (state: AppState) => state.userState.user

export default reducer;