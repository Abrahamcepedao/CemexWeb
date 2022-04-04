import * as t from "../types";

export const setCurrentUser = (user) => dispatch => {
  dispatch({
    type: t.SET_CURRENT_USER,
    payload: user
  });
}