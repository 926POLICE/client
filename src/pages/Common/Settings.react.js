import React from 'react';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';

import LibraryLoader from 'utils/LibraryLoader';
import AjaxUtils from 'utils/AjaxUtils.js';

import serverUrls from 'data/serverUrls';

class PacientSettingsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            medicalHistory: [],

            eligible: false
        }

        if (this.props.admin) {
            this.bloodTypes = ["A", "B", "AB", "0"];
        }

        this.eligibleValues = [
            { text: "Eligible", value: true },
            { text: "Not eligible", value: false }
        ]

        this.onSave = this.onSave.bind(this);
        this.checkField = this.checkField.bind(this);
    }

    componentDidMount() {
        const self = this;
        AjaxUtils.request("GET", serverUrls.donors.getPersonalDetails + '/' + (this.props.admin ? this.props.match.params.donorID : this.props.match.params.userID))
            .then(data => {
                self.state.name = data.name;
                self.state.birthDate = new Date(parseInt(data.birthday)).toISOString().substring(0, 10);
                self.state.residenceAddress = data.residence;
                self.state.address = data.address;
                self.state.id = data.id;
                self.state.data = Object.assign({}, data);

                self.state.medicalHistory = data.medicalHistory
                    .split(/\n/)
                    .filter(e => e.length ? true : false)
                    .map(e => { let a = e.split(":"); return { date: a[0], message: a[1].replace(/\"/g, "") } });

                self.state.bloodType = data.bloodtype;
                self.state.rh = data.rh ? 1 : 0;
                self.state.anticorps = data.anticorps
                self.setState(self.state);
            })
            .catch(req => {
                console.error(req);
                self.props.createNotification("danger", "Something very very wrong happened", 2000);
            })

        if (this.props.admin) {
            AjaxUtils.request("GET", serverUrls.personnel.getEligible(this.props.match.params.donorID))
                .then(data => {
                    self.state.eligible = data;
                    self.setState(self.state);
                })
                .catch(req => {
                    console.error(req);
                    self.props.createNotification("danger", "Something very very wrong happened", 2000);
                })
        }
    }

    checkField(stateVar) {
        if (!this.state[stateVar]) {
            this.state[stateVar + 'Class'] = "is-bad";
            return false;
        }
        return true;
    }

    onSave() {
        const fieldNames = ["name", "birthDate", "address"];

        for (var i=0, length = fieldNames.length; i < length; ++i) {
            if (!this.checkField(fieldNames[i])) {
                this.props.createNotification("danger", "Some fields were empty and should'nt be that way, trust me", 3000);
                this.setState(this.state);
                return;
            }
        }

        if (this.state.pass && this.state.pass != this.state.passAgain) {
            this.state.passClass = "is-bad";
            this.state.passAgainClass = "is-bad";

            this.props.createNotification("danger", "Passwords doesn't match", 3000);
            this.setState(this.state);
            return;
        } 

        const self = this;
        AjaxUtils.request('PUT', serverUrls.donors.update(this.props.admin ? this.props.match.params.donorID : this.props.match.params.userID), {
            username: this.state.name,
            password: this.state.pass,
            name: this.state.name,
            birthday: new Date(this.state.birthDate).getTime(),
            residence: this.state.residenceAddress || this.state.address,
            address: this.state.address,
            latitude: this.state.data.latitude,
            longitude: this.state.data.longitude,

        })
            .then(() => {
                self.props.createNotification("success", "Updated successfully", 2000);
            })
            .catch(req => {
                console.error(req);
                self.props.createNotification("danger", "Something very very wrong happened", 2000);
            })

        if (this.props.admin) {
            AjaxUtils.request("PUT", serverUrls.personnel.updateDonor(this.props.match.params.donorID), {
                bloodtype: this.state.bloodType,
                rh: this.state.rh == 0 ? false : true,
                anticorps: this.state.anticorps
            })
                .then(() => {
                    console.log("DONE", {
                        bloodtype: this.state.bloodType,
                        rh: this.state.rh == 0 ? false : true,
                        anticorps: this.state.anticorps
                    });
                })
                .catch(req => {
                    console.error(req);
                    self.props.createNotification("danger", "Something very very wrong happened", 2000);
                })

            AjaxUtils.request("PUT", serverUrls.personnel.setEligible(this.props.match.params.donorID), this.state.eligible)
                .then(() => {
                    console.log("FOOD");
                })
                .catch(req => {
                    console.error(req);
                    self.props.createNotification("danger", "Something very very wrong happened", 2000);
                })
        }
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
                <link rel="stylesheet" href="css/settings.min.css"/>
            </Helmet>,
            <div key="main" id="mainCnt">
                <div id="title">Settings</div>
                <div id="registerCnt">
                    { this.renderField({ title: 'Name', inputData: { stateVar: 'name' } }) }
                    { this.renderField({ title: 'Password', inputData: { stateVar: 'pass', type: "password" } }) }
                    { this.renderField({ title: 'Password again', inputData: { stateVar: 'passAgain', type: "password" } }) }
                    { this.renderField({ title: 'Birth date', inputData: { stateVar: 'birthDate', type: "date" } }) }
                    { this.renderField({ title: 'Address', info: '(address from your ID card)', inputData: { stateVar: 'address' } }) }
                    <div className="miniTitle">If you leave in another address than that in your ID card:</div>
                    { this.renderField({ title: 'Residence', inputData: { stateVar: 'residenceAddress' } }) }
                    {
                        this.props.admin
                        &&
                        [
                            <br key="br"/>,
                            <div key="meidcalTitle" className="miniTitle">Medical settings:</div>,
                            <div key="medicalBody">
                                <div>
                                    <div className="row">
                                        <div className="col-3">Blood type:</div>    
                                        <div className="col-9">
                                            <select
                                                className="form-control"
                                                value={this.state.bloodType}
                                                onChange={e => {
                                                    this.state.bloodType = e.target.value;
                                                    this.setState(this.state);
                                                }}
                                            >
                                                {
                                                    this.bloodTypes.map(type => {
                                                        return <option key={type} value={type}>{type}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="row">
                                        <div className="col-3">Rh:</div>    
                                        <div className="col-9">
                                            <select
                                                className="form-control"
                                                value={this.state.rh}
                                                onChange={e => {
                                                    this.state.rh = e.target.value;
                                                    this.setState(this.state);
                                                }}
                                            >
                                                <option value={0}>Negative</option>
                                                <option value={1}>Positive</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                { this.renderField({ title: 'Anticorps', inputData: { stateVar: 'anticorps' } }) }
                                <div>
                                    <div className="row">
                                        <div className="col-3">Is eligible:</div>    
                                        <div className="col-9">
                                            {
                                                this.eligibleValues.map(d => {
                                                    return (
                                                        <input 
                                                            key={`eligibleValues${d.value}`}
                                                            type="button" 
                                                            className={`btn btn-selectable ${this.state.eligible == d.value ? "mainBtn" : "btn-notselected"}`} 
                                                            value={d.text}
                                                            onClick={() => {
                                                                this.state.eligible = d.value;
                                                                this.setState(this.state);
                                                            }}
                                                        />
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ]
                    }
                    <button className="btn mainBtn" onClick={this.onSave}>Save</button>
                </div>
                {
                    this.props.admin
                    &&
                    <div id="mhistoryCnt">
                        <div className="title">Medical history</div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Log</th>
                                    <th>Message</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (this.state.medicalHistory.length > 0)
                                    ?
                                    this.state.medicalHistory.map((log, index) => {
                                        return (
                                            <tr key={`log${index}`}>
                                                <td>{log.date}</td>
                                                <td>{log.message}</td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr>
                                        <td colSpan={2}>No history</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        ];
    }
};

export default withRouter(PacientSettingsPage);
