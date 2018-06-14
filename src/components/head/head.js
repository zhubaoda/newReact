import React, { Component } from 'react';
import './head.css';
import leftArrow from '../../static/icon/left-arrow.svg';

class Head extends Component {
  goBack () {
  	window.history.go(-1);
  };
  render() {
    return (
      <div className="head flex-box">
        <img className="image" src={leftArrow} alt='' onClick={this.goBack.bind(this)} />
        <div>{this.props.title}</div>
      </div>
    );
  }
}

export default Head;
