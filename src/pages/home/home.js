import React, { Component } from 'react';
import './home.css';
import Head from '../../components/head/head'
class Home extends Component {
  state = {
  	title: '首页'
  }
  render() {
    return (
    	  <div>
        <Head title={this.state.title} />
        <div>哈哈哈, 未完待续~</div>
      </div>
    );
  }
  async componentDidMount () {
  	console.log('come in home page!')
  }
}

export default Home;