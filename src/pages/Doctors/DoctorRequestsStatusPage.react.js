import React from 'react';
import { withRouter } from 'react-router-dom';

import LibraryLoader from 'utils/LibraryLoader';
import AjaxUtils from 'utils/AjaxUtils.js';

class DoctorRequestsStatusPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        const self = this;

        // Initial Ajax requests
    }

    render() {
        return (
            <div id="mainCnt">
                <div id="title">REQUESTS</div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Pacient</th>
                            <th>TQuantity</th>
                            <th>RQuantity</th>
                            <th>PQuantity</th>
                            <th>Priority</th>
                            <th>Completed</th>
                        </tr>
                    </thead>
                </table>
            </div>
        )
    }
};

AjaxUtils.request('GET', '/api/requests', undefined)
    .then(data => {
        // the data is the response given by the server if all is alright
    })
    .catch(error => {
        // Here you catch the errors(print out the error variable)
        console.error(error);
    })

export default withRouter(DoctorRequestsStatusPage);
