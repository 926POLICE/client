import React from 'react';
import { withRouter } from 'react-router-dom';

import LibraryLoader from 'utils/LibraryLoader';
import AjaxUtils from 'utils/AjaxUtils.js';

class DoctorRequestsStatusPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [{
                "patientID": 1,
                "redBloodCellsQuantity": 20,
                "plasmaQuantity": 10,
                "thrombocytesQuantity": 30,
                "priority": true,
                "completed": true
            }]

        }
    }

    componentDidMount() {
        const self = this;

        //checkRequestStatus(Integer pacientID sau String pacientName) : String 

        AjaxUtils.request('GET', 'http://localhost:8080/api/checkRequestStatus/{pacientID}', undefined)
            .then(data => {
                self.state.data = data;
                self.setState(self.state);
            })
    }

    render() {
        return (
            <div id="mainCnt">
                <div id="title">REQUESTS</div>
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
                                    <td>{row.redBloodCellsQuantity}</td>
                                    <td>{row.plasmaQuantity}</td>
                                    <td>{row.thrombocytesQuantity}</td>
                                    <td>{row.priority.toString()}</td>
                                    <td>{row.completed.toString()}</td>
                                </tr>
                            )
                        })}

                    </tbody>

                </table>
            </div>
        )
    }
};


export default withRouter(DoctorRequestsStatusPage);
