import React from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faPowerOff from '@fortawesome/fontawesome-free-solid/faPowerOff'

export default class TopBar extends React.Component {
    render() {
        return (
            <div id="topBarCnt">
                <div>
                    Welcome back, 
                </div>
                <div>
                    <FontAwesomeIcon icon={faPowerOff} size="1x"/>
                </div>
            </div>
        )
    }
};