import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import LibraryLoader from 'utils/LibraryLoader';
import AjaxUtils from 'utils/AjaxUtils.js';

import serverUrls from 'data/serverUrls';
import createNotification from 'utils/createNotification.js';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner'

class DoctorAvailableStocksPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            donors: null,

            isLoading: true
        }

        this.deleteRequest = this.deleteRequest.bind(this);
    }

    componentDidMount() {
        const self = this;

        AjaxUtils.request('GET', serverUrls.personnel.getPendingDonations())
            .then(data => {
                self.state.data = data;
                self.state.isLoading = false;
                self.setState(self.state);
              
            })
            .catch(req => {
                console.error(req);
                self.props.createNotification("danger", "Something very very wrong happened", 2000);
            })

        AjaxUtils.request("GET", serverUrls.personnel.getDonors())
            .then(data => {
                self.state.donors = {};
                for (var i=0, length=data.length; i < length; ++i) {
                    self.state.donors[data[i].id] = data[i];
                }
                self.setState(self.state);
            })
            .catch(req => {
                console.error(req);
                self.props.createNotification("danger", "Something very very wrong happened", 2000);
            })
    }

    deleteRequest(index) {
        const self = this;
        AjaxUtils.request("DELETE", serverUrls.personnel.deleteRequest(this.state.data[index].id))
            .then(() => {
                self.state.data.splice(index, 1);
                self.setState(self.state);

                self.props.createNotification("success", "Deleted successfully", 2000);
            })
            .catch(req => {
                console.error(req);
                self.props.createNotification("danger", "Something very very wrong happened", 2000);
            })
    }

    render() {
        return [
            <Helmet key="helmet">
                <link rel="stylesheet" href="css/stocks.min.css"/>
            </Helmet>,
            <div key="main" id="mainCnt">
                <div id="title">Pending donations</div>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>DonorID</th>
                            <th>Donor</th>
                            <th>For a specific patient?</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.isLoading
                            ?
                            <tr>
                                <td colSpan={5} style={{textAlign: "center"}}>
                                    <FontAwesomeIcon icon={faSpinner} size='3x' spin/>
                                </td>
                            </tr>
                            :
                            (this.state.data.length > 0 && this.state.donors)
                            ?
                            this.state.data.map((row, index) => {
                                const date = new Date(row.date);

                                return (
                                    <tr key={`r${index}`}>
                                        <td>{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</td>
                                        <td>{row.donorid}</td>
                                        <td>{this.state.donors[row.donorid] && this.state.donors[row.donorid].name}</td>
                                        <td>{ row.patientid == -1 ? "No" : "Yes" }</td>
                                        {
                                            !this.state.donors[row.donorid].eligibility
                                            ?
                                            <td>Not eligible <button className="btn mainBtn" onClick={() => this.deleteRequest(index)}>Delete request</button></td>
                                            :
                                            (
                                                !this.state.donors[row.donorid].bloodtype
                                                ?
                                                <td>First complete the medical settings</td>
                                                :
                                                <td style={{textAlign: "right", paddingRight: "10px"}}>
                                                    <Link 
                                                        className="btn mainBtn"
                                                        style={{paddingLeft: "30px", paddingRight: "30px"}}
                                                        to={{
                                                            pathname: `/board/personnel/pendingdonations/edit/${row.id}/${this.props.match.params.userID}`,
                                                            state: {
                                                                display: "PENDING_DONATIONS_EDIT",
                                                                donorName: this.state.donors[row.donorid] && this.state.donors[row.donorid].name
                                                            }
                                                        }}
                                                    >
                                                        Set results
                                                    </Link>
                                                </td>
                                            )
                                        }
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <td colSpan={5} style={{textAlign: "center"}}>No pending donations</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        ]
    }
};


export default withRouter(DoctorAvailableStocksPage);
