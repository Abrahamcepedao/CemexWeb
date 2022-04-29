/* 
  Program that creates that functions that will be used to dispatch actions to the reducer.
*/

import * as t from "./types";

export const setCurrentTab = (tab: string) => {
  return { 
    type: t.SET_CURRENT_TAB, 
    payload: tab
  };
}