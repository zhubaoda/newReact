import React, { Component } from 'react';
import Home from './pages/home/home';
import Login from './pages/login/login';
import { Switch, Route } from 'react-router-dom';
class MyRouter extends Component {
	render() {
	    return (
	      <Switch>
			    <Route exact path='/' component={Home}/>
			    <Route exact path='/login' component={Login}/>
			  </Switch>
	    );
	}
}


export default MyRouter;
