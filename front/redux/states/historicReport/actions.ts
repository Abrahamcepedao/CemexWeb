/* 
  Program that creates that functions that will be used to dispatch actions to the reducer.
*/

import * as t from "./types";

export const setHistoricUsername = (username: string) => {
  return { 
    type: t.SET_USERNAME, 
    payload: username
  };
}

export const setHistoricDate1 = (date1: string) => {
  return {
    type: t.SET_DATE1,
    payload: date1
  };
}

export const setHistoricDate2 = (date2: string) => {
    return {
        type: t.SET_DATE2,
        payload: date2
    };
}

export const setHistoricIssueType = (issueType: string) => {
    return {
        type: t.SET_ISSUE_TYPE,
        payload: issueType
    };
}

export const setHistoricParametersType = (parametersType: string) => {
    return {
        type: t.SET_PARAMETERS_TYPE,
        payload: parametersType
    };
}




