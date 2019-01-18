import constants from '../actions/constants.json';

const objectBar = (state = {}, action) => {
  switch(action.type) {
    case constants.OBJECT_BAR_SELECT:
      return Object.assign({}, {...state}, {selectedObject: action.selectedObject});
    default:
      return state;
  }
}

export default objectBar;
