import {combineReducers} from 'redux';
import user from './user';
import canvas from './canvas';
import objectBar from './objectBar';
import constants from '../actions/constants.json';

const isLoginLoading = (state = false, action) =>
  action.type === constants.IS_LOGIN_LOADING ? action.isLoginLoading : state;

export default combineReducers({user, canvas, objectBar, isLoginLoading});
