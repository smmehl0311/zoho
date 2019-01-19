import {combineReducers} from 'redux';
import user from './user';
import constants from '../actions/constants.json';

const isLoginLoading = (state = false, action) =>
  action.type === constants.IS_LOGIN_LOADING ? action.isLoginLoading : state;

export default combineReducers({user, isLoginLoading});
