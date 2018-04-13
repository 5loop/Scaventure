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

  // send confirmation code
  static sendCode(credentials) {
    return axios.post(`${apiUrl}/api/auth/forgot_password`, credentials);
  }

  // reset password
  static resetPasswd(credentials) {
    return axios.post(`${apiUrl}/api/auth/reset_password`, credentials);
  }
}

export default AuthApi;
