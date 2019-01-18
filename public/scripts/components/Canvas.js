import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import {queryCanvas, isSameObject, drawObject, drawCircle, drawSquare, drawDiamond} from './utils';
import blank_blueprint from '../../images/blank_blueprint.png';
import Objectbar from './Objectbar';

class Canvas extends Component {
  constructor(props) {
    super(props);
    console.log('props', props);
    this.onClick = this.onClick.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.animate = this.animate.bind(this);
    this.scrollElement = document.documentElement;
    this.state = {mouseDown: false, clientX: 0, clientY: 0};
  }

  componentDidMount() {
    const {canvas, img} = this.refs;
    const ctx = canvas ? canvas.getContext('2d') : void 0;
    ctx ? ctx.fillStyle = '#6a737d' : void 0;
    img ? img.onload = () => ctx.drawImage(img, 0, 0) : void 0;
  }

  componentWillReceiveProps(newProps) {
    const newObjects = newProps.canvas.objects || [];
    const oldObjects = this.props.canvas.objects || [];
    const ctx = this.refs.canvas.getContext('2d');
    const isNotUpdatable = (newObj, oldObj) => isSameObject(newObj, oldObj) && newObj.selected === oldObj.selected;
    newObjects
      .filter(newObj => !oldObjects.filter(oldObj => isNotUpdatable(newObj, oldObj)).length)
      .forEach(object => drawObject(ctx, object, newProps.canvas));
  }

  onClick(e) {
    const {addSquare, addCircle, addDiamond, selectObject, objectBar} = this.props;
    e.persist();
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.x;
    const y = e.clientY - rect.y;
    const object = queryCanvas(this.props.canvas.objects || [], x, y);
    if (object === null) {
      const ctx = this.refs.canvas.getContext('2d');
      console.log('onClick', objectBar.selectedObject)
      switch(objectBar.selectedObject) {
        case 'circle':
          console.log('added circle')
          addCircle(x,y,50,50);
          break;
        case 'diamond':
          console.log('added diamond')
          addDiamond(x,y,50,50);
          break;
        case 'pentagon':
          console.log('added square')
          addSquare(x,y,50,50);
          break;
      }
    } else if (object.object.selected !== true) {
      selectObject(object.idx);
    }
  }

  onMouseDown(e) {
    const scrollLeft = this.scrollElement.scrollLeft
    const scrollTop = this.scrollElement.scrollTop
    const startx = e.clientX + this.scrollElement.scrollLeft;
    const starty = e.clientY + this.scrollElement.scrollTop;
    const diffx = 0;
    const diffy = 0;
    this.setState({mouseDown: true, diffx, diffy, startx, starty});
  }

  onMouseUp(e) {
    if (this.state.mouseDown) {
      this.animate();
    }
    this.setState({mouseDown: false});
  }

  onMouseOut(e) {
    if (this.state.mouseDown) {
      this.animate();
    }
    this.setState({mouseDown: false});
  }

  animate() {
    const {scrollElement} = this;
    const {diffx, diffy} = this.state;
    let start = 1;
    const animate = function() {
      let step = Math.sin(start);
      if (step <= 0) {
        console.log('end animate')
        window.cancelAnimationFrame(animate);
      } else {
        scrollElement.scrollLeft += diffx * step;
        scrollElement.scrollTop += diffy * step;
        start -= 0.02;
        window.requestAnimationFrame(animate);
      }
    }
    // animate();
  }

  onMouseMove(e) {
    const {selectedObject} = this.props.objectBar;
    const {mouseDown, clientX, clientY, startx, starty} = this.state;
    if (mouseDown === true && (selectedObject === '' || selectedObject === void 0)) {
      e.preventDefault();
      const diffx = (startx - (e.clientX + this.scrollElement.scrollLeft));
      const diffy = (starty - (e.clientY + this.scrollElement.scrollTop));
      this.scrollElement.scrollLeft += diffx;
      this.scrollElement.scrollTop += diffy;
      this.setState({diffx, diffy});
    }
  }

  render() {
    const {objectBar, scrollLeft, scrollTop} = this.props;
    const {selectedObject} = objectBar;
    const pointerClass = selectedObject === 'circle' || selectedObject === 'pentagon' || selectedObject === 'diamond' ? 'pointer' : 'grab';
    const className = pointerClass === 'grab' && this.state.mouseDown ? 'grabbing' : pointerClass;
    return (
      <div className={className} ref="scroller" style={{overflow: 'scroll-x'}}>
        <canvas ref="canvas" width={2200} height={1700}
          onClick={this.onClick} onMouseMove={this.onMouseMove} onMouseOut={this.onMouseOut} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
          <img ref="img" src={`../../../dist/${blank_blueprint}`}/>
        </canvas>
        <Objectbar {...this.props}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {...state, ...ownProps}
};

export default withRouter(connect(mapStateToProps,actions)(Canvas));
