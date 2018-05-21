import React from 'react';
import { withRouter } from 'react-router-dom';

import LibraryLoader from 'utils/LibraryLoader';
import AjaxUtils from 'utils/AjaxUtils.js';
import Collapsible from 'react-collapsible';

class PacientAnalysisHistoryPage extends React.Component {
    constructor(props) {
        super(props);

        //an array of donations
        this.state = {
            data: [{
                "patientID": 1,
                "analysisResult": true,
                "clinicID": 12
            }],

        }
    }

    componentDidMount() {

        AjaxUtils.request('GET', '/api/donors/getAnalysisHistory/{donorID}')
            .then(data => {
                self.state.data = data;
                self.setState(self.state);
            })
    }

    
    fetchData() {
        fetch('/api/donors/getAnalysisHistory/{donorID}')
            .then(response => response.json())
            .then(parsedJson => parsedJson.results.map(donation => {
                id: `${donation.id}`
                blood: `${donation.blood}`
                pacient: `${donation.patient}`
                analysisResult: `${donation.analysisResult}`
            }))
            .then(donations => this.setState({ donations, isLoading: false }))
            .catch(error => console.log('parsing failed', error))
    }



    render() {
        //this.fetchData();
        return (
            <div id="mainCnt">
                <div id="title">ANALYSIS HISTORY</div>

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
        )
    }
};

export default withRouter(PacientAnalysisHistoryPage);
