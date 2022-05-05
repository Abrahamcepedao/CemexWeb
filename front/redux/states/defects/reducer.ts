/* 
  Program that modifies the state of redux
*/

import * as t from "./types";

import type { AppState } from '../../store';

const initialState = {
  defects: [],
  searchType: "",
  username: "",
  date1: "",
  date2: "",
}

const reducer = (state = initialState, action:any) => {

  switch(action.type){
    case t.SET_DEFECTS:
      return { 
        ...state,
        defects: action.payload
      };

    case t.SET_SEARCH_TYPE:
      return {
        ...state,
        searchType: action.payload
      }
    
    case t.SET_USERNAME:
      return {
        ...state,
        username: action.payload
      }
    
    case t.SET_DATE1:
      return {
        ...state,
        date1: action.payload
      }

    case t.SET_DATE2:
      return {
        ...state,
        date2: action.payload
      }
      
    default:
      return {...state};
    }
}

export const selectDefects = (state: AppState) => state.defectsState.defects;
export const selectSearchType = (state: AppState) => state.defectsState.searchType;

export default reducer;