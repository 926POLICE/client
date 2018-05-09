import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Helmet from 'react-helmet';

import AjaxUtils from 'utils/AjaxUtils.js';

import serverUrls from 'data/serverUrls';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
        
        this.checkField = this.checkField.bind(this);
        this.onRegister = this.onRegister.bind(this);
    }
    
    componentDidMount() {
    }

    checkField(stateVar) {
        if (this.state[stateVar]) {
            this.state[stateVar + 'Class'] = "is-good";
            return true;
        } else {
            this.state[stateVar + 'Class'] = "is-bad";
            return false;
        }
    }

    onRegister() {
        if (
            !this.checkField('firstName') ||
            !this.checkField('lastName')  ||
            !this.checkField('address') 
        ) {
            this.setState(this.state);
            return;
        }

        AjaxUtils.request('POST', serverUrls.donors.register, {
            username: this.state.firstName + " " + this.state.lastName,
            password: this.state.pass,
            name: this.state.firstName + " " + this.state.lastName,
            birthday: '01/12/1998',
            residence: this.state.residenceAddress || this.state.address,
            latitude: 100,
            longitude: 100
        })
            .then(() => {
                alert("WORKS");
            })
            .catch(error => {
                console.error(error);
                alert(error);
            })
    }

    renderInput(stateVar) {
        return (
            <input 
                type="text" 
                className={`form-control ${this.state[stateVar + 'Class'] || ''}`} 
                value={this.state[stateVar] || ''} 
                onChange={e => { this.state[stateVar] = e.target.value; this.setState(this.state) }}
            />
        )
    }

    renderField(data) {
        return (
            <div>
                <div className="row">
                    <div className="col-3">{data.name}:</div>    
                    <div className="col-9">
                        { this.renderInput(data.stateVar) }
                    </div>
                </div>
                {
                    data.info
                    &&
                    <div className="info">{data.info}</div>
                }
            </div>
        )
    }
    
    render() {
        return [
            <Helmet key="helmet">
                <link rel="stylesheet" href="css/register.min.css"/>
            </Helmet>,
            <div key="main" id="rootCnt">
                <div>
                    <div className="title">Register</div>
                    { this.renderField({ name: 'First name', stateVar: 'firstName' }) }
                    { this.renderField({ name: 'Last name', stateVar: 'lastName' }) }
                    { this.renderField({ name: 'Password', stateVar: 'pass' }) }
                    { this.renderField({ name: 'Password again', stateVar: 'passAgain' }) }
                    <div>
                        <div className="row">
                            <div className="col-3">Birth date:</div>    
                            <div className="col-9">
                                <div className="row">
                                    <div className="col-4">
                                        <input type="text" className="form-control" placeholder="dd"/>
                                    </div>
                                    <div className="col-4">
                                        <input type="text" className="form-control" placeholder="mm"/>
                                    </div>
                                    <div className="col-4">
                                        <input type="text" className="form-control" placeholder="yyyy"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    { this.renderField({ name: 'Address', info: '(address from your ID card)', stateVar: 'address' }) }
                    { this.renderField({ name: 'City/Town', stateVar: 'cityName' }) }
                    { this.renderField({ name: 'Country', stateVar: 'countryName' }) }
                    <div className="miniTitle">If you leave in another address than that in your ID card:</div>
                    { this.renderField({ name: 'Residence', stateVar: 'residenceAddress' }) }
                    { this.renderField({ name: 'City/Town', stateVar: 'residenceCityName' }) }
                    { this.renderField({ name: 'Country', stateVar: 'residenceCountryName' }) }
                    <div className="row" id="registerBtns">
                        <div className="col-12 col-md-6">
                            <Link to='/' className="btn btn-block btn-warning">Back</Link>
                        </div>
                        <div className="col-12 col-md-6">
                            <button className="btn btn-block btn-danger" onClick={this.onRegister}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        ]
    }
};

export default withRouter(RegisterPage);
