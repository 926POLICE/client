import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from 'app';

console.log(App);

window.onload = () => {
    ReactDOM.render((
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    ), document.getElementById('main'))
};
