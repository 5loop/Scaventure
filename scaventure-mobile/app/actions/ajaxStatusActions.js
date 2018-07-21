import * as types from '../constants/actionTypes';
import { logoutUser } from './sessionActions';

export function ajaxCallError(error) {
  return dispatch => {
    if (error && error.response && error.response.status === 401) {
      // logout on unauthorized
      console.log('unauth')
      dispatch(logoutUser());
    }
    return dispatch({ type: types.AJAX_CALL_ERROR });
  };
}