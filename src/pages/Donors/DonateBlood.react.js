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
            patientID: null,

            donationStatus: null
        }

        this.onGetPatients = this.onGetPatients.bind(this);
        this.onDonate = this.onDonate.bind(this);
    }

    componentDidMount() {
        const self = this;

        AjaxUtils.request("GET", serverUrls.donors.getNextDonation(this.props.match.params.userID))
            .then(data => {
                if (data > Date.now() / 1000) {
                    self.state.slide = 4;
                    self.state.nextDonationDate = new Date(data * 1000);
                    self.setState(self.state);
                }
            })
            .catch(req => {
                console.error(req);
                self.props.createNotification("danger", "Something very very wrong happened", 2000);
            })
    }

    onDonate() {
        // TODO: What get if the donor can't donate?
        const self = this;
        AjaxUtils.request('POST', serverUrls.donors.donate(), {
            donorid: this.props.match.params.userID,
            patientid: this.state.patientID
        })
            .then(data => {
                console.log(data);

                self.state.donationStatus = true // <= TODO

                self.props.createNotification("success", "We have registered you for a blood donation!", 2000);
            })
            .catch(req => {
                console.error(req);
                self.props.createNotification("danger", "Something very very wrong happened", 2000);
            })

        this.state.slide = 3;
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
                <link rel="stylesheet" href="css/donateBlood.min.css"/>
            </Helmet>,
            <div key="main" id="mainCnt">
                <div id="title">Donate blood</div>
                {
                    this.state.slide == 0
                    &&
                    <div className="slide slide-inline">
                        <div>Do you want to donate blood?</div>
                        <button 
                            className="btn mainBtn"
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
                    <div className="slide slide-inline">
                        <div>Do you want to donate blood for a specific person?</div>
                        <button className="btn mainBtn" onClick={this.onGetPatients}>Yes</button>
                        <button className="btn mainBtn" onClick={this.onDonate}>No</button>
                    </div>
                }
                {
                    this.state.slide == 2
                    &&
                    <div className="slide">
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
                {
                    this.state.slide == 3
                    &&
                    <div className={`donateStatusSlide ${this.state.donationStatus == null ? "" : (this.state.donationStatus ? "goodCnt" : "badCnt")}`}>
                        {
                            this.state.donationStatus == null
                            ?
                            "We are now processing your request... Please wait..."
                            :
                            (
                                this.state.donationStatus
                                ?
                                "You've been registered for a donation. Come to the clinic to honor it!"
                                :
                                "You can't donate right now"
                            )
                        }
                    </div>  
                }
                {
                    this.state.slide == 4
                    &&
                    <div>We are sorry, but you can't donate right now. Please come back on {this.state.nextDonationDate.getDate()}/{this.state.nextDonationDate.getMonth()+1}/{this.state.nextDonationDate.getFullYear()}</div>
                }
            </div>
        ];
    }
};



export default withRouter(PacientSettingsPage);
