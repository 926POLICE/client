import React from 'react';
import { withRouter } from 'react-router-dom';

import LibraryLoader from 'utils/LibraryLoader';
import AjaxUtils from 'utils/AjaxUtils.js';

class TemplatePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }
    
    componentDidMount() {
        const self = this;

        // Initial Ajax requests
    }
    
    render() {
        return (
            <div id="mainCnt">
                <div id="title">TITLE</div>
                { /* page come here */ }
            </div>
        )
    }
};

export default withRouter(TemplatePage);
