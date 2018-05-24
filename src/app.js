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

				<Route exact path="/board/doctors/:userID" component={BoardIndexPage}/>
				<Route exact path="/board/doctors/bloodrequests/:userID" component={BoardIndexPage}/>
				<Route exact path="/board/doctors/bloodrequests/add/:userID" component={BoardIndexPage}/>
				<Route exact path="/board/doctors/bloodstocks/:userID" component={BoardIndexPage}/>

				<Route exact path="/board/donors/:userID" component={BoardIndexPage}/>
				<Route exact path="/board/donors/donate/:userID" component={BoardIndexPage}/>
				<Route exact path="/board/donors/settings/:userID" component={BoardIndexPage}/>
				<Route exact path="/board/donors/history/:userID" component={BoardIndexPage}/>

				<Route exact path="/board/personnel/:userID" component={BoardIndexPage}/>
				<Route exact path="/board/personnel/bloodstocks/:userID" component={BoardIndexPage}/>
				<Route exact path="/board/personnel/bloodrequests/:userID" component={BoardIndexPage}/>
				<Route exact path="/board/personnel/donors/:userID" component={BoardIndexPage}/>
				<Route exact path="/board/personnel/donors/edit/:donorID/:userID" component={BoardIndexPage}/>

				<Route exact path="/testapi" component={TestAPIPage}/>

				<Redirect from='*' to='/' />
			</Switch>
		);
	}
}
