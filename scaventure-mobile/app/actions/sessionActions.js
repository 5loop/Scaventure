import axios from 'axios';
import { AsyncStorage } from 'react-native';

import { AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
} from '../constants/actionTypes';
          
import AuthApi from '../api/authApi';

export function loginUser({ email, password }) {
  return dispatch => 
    new Promise((resolve, reject) => {
      AuthApi.login({ email, password }).then(response => {
        // localStorage.setItem('token', response.data.token);
        AsyncStorage.setItem('@app:token', response.data.token).then(()=> {
          axios.defaults.headers.common.Authorization = response.data.token;
          dispatch({ type: AUTH_USER });
          resolve();  
        });

        // AsyncStorage.getItem('@app:token').then(token => {
        //   console.log(token);
        //   axios.defaults.headers.common.Authorization = token;
        //   resolve();
        // });
      }).catch((error) => {
        reject(error);
      });
    });
}

export function updateUser({ email, password }) {
  return dispatch => 
    new Promise((resolve, reject) => {
      AuthApi.update({ email, password }).then(response => {
        // localStorage.setItem('token', response.data.token);
        AsyncStorage.setItem('@app:token', response.data.token).then(()=> {
          axios.defaults.headers.common.Authorization = response.data.token;
          dispatch({ type: AUTH_USER });
          resolve();  
        });
      }).catch((error) => {
        reject(error);
      });
    });
}

export function registerUser({ email, password }) {
  return dispatch => 
    new Promise((resolve, reject) => {
      AuthApi.register({ email, password }).then(response => {
        resolve(); 
      }).catch((error) => {
        reject(error);
      });
    });
}

export function logoutUser() {
  return function (dispatch) {
    return new Promise((resolve) => {
      AsyncStorage.removeItem('@app:token');
      dispatch({ type: UNAUTH_USER });
      resolve();
    });
  };
}
