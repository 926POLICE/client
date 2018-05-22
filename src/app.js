import React from 'react';
import { Router, Redirect } from 'react-router';
import { browserRouter, Switch, Route } from 'react-router-dom'

import IndexPage from 'pages/Index.react';
import RegisterPage from 'pages/Register.react';
import BoardIndexPage from 'pages/BoardIndex.react';

import TestAPIPage from 'pages/TestAPI.react';

export default class App extends React.Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" component={IndexPage}/>

				<Route exact path="/register" component={RegisterPage}/>

				<Route exact path="/board/doctors" component={BoardIndexPage}/>
				<Route exact path="/board/doctors/bloodrequests" component={BoardIndexPage}/>
				<Route exact path="/board/doctors/bloodrequests/add" component={BoardIndexPage}/>
				<Route exact path="/board/doctors/bloodstocks" component={BoardIndexPage}/>

				<Route exact path="/board/donors" component={BoardIndexPage}/>
				<Route exact path="/board/donors/donate" component={BoardIndexPage}/>
				<Route exact path="/board/donors/settings" component={BoardIndexPage}/>
				<Route exact path="/board/donors/history" component={BoardIndexPage}/>

				<Route exact path="/board/personnel" component={BoardIndexPage}/>
				<Route exact path="/board/personnel/bloodstocks" component={BoardIndexPage}/>

				<Route exact path="/testapi" component={TestAPIPage}/>

				<Redirect from='*' to='/' />
			</Switch>
		);
	}
}
