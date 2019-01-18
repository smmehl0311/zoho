import constants from '../actions/constants.json';

const user = (state = null, action) => {
  switch (action.type) {
    case constants.LOG_IN:
      console.log(action)
      return action.username;
    case constants.LOG_OUT:
      return null;
    default:
      return state;
  }
}

export default user;
