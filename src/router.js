import React, { Component } from 'react';
import Home from './pages/home/home'
import { Switch, Route } from 'react-router-dom'
class MyRouter extends Component {
	render() {
	    return (
	        <Switch>
			  <Route exact path='/' component={Home}/>
			</Switch>
	    );
	}
}


export default MyRouter;
