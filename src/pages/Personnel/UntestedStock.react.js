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

        this.testBlood = this.testBlood.bind(this);
    }

    componentDidMount() {
        const self = this;

        AjaxUtils.request('GET', serverUrls.personnel.getUntestedStock())
            .then(data => {
                self.state.data = data;
                self.setState(self.state);
              
            })
            .catch(req => {
                console.error(req);
                self.props.createNotification("danger", "Something very very wrong happened", 2000);
            })
    }

    testBlood(isGood, stockID, index) {
        AjaxUtils.request("PUT", serverUrls.personnel.testBlood(stockID), { flag: isGood })
            .then(() => {
                self.state.data.splice(index, 1);
                self.setState(self.state);

                self.props.createNotification("success", "The blood stock was updated successfully");
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
                            <th>DonationID</th>
                            <th>It is good?</th>
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
                                        <td>{row.donationid}</td>
                                        <td>
                                            <button className="btn btn-success" onClick={() => this.testBlood(true, row.id, index)}>Good</button>
                                            <button className="btn btn-danger" onClick={() => this.testBlood(false, row.id, index)}>Bad</button>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <td colSpan={7} style={{textAlign: "center"}}>No stocks</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        ]
    }
};


export default withRouter(DoctorAvailableStocksPage);
