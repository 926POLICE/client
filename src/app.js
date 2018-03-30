import React from 'react';
import { Router, Redirect } from 'react-router';
import { browserRouter, Switch, Route } from 'react-router-dom'

// import IndexPage from 'pages/Public/Main.react'
import LoginPage from 'pages/Login.react';

export default class App extends React.Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" component={LoginPage}/>

				<Redirect from='*' to='/' />
			</Switch>
		);
	}
}
