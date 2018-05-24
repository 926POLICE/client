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
            data: [
                // {
                //     "collectionDate": 1527055944863,
                //     "quantity": 10,
                //     "state": 1,
                //     "type": "type",
                //     "shelfLife": 1,
                //     "donationID": 12,
                //     "clinicID": 12
                // }
            ],

            notificationBlock: null
        }
    }

    componentDidMount() {
        const self = this;

        AjaxUtils.request('GET', serverUrls.getBloodStocks)
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
                <link rel="stylesheet" href="css/stocks.min.css"/>
            </Helmet>,
            <div key="main" id="mainCnt">
                { this.state.notificationBlock }
                <div id="title">Blood stocks</div>
                <table>
                    <thead>
                        <tr>
                            <th>Date of Collection</th>
                            <th>Quantity</th>
                            <th>State</th>
                            <th>Type</th>
                            <th>Shelf Life</th>
                            <th>DonationID</th>
                        </tr>
                    </thead>

                      <tbody>
                        {this.state.data.map((row, index) => {
                            const date = new Date(row.collectionDate);

                            return (
                                <tr key={`r${index}`}>
                                    <td>{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</td>
                                    <td>{row.quantity}</td>
                                    <td>{row.state}</td>
                                    <td>{row.type}</td>
                                    <td>{row.shelfLife}</td>
                                    <td>{row.donationID}</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        ]
    }
};


export default withRouter(DoctorAvailableStocksPage);
