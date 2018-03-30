import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from 'app';

// import { Provider } from 'react-redux'
// import { createStore } from 'redux';

// Grab the state from a global variable injected into the server-generated HTML
// const preloadedState = window.__PRELOADED_STATE__

// const reducers = require('redux/reducers').default;

// Allow the passed state to be garbage-collected
// delete window.__PRELOADED_STATE__

// Create Redux store with initial state
// const store = createStore(reducers, preloadedState)

window.onload = () => {
    ReactDOM.render((
        // <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        // </Provider>
    ), document.getElementById('main'))
};
