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
            slide: 0,

            patients: [],
            patientID: null
        }

        this.onGetPatients = this.onGetPatients.bind(this);
        this.onDonate = this.onDonate.bind(this);
    }

    componentDidMount() {
        const self = this;
    }

    onDonate() {
        // TODO: What get if the donor can't donate?
        AjaxUtils.request('POST', serverUrls.donors.donate, {
            DonorID: this.props.userID,
            PatientID: this.state.patientID
        })
            .then(() => {
                self.props.createNotification("danger", "We have registered you!", 2000);
            })
            .catch(error => {
                console.error(req);
                self.props.createNotification("danger", "Something very very wrong happened", 2000);
            })

        this.state.slide = 0;
        this.setState(this.state);
    }

    onGetPatients() {
        this.state.slide = 2;
        this.setState(this.state);

        const self = this;
        AjaxUtils.request("GET", serverUrls.getPatients)
            .then(data => {
                self.state.patients = data;
                self.setState(self.state);
            })
            .catch(req => {
                console.error(req);
                self.state.notificationBlock = createNotification("danger", "Something very very wrong happened", 2000);
                self.setState(self.state);
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
                <link rel="stylesheet" href="css/settings.min.css"/>
            </Helmet>,
            <div key="main" id="mainCnt">
                <div id="title">Donate blood</div>
                {
                    this.state.slide == 0
                    &&
                    <div id="slide slide-inline">
                        <div>Do you want to donate blood?</div>
                        <button 
                            className="btn btn-primary"
                            onClick={() => {
                                this.state.slide = 1;
                                this.setState(this.state);
                            }}
                        >
                            I want to donate blood
                        </button>
                    </div>
                }
                {
                    this.state.slide == 1
                    &&
                    <div id="slide slide-inline">
                        <div>Do you want to donate blood for a specific person?</div>
                        <button className="btn btn-success" onClick={this.onGetPatients}>Yes</button>
                        <button className="btn btn-danger" onClick={this.onDonate}>No</button>
                    </div>
                }
                {
                    this.state.slide == 2
                    &&
                    <div id="slide slide-inline">
                        <div>Select the patient to which you want to donate blood</div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Patient name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.patients.map((patient, index) => {
                                        return (
                                            <tr 
                                                key={patient.name} 
                                                onClick={() => {
                                                    this.state.patientID = patient.id;
                                                    this.onDonate();
                                                }}
                                            >
                                                <td>{patient.name}</td>
                                            </tr>
                                        )
                                    })
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
