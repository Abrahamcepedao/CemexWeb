/* 
  Program that creates that functions that will be used to dispatch actions to the reducer.
*/

import * as t from "./types";
import { Defect } from "./state"

export const setUsername = (username: string) => {
  return { 
    type: t.SET_USERNAME, 
    payload: username
  };
}

export const setDate1 = (date1: string) => {
  return {
    type: t.SET_DATE1,
    payload: date1
  };
}

export const setDate2 = (date2: string) => {
    return {
        type: t.SET_DATE2,
        payload: date2
    };
}

export const setIssueType = (issueType: string) => {
    return {
        type: t.SET_ISSUE_TYPE,
        payload: issueType
    };
}

export const setParametersType = (parametersType: string) => {
    return {
        type: t.SET_PARAMETERS_TYPE,
        payload: parametersType
    };
}

export const setReportType = (reportType: string) => {
    return {
        type: t.SET_REPORT_TYPE,
        payload: reportType
    };
}

export const setNumberClusters = (numClusters: number) => {
    return {
        type: t.SET_NUMBER_CLUSTERS,
        payload: numClusters
    };
}



