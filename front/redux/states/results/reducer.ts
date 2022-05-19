/* 
  Program that modifies the state of redux
*/

import * as t from "./types";

import type { AppState } from '../../store';

const initialState = {
  resultsDefects: [],
  resultsReportType: "bert",
}

const reducer = (state = initialState, action:any) => {

  switch(action.type){
    case t.SET_RESULTS_DEFECTS:
      return { 
        ...state,
        resultsDefects: action.payload
      };
    case t.SET_RESULTS_REPORT_TYPE:
        return {
            ...state,
            resultsReportType: action.payload
        };
      
    case t.RESET_RESULTS_DEFECTS:
      return {
        ...state,
        resultsDefects: []
      };

    case t.RESET_RESULTS_REPORT_TYPE:
      return {
        ...state,
        resultsReportType: ""
      };

    default:
      return {...state};
    }
}

export const selectResultsDefects = (state: AppState) => state.resultsState.resultsDefects
export const selectResultsReportType = (state: AppState) => state.resultsState.resultsReportType

export default reducer;