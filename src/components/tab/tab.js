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
    let nowLeft = this.state.scrollLeft
    let afterLeft = index * this.props.itemWidth
    let ranges = afterLeft - nowLeft
    let allLeft = this.props.list.length * this.props.itemWidth
    let speed = ranges / 100
    let timer = setInterval(() => {
    	  if (this.refs.scrollTab.scrollLeft < index * this.props.itemWidth) {
    	  	this.refs.scrollTab.scrollLeft = this.refs.scrollTab.scrollLeft + speed
    	  	if (this.refs.scrollTab.scrollLeft >= allLeft - document.body.clientWidth) {
    	  	  clearInterval(timer)	
    	  	}
    	  } else {
    	  	clearInterval(timer)
    	  }
    }, 5)
  }
  async componentDidMount () {
    this.refs.scrollTab.addEventListener('scroll', (e) => {
    	  this.setState({
    	  	scrollLeft: e.target.scrollLeft
    	  })
    })
  }
}

export default Tab;
