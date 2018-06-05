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
            data: [],

            editIndex: -1
        }

        this.urgencyLevels = {
            1: "Low",
            2: "Medium",
            3: "High",
        };

        this.completeRequest = this.completeRequest.bind(this);
    }

    componentDidMount() {
        const self = this;

        AjaxUtils.request('GET', this.props.admin ? serverUrls.getBloodRequests : serverUrls.doctors.getBloodRequests(this.props.match.params.userID))
            .then(data => {
                self.state.data = data;
                self.setState(self.state);
            })
            .catch(req => {
                console.error(req);
                self.props.createNotification("danger", "Something very very wrong happened", 2000);
                self.setState(self.state);
            })

        if (this.props.location.state && this.props.location.state.response) {
            if (this.props.location.state.response == 2) {
                this.props.createNotification("success", "Request sent successfully", 200);
            }
        }
    }

    completeRequest(id, index) {
        const self = this;

        AjaxUtils.request("PUT", serverUrls.personnel.completeRequest(id))
            .then(data => {
                if (data == 0) {
                    self.state.data.splice(index, 1);
                    self.setState(self.state);

                    self.props.createNotification("success", "Request completed successfully", 2000);
                } else {
                    self.props.createNotification("danger", "We don't have enough stocks for this request", 2000);
                }
            })
            .catch(req => {
                console.error(req);
                self.props.createNotification("danger", "Something very very wrong happened", 2000);
            })
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
                        {
                            (this.state.data.length > 0)
                            ?
                            this.state.data.map((row, index) => {
                                return (
                                    <tr key={`r${index}`}>
                                        <td>{row.patientid}</td>
                                        <td key="red">{row.rquantity}ml</td>
                                        <td key="plasma">{row.pquantity}ml</td>
                                        <td key="white">{row.tquantity}ml</td>
                                        <td key="prority">{this.urgencyLevels[row.priority]}</td>
                                        {
                                            this.props.admin
                                            &&
                                            <td>
                                                <button key="successBtn" className="btn btn-success" onClick={() => this.completeRequest(row.id)}>
                                                    <FontAwesomeIcon icon={faCheck}/>
                                                </button>
                                                <button key="notifiyDonors" className="btn btn-primary">
                                                    Notify donors
                                                </button>
                                            </td>
                                        }
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <td colSpan={ this.props.admin ? 6 : 5 } style={{textAlign: "center"}}>No requests</td>
                            </tr>
                        }

                    </tbody>

                </table>
            </div>
        ]
    }
};


export default withRouter(BloodRequestsPage);
