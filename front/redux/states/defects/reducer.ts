/* 
  Program that modifies the state of redux
*/

import * as t from "./types";

import type { AppState } from '../../store';

const initialState = {
  defects: []
}

const reducer = (state = initialState, action:any) => {

  switch(action.type){
    case t.SET_DEFECTS:
      return { 
        ...state,
        defects: action.payload
      };
      
    default:
      return {...state};
    }
}

export const selectDefects = (state: AppState) => state.defectsState.defects;

export default reducer;