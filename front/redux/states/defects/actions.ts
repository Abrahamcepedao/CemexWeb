/* 
  Program that creates that functions that will be used to dispatch actions to the reducer.
*/

import { Defect } from './state'

import * as t from "./types";

export const setReduxDefects = (defects: Array<Defect>) => {
  localStorage.setItem("defects", JSON.stringify(defects));
  return { 
    type: t.SET_DEFECTS, 
    payload: defects
  };
}

export const setReduxSearchType = (searchType: string) => {
  localStorage.setItem("searchType", searchType);
  return {
    type: t.SET_SEARCH_TYPE,
    payload: searchType
  }
}

export const setReduxUsername = (username: string) => {
  localStorage.setItem("defectUsername", username);
  return {
    type: t.SET_USERNAME,
    payload: username
  }
}

export const setReduxDate1 = (date1: string) => {
  localStorage.setItem("defectDate1", date1);
  return {
    type: t.SET_DATE1,
    payload: date1
  }
}

export const setReduxDate2 = (date2: string) => {
  localStorage.setItem("defectDate2", date2);
  return {
    type: t.SET_DATE2,
    payload: date2
  }
}