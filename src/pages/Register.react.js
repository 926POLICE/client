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

        this.fieldsNames = [
            'name', 'pass', 'passAgain', 'address', 'birthDate', 'cityName', 'countryName'
        ]
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
        for (var i=0, length = this.fieldsNames.length; i < length; ++i) {
            if (!this.checkField(this.fieldsNames[i])) {
                this.setState(this.state);
                return;
            }
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

    renderInput(data) {
        return (
            <input 
                type={data.type || "text"} 
                className={`form-control ${this.state[data.stateVar + 'Class'] || ''}`} 
                value={this.state[data.stateVar] || ''} 
                onChange={e => { this.state[data.stateVar] = e.target.value; this.setState(this.state) }}
                placeholder={data.placeholder}
            />
        )
    }

    renderField(data) {
        return (
            <div>
                <div className="row">
                    <div className="col-3">{data.title}:</div>    
                    <div className="col-9">
                        { this.renderInput(data.inputData) }
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
                <div className="row">
                    <div className="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                        <div id="registerCnt">
                            <div className="title">Register</div>
                            { this.renderField({ title: 'Name', inputData: { stateVar: 'name' } }) }
                            { this.renderField({ title: 'Password', inputData: { stateVar: 'pass' } }) }
                            { this.renderField({ title: 'Password again', inputData: { stateVar: 'passAgain' } }) }
                            { this.renderField({ title: 'Birth date', inputData: { stateVar: 'birthDate', type: "date" } }) }
                            { this.renderField({ title: 'Address', info: '(address from your ID card)', inputData: { stateVar: 'address' } }) }
                            { this.renderField({ title: 'City/Town', inputData: { stateVar: 'cityName' } }) }
                            { this.renderField({ title: 'Country', inputData: { stateVar: 'countryName' } }) }
                            <div className="miniTitle">If you leave in another address than that in your ID card:</div>
                            { this.renderField({ title: 'Residence', inputData: { stateVar: 'residenceAddress' } }) }
                            { this.renderField({ title: 'City/Town', inputData: { stateVar: 'residenceCityName' } }) }
                            { this.renderField({ title: 'Country', inputData: { stateVar: 'residenceCountryName' } }) }
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
                </div>
            </div>
        ]
    }
};

export default withRouter(RegisterPage);
