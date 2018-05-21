import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Helmet from 'react-helmet';

import LibraryLoader from 'utils/LibraryLoader'

class IndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.libraryLoader = new LibraryLoader();
    }
    
    componentDidMount() {
    }
    
    render() {
        return [
            <Helmet key="helmet">
                <link rel="stylesheet" href="css/index.min.css"/>
            </Helmet>,
            <div key="main" id="rootCnt">
                <div id="slide1" className="row">
                    <div className="col-12 col-lg-8"></div>
                    <div id="loginCnt" className="col-12 col-lg-4">
                        <div>
                            <div id="title">I want to donate blood!</div>
                            <Link className="btn btn-block btn-danger" to='/register'>Register</Link>
                            <br/>
                            <div id="title">Login</div>
                            <input type="text" className="form-control" placeholder="Name"/>
                            <input type="text" className="form-control" placeholder="Password"/>
                            <input type="button" value="Login" className="btn btn-block btn-primary"/>
                        </div>
                    </div>
                </div>
                <div id="content">
                    wefwef
                </div>
                <div id="footer">
                    wefwef
                </div>
            </div>
        ]
    }
};

export default withRouter(IndexPage);
