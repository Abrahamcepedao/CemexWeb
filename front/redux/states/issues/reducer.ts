/* 
  Program that modifies the state of redux
*/

import * as t from "./types";

import type { AppState } from '../../store';

const initialState = {
  issues: [],
}

const reducer = (state = initialState, action:any) => {

  switch(action.type){
    case t.SET_ISSUES:
      return { 
        ...state,
        issues: action.payload
      };
      
    default:
      return {...state};
    }
}

export const selectIssues = (state: AppState) => state.issuesState.issues;

export default reducer;