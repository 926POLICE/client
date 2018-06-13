import React from 'react';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';

import AjaxUtils from 'utils/AjaxUtils.js';

import serverUrls from 'data/serverUrls';

class PacientAnalysisHistoryPage extends React.Component {
    constructor(props) {
        super(props);

        //an array of donations
        this.state = {
            data: [ ]
        }
    }

    componentDidMount() {
        const self = this;
        AjaxUtils.request('GET', serverUrls.donors.getBloodJourney(this.props.match.params.userID))
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
                <link rel="stylesheet" href="css/analysisHistory.min.css"/>
            </Helmet>,
            <div key="main" id="mainCnt">
                <div id="title">Blood journey</div>
                <table>
                    <thead>
                        <tr>
                            <th>Collection date</th>
                            <th>Quantity</th>
                            <th>Blood type</th>
                            <th>Shelf life</th>
                            <th>State</th>
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
                                        <td>{row.quantity}ml</td>
                                        <td>
                                            {
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
                                            }
                                        </td>
                                        <td>{row.usable && `${row.shelflife} days`}</td>
                                        <td>{!row.usable ? "Bad" : (row.state == 1 ? "Not tested yet" : (row.state == 2 ? "Awaiting to be used" : "Used"))}</td>
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <td colSpan={3}>No blood stocks here</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        ]
    }
};

export default withRouter(PacientAnalysisHistoryPage);
