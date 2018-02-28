import axios from 'axios';
import { apiUrl } from './config';

class AuthApi {
  /* Login User */
  static login(credentials) {
    return axios.post(`${apiUrl}/api/auth/login`, credentials);
  }

  /* Update User Credentials */
  static update(credentials) {
    return axios.post(`${apiUrl}/api/auth/update`, credentials);
  }

  /* Add User  */
  static register(credentials) {
    return axios.post(`${apiUrl}/api/auth/register`, credentials);
  }
}

export default AuthApi;