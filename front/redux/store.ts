/* 
  Program to store the state of the application in Redux.
*/

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import userReducer from './states/users/reducer'
import fileReducer from './states/file/reducer'
import headerReducer from './states/header/reducer'

export function makeStore() {
  return configureStore({
    reducer: { 
      userState: userReducer,
      fileState: fileReducer,
      headerState: headerReducer
    },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store;