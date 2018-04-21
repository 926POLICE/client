import React from 'react';
import { Router, Redirect } from 'react-router';
import { browserRouter, Switch, Route } from 'react-router-dom'

import IndexPage from 'pages/Index.react';
import BoardIndexPage from 'pages/BoardIndex.react';

export default class App extends React.Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" component={IndexPage}/>
				<Route exact path="/board/pacients" component={BoardIndexPage}/>
				<Route exact path="/board/pacients/donate" component={BoardIndexPage}/>

				<Redirect from='*' to='/' />
			</Switch>
		);
	}
}
