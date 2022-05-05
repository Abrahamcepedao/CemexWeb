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
