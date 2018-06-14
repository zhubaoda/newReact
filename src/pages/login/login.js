import React, { Component } from 'react';
import './login.css';
import Head from '../../components/head/head'
class Login extends Component {
  state = {
  	title: '登录'
  };
  render() {
    return (
      <div className="login">
        <Head title={this.state.title} />
      </div>
    );
  }
}

export default Login;