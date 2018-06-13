import React from 'react';
import { Link } from 'react-router-dom';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faPowerOff from '@fortawesome/fontawesome-free-solid/faPowerOff'

export default class TopBar extends React.Component {
    render() {
        return (
            <div id="topBarCnt">
                <div>
                    { this.props.name && `Welcome back, ${ this.props.name }` }
                </div>
                <div>
                    <a href="/"><FontAwesomeIcon icon={faPowerOff} size="1x"/></a>
                </div>
            </div>
        )
    }
};