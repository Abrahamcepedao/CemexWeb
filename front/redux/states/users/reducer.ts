/* 
  Program that modifies the state of redux
*/

import * as t from "./types";

import type { AppState } from '../../store';

const initialState = {
   //@ts-ignore
  users: []
}

const reducer = (state = initialState, action:any) => {

  switch(action.type){
    case t.SET_USERS:
      return { 
        ...state,
        userS: action.payload
      };
      
    default:
      return {...state};
    }
}

export const selectUsers = (state: AppState) => state.usersState.users

export default reducer;