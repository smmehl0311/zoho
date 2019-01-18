import constants from '../actions/constants';
import {checkToken} from '../service/apiClient';
import {loginSuccess} from '../actions/index';

export const queryCanvas = (objects, x, y) => {
  const isXInBounds = (x1, {x,w}) => x1 < x + w/2 && x1 > x - w/2;
  const isYInBounds = (y1, {y,h}) => y1 < y + h/2 && y1 > y - h/2;
  const idx = objects.findIndex(({transform}) => isXInBounds(x, transform) && isYInBounds(y, transform));
  const object = objects[idx];
  return idx === -1 ? null : {idx, object};
}

export const isSameObject = (obj1, obj2) => obj1.transform.x === obj2.transform.x && obj1.transform.y === obj2.transform.y;

export const drawObject = (ctx, object, {circles, squares, diamonds}) => {
  switch(object.type) {
    case 'circle':
      drawCircle(ctx, object.transform, circles.length || 1);
      break;
    case 'square':
      drawSquare(ctx, object.transform, squares.length || 1);
      break;
    case 'diamond':
      drawDiamond(ctx, object.transform, diamonds.length || 1);
      break;
  }
}

export const drawCircle = (ctx, {x,y,w,h}, num) => {
  ctx.fillStyle = constants.GREEN;
  // ctx.clearRect(x - w/2, y - h/2, w, h);
  ctx.beginPath();
  ctx.arc(x,y,25,0,2*Math.PI);
  ctx.fill();
  drawText(ctx, num, x, y);
  console.log('drew circle')
}

export const drawSquare = (ctx, {x,y,w,h}, num) => {
  ctx.fillStyle = constants.RED;
  ctx.clearRect(x - w/2, y - h/2, w, h);
  ctx.fillRect(x - w/2, y - h/2, w, h);
  drawText(ctx, num, x, y);
  console.log('drew square')
}

export const drawDiamond = (ctx, {x,y,w,h}, num) => {
  ctx.fillStyle = constants.YELLOW;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(45*Math.PI/180);
  // ctx.clearRect(x - w/2, y - h/2, w, h);
  ctx.fillRect(0-w/2, 0-h/2, w, h);
  ctx.restore();
  drawText(ctx, num, x, y);
  console.log('drew diamond')
}

const drawText = (ctx, string, x, y) => {
  ctx.font = '38px Arial';
  ctx.fillStyle = constants.BLACK;
  ctx.textAlign = 'center';
  ctx.fillText(string,x,y+14);
}

export const checkUserAndAuthToken = ({user, loginSuccess, setIsLoginLoading}) => {
  const authSplit = document.cookie.split('auth-token=');
  const semicolonSplit = authSplit.length > 1 ? authSplit[1].split(';') : void 0;
  const authToken = semicolonSplit ? semicolonSplit[0] : void 0;
  console.log('authToken', authToken)
  if (authToken && !user) {
    setIsLoginLoading(true);
    const username = authToken.split(':')[0];
    checkToken()
      .then(() => {
        loginSuccess(username);
        setIsLoginLoading(false);
      })
      .catch(err => console.log(err));
  }
}
