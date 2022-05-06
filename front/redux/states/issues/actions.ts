/* 
  Program that creates that functions that will be used to dispatch actions to the reducer.
*/

import * as t from "./types";

export const setReduxIssues = (issues: Array<string>) => {
  localStorage.setItem("issues", JSON.stringify(issues));
  return { 
    type: t.SET_ISSUES, 
    payload: issues
  };
}