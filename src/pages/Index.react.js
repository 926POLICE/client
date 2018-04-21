import React from 'react';
import { withRouter } from 'react-router-dom';

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
                            <form>
                                <div id="title">Ajuta acuma si tu!<br/>Inregistreaza-te/Login</div>
                                <input type="text" className="form-control" placeholder="CNP"/>
                                <input type="text" className="form-control" placeholder="Parola"/>
                                <input type="submit" value="Login" className="btn btn-block btn-primary"/>
                            </form> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default withRouter(IndexPage);
