import React from 'react';
import { withRouter } from 'react-router-dom';

import LibraryLoader from 'utils/LibraryLoader';
import AjaxUtils from 'utils/AjaxUtils.js';

class DoctorAvailableStocksPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [{
                "collectionDate": "12 - 12 - 2017",
                "quantity": 10,
                "state": 1,
                "type": "type",
                "shelfLife": 1,
                "donationID": 12,
                "clinicID": 12
            }]

        }
    }

    componentDidMount() {
        const self = this;

        AjaxUtils.request('GET', '/api/bloodStocks', undefined)
            .then(data => {
                    self.state.data = data;
                    self.setState(self.state);
              
            })
    }

    render() {
        return (
            <div id="mainCnt">
                <div id="title">AVAILABLE BLOOD STOCKS</div>
                <table>
                    <thead>
                        <tr>
                            <th>Date of Collection</th>
                            <th>Quantity</th>
                            <th>State</th>
                            <th>Type</th>
                            <th>Shelf Life</th>
                            <th>DonationID</th>
                            <th>ClinicID</th>
                        </tr>
                    </thead>

                      <tbody>
                        {this.state.data.map((row, index) => {
                            return (
                                <tr key={`r${index}`}>
                                    <td>{row.collectionDate}</td>
                                    <td>{row.quantity}</td>
                                    <td>{row.state}</td>
                                    <td>{row.type}</td>
                                    <td>{row.shelfLife}</td>
                                    <td>{row.donationID}</td>
                                    <td>{row.clinicID}</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        )
    }
};


export default withRouter(DoctorAvailableStocksPage);
