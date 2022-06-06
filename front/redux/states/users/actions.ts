/* 
  Program that creates that functions that will be used to dispatch actions to the reducer.
*/

import { User } from './state'

import * as t from "./types";

export const setReduxUsers = (users: Array<User>) => {
  localStorage.setItem("users", JSON.stringify(users));
  return { 
    type: t.SET_USERS, 
    payload: users
  };
}
