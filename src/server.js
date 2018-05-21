import path from 'path';
import http from 'http';
import Express from 'express';
import Helmet from 'react-helmet';

import React from 'react';
import { match, RouterContext } from 'react-router';
import ReactDOMServer from 'react-dom/server'
import { StaticRouter, Redirect } from 'react-router'

import App from 'app';

const app = new Express(); // Initialize Express variable
app.set('view engine', 'ejs'); // Setting up the view engine
app.set('views', path.join(__dirname, '..', 'views')); // Setting up the views folder
app.use(Express.static(path.join(__dirname, '..', 'static')));

// universal routing and rendering
app.get('/board/*', (req, res) => {
    const context = {}

    const markup = ReactDOMServer.renderToString(
        <StaticRouter
            location={req.url}
            context={context}>
            <App/>
        </StaticRouter>
    );

    const helmet = Helmet.renderStatic();

    return res.render('board', { markup: markup, helmet: helmet });
});

// universal routing and rendering
app.get('*', (req, res) => {
    const context = {}

    const markup = ReactDOMServer.renderToString(
        <StaticRouter
            location={req.url}
            context={context}>
            <App/>
        </StaticRouter>
    );

    const helmet = Helmet.renderStatic();

    return res.render('index', { markup: markup, helmet: helmet });
});

const server = new http.Server(app); // Create a server through Express
server.listen(1337, err => {
    if (err) {
        return console.error(err);
    }
    console.info(`Server running on http://localhost:1337`);
});
