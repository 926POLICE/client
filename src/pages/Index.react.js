import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Helmet from 'react-helmet';

import AjaxUtils from 'utils/AjaxUtils.js';
import serverUrls from 'data/serverUrls';

import createNotification from 'utils/createNotification';

import LibraryLoader from 'utils/LibraryLoader'

class IndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",

            notificationBlock: null
        }

        this.libraryLoader = new LibraryLoader();

        this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentDidMount() {
        if (this.props.location && this.props.location.state) {
            this.state.notificationBlock = createNotification("success", "Success! Now you can login", 2000);
            this.setState(this.state);
        }
    }

    onSubmit(e) {
        e.preventDefault();

        if (!this.state.username || !this.state.password) {
            this.state.notificationBlock = createNotification("danger", "Please give me an username and a password first", 2000);
            this.setState(this.state);
            return;
        }

        const self = this;
        AjaxUtils.request("POST", serverUrls.login.url, {
            username: this.state.username,
            password: this.state.password
        })
            .then(data => {
                const typeField = serverUrls.login.fields.type;
                if (data.id == -1) {
                    self.state.notificationBlock = createNotification("danger", "Wrong username or password", 2000);
                    self.setState(self.state);
                } else {
                    let url = '/board/';
                    console.log(data[typeField]);
                    if (data[typeField] == "doctor") url += "doctors/";
                    else if (data[typeField] == "donor") url += "donors/";
                    else if (data[typeField] == "personnel") url += "personnel/";

                    url += data[serverUrls.login.fields.id];

                    console.log("GOOD", url);

                    self.props.history.push({
                        pathname: url,
                        state: {
                            userID: data[serverUrls.login.fields.id],
                            userName: self.state.username,
                            refresh: true
                        }
                    })
                }
            })
            .catch(req => {
                console.error(req);
                this.state.notificationBlock = createNotification("danger", "Something went very very wrong", 2000);
                self.setState(self.state);
            })
    }
    
    render() {
        return [
            <Helmet key="helmet">
            </Helmet>,
            <div key="main" id="rootCnt">
                { this.state.notificationBlock }
                <div id="slide1" className="row">
                    <div className="col-12 col-lg-4">
                        <div id="title">
                            <div>
                                <div>Save a <b>life</b>,</div>
                                <div>Donate <b>blood</b></div>
                            </div>
                        </div> 
                        <Link id="registerBtn" className="btn btn-block" to='/register'>I want to donate</Link>
                        <form onSubmit={this.onSubmit}>
                            <div id="loginCnt">
                                <div id="title">Login</div>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Name"
                                    value={this.state.username}
                                    onChange={e => {
                                        this.state.username = e.target.value;
                                        this.setState(this.state);
                                    }}
                                />
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={e => {
                                        this.state.password = e.target.value;
                                        this.setState(this.state);
                                    }}
                                    
                                />
                                <input 
                                    type="submit" 
                                    value="Login"
                                    className="btn btn-block btn-primary"
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div id="footer">
                    <div>
                        <div>Created by</div>
                        <div>Ratiu Cosmina, Iulia Robas, Lung Andreea, Popa Catalin, Prisacariu Alexandru, Muscala Andrei</div>
                    </div>
                    <div>
                        All rights reserved.
                    </div>
                </div>
            </div>
        ]
    }
};

export default withRouter(IndexPage);
