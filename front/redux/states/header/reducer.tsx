/* 
  Program that modifies the state of redux
*/

import * as t from "./types";

import type { AppState } from '../../../redux/store';

const initialState = {
  tab: "dashboard"
}

const reducer = (state = initialState, action:any) => {

  switch(action.type){
    case t.SET_CURRENT_TAB:
      return { 
        ...state,
        tab: action.payload
      };
    default:
      return {...state};
    }
}

export const selectTab = (state: AppState) => state.headerState.tab

export default reducer;