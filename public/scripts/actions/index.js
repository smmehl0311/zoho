import constants from './constants.json';
import {authenticateUser, invalidateToken} from '../service/apiClient';

export const setIsLoginLoading = isLoginLoading => ({
  type: constants.IS_LOGIN_LOADING,
  isLoginLoading
});

export const loginSuccess = username => ({
  type: constants.LOG_IN,
  username
});

const loginFailure = error => {
  console.log('login failure', error)
  return {type: constants.LOG_IN_FAIL}
};

export const login = (username, password) => dispatch => {
  console.log('login', {username, password})
  dispatch(setIsLoginLoading(true));
  return authenticateUser(username, password)
    .then(() => {
      dispatch(loginSuccess(username));
      dispatch(setIsLoginLoading(false));
    });
};

export const logout = username => dispatch => {
  console.log('logout', username)
  return invalidateToken(username)
    .then(() => dispatch(resetUserState()))
};

export const resetUserState = () => ({type: constants.LOG_OUT});

