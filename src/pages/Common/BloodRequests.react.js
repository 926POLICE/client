import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import LibraryLoader from 'utils/LibraryLoader';
import AjaxUtils from 'utils/AjaxUtils.js';

import serverUrls from 'data/serverUrls';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faPencil from '@fortawesome/fontawesome-free-solid/faPencilAlt'
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck'
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'

class BloodRequestsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                // {
                //     "patientID": 1,
                //     "redBloodCellsQuantity": 20,
                //     "plasmaQuantity": 10,
                //     "thrombocytesQuantity": 30,
                //     "priority": 3,
                //     "completed": true
                // },
                // {
                //     "patientID": 2,
                //     "redBloodCellsQuantity": 30,
                //     "plasmaQuantity": 50,
                //     "thrombocytesQuantity": 10,
                //     "priority": 2,
                //     "completed": false
                // }
            ],

            editIndex: -1
        }

        this.urgencyLevels = {
            1: "Low",
            2: "Medium",
            3: "High",
        };
    }

    componentDidMount() {
        const self = this;

        AjaxUtils.request('GET', serverUrls.getBloodRequests, { DoctorID: this.props.admin ? undefined : this.props.userID })
            .then(data => {
                self.state.data = data;
                self.setState(self.state);
            })
            .catch(req => {
                console.error(req);
                this.props.createNotification("danger", "Something very very wrong happened", 2000);
                self.setState(self.state);
            })

        if (this.props.location.state && this.props.location.state.response) {
            if (this.props.location.state.response == 2) {
                this.props.createNotification("success", "Request sent successfully", 200);
            }
        }
    }

    render() {
        return [
            <Helmet key="helmet">
                <link rel="stylesheet" href="css/bloodRequest.min.css"/>
            </Helmet>,
            <div key="main" id="mainCnt">
                <div id="topBar">
                    <div id="title">Blood requests</div>
                    {
                        !this.props.admin
                        &&
                        <div id="buttonsCnt">
                            <Link 
                                className="btn btn-success"
                                to={{
                                    pathname: "/board/doctors/bloodrequests/add/" + this.props.match.params.userID,
                                    state: {
                                        display: "BLOOD_REQUESTS_ADD"
                                    }
                                }}
                            >
                                Add request
                            </Link>
                        </div>
                    }
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>PacientID</th>
                            <th>Red Blood Cells Quantity</th>
                            <th>Plasma Quantity</th>
                            <th>Thrombocytes Quantity</th>
                            <th>Priority</th>
                            { this.props.admin && <th></th> }
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.data.map((row, index) => {
                            return (
                                <tr key={`r${index}`}>
                                    <td>{row.patientID}</td>
                                    {
                                        (this.state.editIndex == index)
                                        ?
                                        [
                                            <td key="red1">
                                                <input 
                                                    type="number"
                                                    className="form-control"
                                                    value={this.state.row.redBloodCellsQuantity}
                                                    onChange={e => {
                                                        this.state.row.redBloodCellsQuantity = parseInt(e.target.value) || 0;
                                                        this.setState(this.state);
                                                    }}
                                                />
                                            </td>,
                                            <td key="plasma2">
                                                <input 
                                                    type="number"
                                                    className="form-control"
                                                    value={this.state.row.plasmaQuantity}
                                                    onChange={e => {
                                                        this.state.row.plasmaQuantity = parseInt(e.target.value) || 0;
                                                        this.setState(this.state);
                                                    }}
                                                />
                                            </td>,
                                            <td key="white3">
                                                <input 
                                                    type="number"
                                                    className="form-control"
                                                    value={this.state.row.thrombocytesQuantity}
                                                    onChange={e => {
                                                        this.state.row.thrombocytesQuantity = parseInt(e.target.value) || 0;
                                                        this.setState(this.state);
                                                    }}
                                                />
                                            </td>,
                                            <td key="prority4">
                                                <select 
                                                    className="form-control" 
                                                    value={this.state.row.priority}
                                                    onChange={e => {
                                                        this.state.row.priority = parseInt(e.target.value);
                                                        this.setState(this.state);
                                                    }}
                                                >
                                                    {
                                                        Object.keys(this.urgencyLevels).map(level => {
                                                            return (
                                                                <option key={`urgency${level}`} value={level}>{this.urgencyLevels[level]}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </td>
                                        ]
                                        :
                                        [
                                            <td key="red">{row.redBloodCellsQuantity}ml</td>,
                                            <td key="plasma">{row.plasmaQuantity}ml</td>,
                                            <td key="white">{row.thrombocytesQuantity}ml</td>,
                                            <td key="prority">{this.urgencyLevels[row.priority]}</td>
                                        ]
                                    }
                                    {
                                        this.props.admin
                                        &&
                                        <td>
                                            {
                                                (this.state.editIndex == index)
                                                ?
                                                [
                                                    <button key="successBtn" className="btn btn-success">
                                                        <FontAwesomeIcon icon={faCheck}/>
                                                    </button>,
                                                    <button 
                                                        key="dangerBtn" 
                                                        className="btn btn-danger" 
                                                        onClick={() => {
                                                            this.state.editIndex = -1;
                                                            console.log("SSSS");
                                                            this.setState(this.state);
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faTimes}/>
                                                    </button>
                                                ]
                                                :
                                                [
                                                    <button 
                                                        key="editBtn" 
                                                        className="btn btn-warning" 
                                                        onClick={() => {
                                                            this.state.editIndex = index;
                                                            this.state.row = Object.assign({}, row);
                                                            this.setState(this.state);
                                                        }}   
                                                    >
                                                        <FontAwesomeIcon icon={faPencil}/>
                                                    </button>
                                                ]
                                            }
                                        </td>
                                    }
                                </tr>
                            )
                        })}

                    </tbody>

                </table>
            </div>
        ]
    }
};


export default withRouter(BloodRequestsPage);
