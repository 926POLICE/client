import React from 'react';
import { withRouter } from 'react-router-dom';

import Helmet from 'react-helmet';

import LibraryLoader from 'utils/LibraryLoader'
import createNotification from 'utils/createNotification.js';

import AjaxUtils from 'utils/AjaxUtils.js';
import serverUrls from 'data/serverUrls';

class FormInput extends React.Component {
    render() {
        return (
            <div className="form-group row">
                <label className="col-sm-3 col-lg-2 col-form-label">{this.props.title}</label>
                <div className="col-sm-9">
                    { this.props.children }
                </div>
            </div>
        )
    }
}

class BloodRequestAddPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                urgentyLevel: 0,
                redCells: 0,
                thrombocytes: 0,
                bloodPlasma: 0,
                patientID: -1
            },

            patients: [
                { name: "Ion", bloodType: "A+", Rh: true },
                { name: "Gheorghe", bloodType: "B+", Rh: false }
            ],

            render: 0,
            notificationBlock: null
        }

        this.urgencyLevels = [
            { level: 1, text: "Low" },
            { level: 2, text: "Medium" },
            { level: 3, text: "High" },
        ];
    }
    
    componentDidMount() {
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

    onSubmit() {
        const self = this;

        AjaxUtils.request("POST", serverUrls.doctors.bloodRequest, {
            PatientID: this.state.patients[this.state.form.patientID].id,
            DoctorID: this.props.userID,
            priority: this.props.form.urgencyLevel,
            Rquantity: this.state.redCells,
            Pquantity: this.state.bloodPlasma,
            Tquantity: this.state.thrombocytes
        })
            .then(data => {
                self.props.history.push({
                    pathname: '/board/doctors/bloodrequests',
					state: {
						display: 'BLOOD_REQUESTS'
					}
                })
            })
            .catch(req => {
                console.error(req);
                self.state.notificationBlock = createNotification("danger", "Something very very wrong happened", 2000);
                self.setState(self.state);
            })
    }

    mainRender() {
        return (
            <div>
                <div id="topBar">
                    <div id="title">Add a blood request</div>
                    <div id="buttonsCnt">
                        <button 
                            className="btn btn-success"
                            onClick={() => {
                                if (this.state.form.redCells == 0 && this.state.form.thrombocytes == 0 && this.state.form.bloodPlasma == 0) {
                                    this.state.notificationBlock = createNotification("danger", "You must fill the required quantity", 3000);
                                    this.setState(this.state);
                                    return;
                                }

                                if (this.state.form.patientID == -1) {
                                    this.state.notificationBlock = createNotification("danger", "You must select a patient", 3000);
                                    this.setState(this.state);
                                    return;
                                }

                                this.state.render = 1;
                                this.setState(this.state);
                            }}
                        >
                            Continue
                        </button>
                    </div>
                </div>
                <div className="stepTitle">Complete the request info:</div>
                <FormInput title="Urgency">
                    {
                        this.urgencyLevels.map(level => {
                            return (
                                <input 
                                    key={`urgencyLevels${level.level}`}
                                    type="button" 
                                    className={`btn btn-selectable ${this.state.form.urgentyLevel == level.level ? "btn-selected" : "btn-notselected"}`} 
                                    value={level.text}
                                    onClick={() => {
                                        this.state.form.urgentyLevel = level.level;
                                        this.setState(this.state);
                                    }}
                                />
                            )
                        })
                    }
                </FormInput>
                <FormInput title="Red blood cells quantity (ml):">
                    <input 
                        type="number" 
                        className="form-control"
                        value={this.state.form.redCells}
                        onChange={e => {
                            this.state.form.redCells = parseInt(e.target.value) || 0;
                            this.setState(this.state);
                        }}
                    />                    
                </FormInput>
                <FormInput title="Thrombocytes quantity (ml):">
                    <input 
                        type="number" 
                        className="form-control"
                        value={this.state.form.thrombocytes}
                        onChange={e => {
                            this.state.form.thrombocytes = parseInt(e.target.value) || 0;
                            this.setState(this.state);
                        }}
                    />                    
                </FormInput>
                <FormInput title="Blood plasma quantity (ml):">
                    <input 
                        type="number" 
                        className="form-control"
                        value={this.state.form.bloodPlasma}
                        onChange={e => {
                            this.state.form.bloodPlasma = parseInt(e.target.value) || 0;
                            this.setState(this.state);
                        }}
                    />                    
                </FormInput>
                <div className="stepTitle">Select the patient:</div>
                <table>
                    <thead>
                        <tr>
                            <th>Patient name</th>
                            <th>Blood type</th>
                            <th>Rh</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.patients.map((patient, index) => {
                                return (
                                    <tr 
                                        key={patient.name} 
                                        onClick={() => {
                                            this.state.form.patientID = index;
                                            this.setState(this.state);
                                        }}
                                        className={this.state.form.patientID == index ? "selected" : undefined}
                                    >
                                        <td>{patient.name}</td>
                                        <td>{patient.bloodType}</td>
                                        {/* <td>{patient.rh.toString()}</td> */}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }

    checkRender() {
        return (
            <div>
                <div id="title">Add a blood request</div>
                <div className="stepTitle">Is the data correct?</div>
                <div>Pacient: {this.state.patients[this.state.form.patientID].name}</div>
                <div>Red blood cells: {this.state.form.redCells}ml</div>
                <div>Thrombocytes: {this.state.form.thrombocytes}ml</div>
                <div>Blood plasma: {this.state.form.bloodPlasma}ml</div>
                <div id="buttonCnt">
                    <button 
                        className="btn btn-success"
                        onClick={this.onSubmit}
                    >
                        Yes
                    </button>
                    <button 
                        className="btn btn-danger"
                        onClick={() => {
                            this.state.render = 0;
                            this.setState(this.state);
                        }}
                    >
                        Go back
                    </button>
                </div>
            </div>
        )
    }
    
    render() {
        let renderBlock = this.state.render == 0 ? this.mainRender() : this.checkRender();

        return [
            <Helmet key="helmet">
                <link rel="stylesheet" href="css/bloodRequestAdd.min.css"/>
            </Helmet>,
            <div key="main" id="mainCnt">
                { this.state.notificationBlock }
                { renderBlock }
            </div>
        ]
    }
};

export default withRouter(BloodRequestAddPage);
