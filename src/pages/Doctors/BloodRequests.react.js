import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import LibraryLoader from 'utils/LibraryLoader';
import AjaxUtils from 'utils/AjaxUtils.js';

import serverUrls from 'data/serverUrls';
import createNotification from 'utils/createNotification.js';

class DoctorRequestsStatusPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                {
                    "patientID": 1,
                    "redBloodCellsQuantity": 20,
                    "plasmaQuantity": 10,
                    "thrombocytesQuantity": 30,
                    "priority": true,
                    "completed": true
                }
            ],

            notificationBlock: null
        }
    }

    componentDidMount() {
        const self = this;

        //checkRequestStatus(Integer pacientID sau String pacientName) : String 

        AjaxUtils.request('GET', serverUrls.doctors.getBloodRequests, { DoctorID: this.props.userID })
            .then(data => {
                self.state.data = data;
                self.setState(self.state);
            })
            .catch(req => {
                console.error(req);
                self.state.notificationBlock = createNotification("danger", "Something very very wrong happened", 2000);
                self.setState(self.state);
            })
    }

    render() {
        return [
            <Helmet key="helmet">
                <link rel="stylesheet" href="css/bloodRequest.min.css"/>
            </Helmet>,
            <div key="main" id="mainCnt">
                { this.state.notificationBlock }
                <div id="topBar">
                    <div id="title">Blood requests</div>
                    <div id="buttonsCnt">
                        <Link 
                            className="btn btn-success"
                            to={{
                                pathname: "/board/doctors/bloodrequests/add",
                                state: {
                                    display: "BLOOD_REQUESTS_ADD"
                                }
                            }}
                        >
                            Add request
                        </Link>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>PacientID</th>
                            <th>Red Blood Cells Quantity</th>
                            <th>Plasma Quantity</th>
                            <th>Thrombocytes Quantity</th>
                            <th>Priority</th>
                            <th>Completed</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.data.map((row, index) => {
                            return (
                                <tr key={`r${index}`}>
                                    <td>{row.patientID}</td>
                                    <td>{row.redBloodCellsQuantity}ml</td>
                                    <td>{row.plasmaQuantity}ml</td>
                                    <td>{row.thrombocytesQuantity}ml</td>
                                    <td>{row.priority.toString()}</td>
                                    <td>{row.completed.toString()}</td>
                                </tr>
                            )
                        })}

                    </tbody>

                </table>
            </div>
        ]
    }
};


export default withRouter(DoctorRequestsStatusPage);
