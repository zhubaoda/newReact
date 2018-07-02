import React, { Component } from 'react';
import './tab.css'
class Tab extends Component {
  state = {
  	scrollLeft: 0
  }
  render() {
  	const tabber = this.props.canScroll ? 
  	<div className="outbox">
  	  <div className="scroll_tab" ref="scrollTab">
   	 	<div className="display_box">
        { this.props.list &&  this.props.list.length ? this.props.list.map((todo, index) => (
   	 	<div className="item display_box" style={{ width: this.props.itemWidth + 'px' }}  key={index}  onClick={this.selectBar.bind(this, index)}>
   	 	   <div className={index === this.props.idx ? 'item_box item_active' : 'item_box'}>{ todo }</div>
   	 	</div>
        )) : null }
   	  </div>
   	 </div>
   	</div>: null
    return (
      <div className="tabbar">
        { tabber }
      </div>
    );
  }
  async selectBar (index) {
  	this.props.selectBar(index)
  	this.refs.scrollTab.scrollLeft = index * this.props.itemWidth
  }
}

export default Tab;
