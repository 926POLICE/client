import React from 'react';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';

import LibraryLoader from 'utils/LibraryLoader';
import AjaxUtils from 'utils/AjaxUtils.js';
import Collapsible from 'react-collapsible';

import serverUrls from 'data/serverUrls';

class PacientAnalysisHistoryPage extends React.Component {
    constructor(props) {
        super(props);

        //an array of donations
        this.state = {
            data: [
                // {
                //     "patientID": 1,
                //     "analysisResult": true,
                //     "clinicID": 12
                // }
            ]
        }
    }

    componentDidMount() {
        const self = this;
        AjaxUtils.request('GET', serverUrls.donors.getAnalysisHistory + '/' + this.props.match.params.userID)
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
                <link rel="stylesheet" href="css/plainBoard.min.css"/>
            </Helmet>,
            <div key="main" id="mainCnt">
                <div id="title">Analysis history</div>
                <table>
                    <thead>
                        <tr>
                            <th>PatientID</th>
                            <th>AnalysisResult</th>
                            <th>ClinicID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((row, index) => {
                            return (
                                <tr key={`r${index}`}>
                                    <td>{row.patientID}</td>
                                    <td>{row.analysisResult.toString()}</td>
                                    <td>{row.clinicID}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        ]
    }
};

export default withRouter(PacientAnalysisHistoryPage);
