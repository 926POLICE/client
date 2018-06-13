import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Helmet from 'react-helmet';

import AjaxUtils from 'utils/AjaxUtils.js';

import serverUrls from 'data/serverUrls';

function getLocation() {
    return new Promise(resolve => {
        console.log("EEE");
        navigator.geolocation.getCurrentPosition(position => {
            resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        }, () => resolve({ latitude: 100, longitude: 100 }))
    })
}

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
        
        this.checkField = this.checkField.bind(this);
        this.onRegister = this.onRegister.bind(this);

        this.fieldsNames = [
            'name', 'pass', 'passAgain', 'address', 'birthDate', 'address'
        ]
    }
    
    componentDidMount() {
    }

    checkField(stateVar) {
        if (this.state[stateVar]) {
            return true;
        } else {
            this.state[stateVar + 'Class'] = "is-bad";
            return false;
        }
    }

    onRegister() {
        console.log("onRegister");
        for (var i=0, length = this.fieldsNames.length; i < length; ++i) {
            if (!this.checkField(this.fieldsNames[i])) {
                console.log("BAD");
                this.setState(this.state);
                return;
            }
        }

        const self = this;
        getLocation().then(position => {
            console.log(position);
            AjaxUtils.request('POST', serverUrls.donors.register, {
                username: self.state.name,
                password: self.state.pass,
                name: self.state.name,
                birthday: new Date(self.state.birthDate).getTime(),
                residence: self.state.residenceAddress || self.state.address,
                address: self.state.address,
                latitude: position.latitude,
                longitude: position.longitude
            })
                .then(() => {
                    self.props.history.push({
                        pathname: "/",
                        state: {
                            success: true
                        }
                    })
                })
                .catch(error => {
                    console.error(error);
                })
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
            </Helmet>,
            <div key="main" id="rootCnt_register">
                <div className="row">
                    <div className="col-12 col-lg-4">
                        <div className="title">Register</div>
                        <div id="registerCnt">
                            { this.renderField({ title: 'Name', inputData: { stateVar: 'name' } }) }
                            { this.renderField({ title: 'Password', inputData: { stateVar: 'pass', type: "password" } }) }
                            { this.renderField({ title: 'Password again', inputData: { stateVar: 'passAgain', type: "password" } }) }
                            { this.renderField({ title: 'Birth date', inputData: { stateVar: 'birthDate', type: "date" } }) }
                            { this.renderField({ title: 'Address', info: '(address from your ID card)', inputData: { stateVar: 'address' } }) }
                            <div className="miniTitle">If you live on another address than that in your ID card:</div>
                            { this.renderField({ title: 'Residence', inputData: { stateVar: 'residenceAddress' } }) }
                            <button id="registerBtn" className="btn btn-block" onClick={this.onRegister}>Register</button>
                        </div>
                        <Link id="backBtn" to='/' className="btn btn-block">I want to go back</Link>
                    </div>
                </div>
            </div>
        ]
    }
};

export default withRouter(RegisterPage);
