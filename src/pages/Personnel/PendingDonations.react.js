import React from 'react';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';

import LibraryLoader from 'utils/LibraryLoader';
import AjaxUtils from 'utils/AjaxUtils.js';

import serverUrls from 'data/serverUrls';
import createNotification from 'utils/createNotification.js';

class DoctorAvailableStocksPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        const self = this;

        AjaxUtils.request('GET', serverUrls.personnel.getPendingDonations())
            .then(data => {
                self.state.data = data;
                self.setState(self.state);
              
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
                <div id="title">Blood stocks</div>
                <table>
                    <thead>
                        <tr>
                            <th>Date of collection</th>
                            <th>Quantity</th>
                            <th>State</th>
                            <th>Type</th>
                            <th>Shelf Life</th>
                            { this.props.admin && <th>DonationID</th> }
                        </tr>
                    </thead>

                      <tbody>
                        {
                            (this.state.data.length > 0)
                            ?
                            this.state.data.map((row, index) => {
                                const date = new Date(row.collectiondate);

                                return (
                                    <tr key={`r${index}`}>
                                        <td>{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</td>
                                        <td>{row.quantity}</td>
                                        <td>{row.state}</td>
                                        <td>{
                                            row.type == "r"
                                            ?
                                            "red cells"
                                            :
                                            (
                                                row.type == "p"
                                                ?
                                                "plasma"
                                                :
                                                "thrombocytes"
                                            )
                                        }</td>
                                        <td>{row.shelflife} days</td>
                                        { this.props.admin && <td>{row.donationid}</td> }
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <td colSpan={6} style={{textAlign: "center"}}>No stocks</td>
                            </tr>
                        }

                    </tbody>
                </table>
            </div>
        ]
    }
};


export default withRouter(DoctorAvailableStocksPage);
