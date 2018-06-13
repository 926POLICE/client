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
        AjaxUtils.request('GET', serverUrls.donors.getAnalysisHistory(this.props.match.params.userID))
            .then(data => {
                self.state.data = data.filter(donation => donation.pbloodid != -1);

                for (var i=0, length=self.state.data.length; i < length; ++i) {
                    if (self.state.data[i].patientid != -1) {
                        AjaxUtils.request('GET', serverUrls.checkCompatibility(), { patientid: self.state.data[i].patientid, donorid: this.props.match.params.userID })
                            .then(data => {
                                self.state.data[i].compatible = data;
                                self.setState(self.state);
                            })
                            .catch(req => {
                                console.error(req);
                                self.props.createNotification("danger", "Something very very wrong happened", 2000);
                            })
                    }
                }

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
                <div id="title">Analysis history</div>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Compatible with the person</th>
                            <th>Analysis result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (this.state.data.length > 0)
                            ?
                            this.state.data.map((row, index) => {
                                const date = new Date(row.date);
                                return (
                                    <tr key={`r${index}`} className={row.analysisResult ? "goodAnalysis" : "badAnalysis"}>
                                        <td>{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</td>
                                        <td>{ row.compatible === undefined ? "" : (row.compatible ? "Yes" : "No") }</td>
                                        <td>{row.analysisResult ? "Good" : "Bad"}</td>
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <td colSpan={3}>No analysis have been done</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        ]
    }
};

export default withRouter(PacientAnalysisHistoryPage);
