import React from 'react';
import { Router, Redirect } from 'react-router';
import { browserRouter, Switch, Route } from 'react-router-dom'

import IndexPage from 'pages/Index.react';
import LoginPage from 'pages/Login.react';

export default class App extends React.Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" component={LoginPage}/>
				<Route exact path="/board" component={IndexPage}/>

				<Redirect from='*' to='/' />
			</Switch>
		);
	}
}
