import constants from '../actions/constants.json';

const canvas = (state = {}, action) => {
  switch (action.type) {
    case constants.ADD_OBJECT:
      const objects = state.objects ? state.objects.concat(action.object) : [].concat(action.object);
      switch(action.object.type) {
        case 'circle':
          const circles = state.circles ? state.circles.concat(action.object) : [].concat(action.object);
          return Object.assign({}, {...state}, {circles, objects});
        case 'square':
          const squares = state.squares ? state.squares.concat(action.object) : [].concat(action.object);
          return Object.assign({}, {...state}, {squares, objects});
        case 'diamond':
          const diamonds = state.diamonds ? state.diamonds.concat(action.object) : [].concat(action.object);
          return Object.assign({}, {...state}, {diamonds, objects});
        default:
          return state;
      }
    case constants.SELECT_OBJECT:
      return state.objects.map((object, index) => {
        const newObj = Object.assign({}, {...object});
        if (action.idx === index)
          newObj.selected = true
        else
          newObj.selected = false
        return newObj;
      });
    default:
      return state;
  }
}

export default canvas;
