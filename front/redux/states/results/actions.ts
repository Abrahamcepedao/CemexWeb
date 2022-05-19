/* 
  Program that creates that functions that will be used to dispatch actions to the reducer.
*/

import { Defect } from './state'

import * as t from "./types";

export const setResultsDefects = (defects: Array<Defect>) => {
  localStorage.setItem("resultsDefects", JSON.stringify(defects));
  return { 
    type: t.SET_RESULTS_DEFECTS, 
    payload: defects
  };
}

export const serResultsReportType = (reportType: string) => {
    localStorage.setItem("resultsReportType", reportType);
    return { 
        type: t.SET_RESULTS_REPORT_TYPE, 
        payload: reportType
    };
}

export const resetResultsDefects = () => {
  localStorage.setItem("resultsDefects", JSON.stringify([]));
  return { 
    type: t.RESET_RESULTS_DEFECTS
  };
}

export const resetResultsReportType = () => {
  localStorage.setItem("resultsReportType", "");
  return { 
    type: t.RESET_RESULTS_REPORT_TYPE
  };
}