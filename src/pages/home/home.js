import React, { Component } from 'react';
import './home.css';
import Head from '../../components/head/head'
import Main from '../../components/main/main'
class Home extends Component {
  render() {
    return (
      <div className="home">
        <Head/>
        <Main/>
      </div>
    );
  }
}

export default Home;