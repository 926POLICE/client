import React from 'react';
import { withRouter } from 'react-router-dom';

import LibraryLoader from 'utils/LibraryLoader'

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.libraryLoader = new LibraryLoader();
    }
    
    componentDidMount() {
        this.libraryLoader.loadCSS('css/register.min.css');
    }
    
    render() {
        return (
            <div id="rootCnt">
                <div>
                    <input type="text" className="form-control"/>
                    <input type="text" className="form-control"/>
                </div>
            </div>
        )
    }
};

export default withRouter(RegisterPage);
