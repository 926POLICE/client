import React from 'react';
import { Router, Redirect } from 'react-router';
import { browserRouter, Switch, Route } from 'react-router-dom'

import IndexPage from 'pages/Index.react';
import RegisterPage from 'pages/Register.react';
import BoardIndexPage from 'pages/BoardIndex.react';

export default class App extends React.Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" component={IndexPage}/>

				<Route exact path="/register" component={RegisterPage}/>

				<Route exact path="/board/doctors" component={BoardIndexPage}/>
				<Route exact path="/board/doctors/requests" component={BoardIndexPage}/>
				<Route exact path="/board/doctors/bloodstocks" component={BoardIndexPage}/>

				<Route exact path="/board/pacients" component={BoardIndexPage}/>
				<Route exact path="/board/pacients/donate" component={BoardIndexPage}/>
				<Route exact path="/board/pacients/settings" component={BoardIndexPage}/>
				<Route exact path="/board/pacients/history" component={BoardIndexPage}/>

				<Route exact path="/board/personnel" component={BoardIndexPage}/>
				<Route exact path="/board/personnel/bloodstocks" component={BoardIndexPage}/>

				<Route exact path="/board/[SECTION]/[NAME]" component={BoardIndexPage}/>

				<Redirect from='*' to='/' />
			</Switch>
		);
	}
}
