import React from 'react';
import { withRouter } from 'react-router-dom';

import LibraryLoader from 'utils/LibraryLoader'

import AjaxUtils from 'utils/AjaxUtils.js';

class BloodRequestPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                {"id":17,"collectionDate":"1","quantity":2.0,"state":3,"type":"4","shelfLife":1},
                {"id":17,"collectionDate":"1","quantity":2.0,"state":3,"type":"4","shelfLife":1},
                {"id":17,"collectionDate":"1","quantity":2.0,"state":3,"type":"4","shelfLife":1}
            ]
        }
    }
    
    componentDidMount() {
        const self = this;

        // AjaxUtils.request('GET', '/api/bloodStocks')
        //     .then(data => {
        //         self.state.data = data;
        //         self.setState(self.state);    
        //     })
    }
    
    render() {
        return (
            <div id="mainCnt">
                <div id="topBar">
                    <div id="title">Blood requests</div>
                    <div id="buttonsCnt">
                        <button className="btn btn-success">Add request</button>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Collection date</th>
                            <th>Quantity</th>
                            <th>State</th>
                            <th>Type</th>
                            <th>Shelf life</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {
                            this.state.data.map((row, index) => {
                                return (
                                    <tr key={`r${index}`}>
                                        <td>{row.collectionDate}</td>
                                        <td>{row.quantity}</td>
                                        <td>{row.state}</td>
                                        <td>{row.type}</td>
                                        <td>{row.shelfLife}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
};

export default withRouter(BloodRequestPage);
