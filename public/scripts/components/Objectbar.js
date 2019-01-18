import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';
import pan_tool from '../../images/pan_tool.png';
import circle from '../../images/circle.png';
import diamond from '../../images/diamond.png';
import pentagon from '../../images/pentagon.png'

const Objectbar = (props) => {
  const {objectBar, objectBarSelect} = props;
  const classNames = 'btn btn-primary bmd-btn-fab ';
  const panActive = objectBar.selectedObject === '' ? 'active' : void 0;
  const circleActive = objectBar.selectedObject === 'circle' ? 'active' : void 0;
  const diamondActive = objectBar.selectedObject === 'diamond' ? 'active' : void 0;
  const pentagonActive = objectBar.selectedObject === 'pentagon' ? 'active' : void 0;
  return (
    <div className="btn-group btn-group-large" role="group" aria-label="object bar">
      <button type="button" className={classNames + panActive} onClick={() => objectBarSelect('')}>
        <img src={`../../../dist/${pan_tool}`} width={38} height={38}/>
      </button>
      <button type="button" className={classNames + circleActive} onClick={() => objectBarSelect('circle')}>
        <img src={`../../../dist/${circle}`}/>
      </button>
      <button type="button" className={classNames + diamondActive} onClick={() => objectBarSelect('diamond')}>
        <img src={`../../../dist/${diamond}`}/>
      </button>
      <button type="button" className={classNames + pentagonActive} onClick={() => objectBarSelect('pentagon')}>
        <img src={`../../../dist/${pentagon}`}/>
      </button>
    </div>);
};

export default Objectbar;
