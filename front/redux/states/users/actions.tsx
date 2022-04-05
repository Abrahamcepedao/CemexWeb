/* 
  Program that creates that functions that will be used to dispatch actions to the reducer.
*/

import { User } from './state'

import * as t from "./types";

export const setCurrentUser = (user: User) => {
  return { 
    type: t.SET_CURRENT_USER, 
    payload: user
  };
}

export const selectUser = () => {
  return {
    type: t.SELECT_USER
  }
}