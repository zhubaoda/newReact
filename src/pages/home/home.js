import React, { Component } from 'react'
import './home.css'
import Head from '../../components/head/head'
import Tab from '../../components/tab/tab'
class Home extends Component {
  state = {
  	title: '首页',
  	list: ['选项一', '选项二', '选项三', '选项四', '选项五', '选项六', '选项七', '选项八'],
  	idx: 0,
  	canScroll: 1,
  	itemWidth: 100,
  	url: ""
  }
  render() {
    return (
    	  <div>
        <Head title={this.state.title} />
        <Tab 
          list={this.state.list}
          idx={this.state.idx}
          canScroll={this.state.canScroll}
          itemWidth={this.state.itemWidth}
          selectBar={this.selectBar.bind(this)}
        />  
      </div>
    );
  }
  selectBar (index) {
  	this.setState({
  	  idx: index
  	})
  }
  async componentDidMount () {
    console.log('welcome entering home page!')
  }
}

export default Home;