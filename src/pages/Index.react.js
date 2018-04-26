import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import LibraryLoader from 'utils/LibraryLoader'

class IndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.libraryLoader = new LibraryLoader();
    }
    
    componentDidMount() {
        this.libraryLoader.loadCSS('css/index.min.css');
    }
    
    render() {
        return (
            <div id="rootCnt">
                <div id="slide1" className="row">
                    <div className="col-12 col-lg-8"></div>
                    <div id="loginCnt" className="col-12 col-lg-4">
                        <div>
                            <div id="title">I want to donate blood!</div>
                            <Link className="btn btn-block btn-danger" to='/register'>Register</Link>
                            <input type="button" value="Login" className="btn btn-block btn-primary"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default withRouter(IndexPage);
