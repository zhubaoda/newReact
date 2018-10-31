import React, { Component } from 'react';
import interfaces from './interfaces/index'
import common from './js/common'
import Global from './interfaces/globalname'
import Home from './pages/home/home';
import Login from './pages/login/login';
import { Switch, Route } from 'react-router-dom';
class MyRouter extends Component {
	render() {
		return (
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/login' component={Login} />
			</Switch>
		);
	}
	async autoWXLogin() {
		let actiontype = Global.WeiXinwechatLogin
		let args = { Code: common.getUrlQuery('code'), State: '' }
		await interfaces.wechatLogin(actiontype, args)
	}
	// 微信登陆
	async componentWillMount() {
		let actionType = common.getUrlQuery("actionType").toLowerCase()
		let code = common.getUrlQuery("code")
		if (actionType && actionType === "wechatlogin" && code) {
			if (code !== localStorage.getItem('code')) {
				localStorage.setItem('code', code)
				this.autoWXLogin()	
			}
		}

	}
}


export default MyRouter;
