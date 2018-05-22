import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from 'app';

console.log(App);

window.onload = () => {
    ReactDOM.hydrate((
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    ), document.getElementById('main'))
};
