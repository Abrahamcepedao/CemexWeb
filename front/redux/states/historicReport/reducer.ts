/* 
  Program that modifies the state of redux
*/

import * as t from "./types";

import type { AppState } from '../../../redux/store';

const initialState = {
    username: "",
    date1: "",
    date2: "",
    issueType: "",
    parametersType: "", // ("all", "user", "date", "date_user")
}

const reducer = (state = initialState, action:any) => {

  switch(action.type){
    case t.SET_USERNAME:
        return { 
            ...state,
            username: action.payload
        };

    case t.SET_DATE1:
        return { 
            ...state,
            date1: action.payload
        };

    case t.SET_DATE2:
        return { 
            ...state,
            date2: action.payload
        };
    
    case t.SET_ISSUE_TYPE:
        return {
            ...state,
            issueType: action.payload
        };

    case t.SET_PARAMETERS_TYPE:
        return { 
            ...state,
            parametersType: action.payload
        };
      
    default:
      return {...state};
    }
}

export const selectUsername = (state: AppState) => state.historicReportState.username;
export const selectDate1 = (state: AppState) => state.historicReportState.date1;
export const selectDate2 = (state: AppState) => state.historicReportState.date2;
export const selectIssueType = (state: AppState) => state.historicReportState.issueType;
export const selectParametersType = (state: AppState) => state.historicReportState.parametersType;

export default reducer;