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

        AjaxUtils.request('GET', '/api/requests', undefined)
            .then(data => {
                // the data is the response given by the server if all is alright
            })
            .catch(error => {
                // Here you catch the errors(print out the error variable)
                console.error(error);
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
