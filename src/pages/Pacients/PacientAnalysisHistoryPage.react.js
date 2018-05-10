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
            contacts: [],
            isLoading: true,
            donations: [{
                "id": 1,
                "blood": "blood",
                "pacient": "pacient",
                "analysisResult": "result"
            }],
            donation: {
                "id": 0,
                "blood": "",
                "pacient": "",
                "analysisResult": ""
            }
        }
    }

    componentDidMount() {
        AjaxUtils.request('GET', '/api/donors/history/{donorID}', undefined)
            .then(response => response.json())
            .then(parsedJson => console.log(parsedJson.results)
            //.map(donation => {
                //user: `${donation.name.first}`
                //id: `${donation.id}`
                //blood: `${donation.blood}`
                //pacient: `${donation.patient}`
                //analysisResult: `${donation.analysisResult}`
            //}))
            //.then(donations => this.setState({ donations, isLoading: false }))
            .catch(error => console.log('parsing failed', error)))
        //this.fetchData();

    }


    fetchData() {
        fetch('/api/history')
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
        this.fetchData();
        return (
            <div id="mainCnt">
                <div id="title">ANALYSIS HISTORY</div>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Blood</th>
                            <th>Pacient</th>
                            <th>AnalysisResult</th>
                        </tr> 
                    </thead>
                    <tbody>
                        {this.state.donations.map((row, index) => {
                            return (
                                <tr key={`r${index}`}>
                                    <td>{row.id}</td>
                                    <td>{row.blood}</td>
                                    <td>{row.pacient}</td>
                                    <td>{row.analysisResult}</td>
                                </tr>
                            )
                        })}
                    
                    </tbody>
                </table>
            </div>
        )
    }
};

AjaxUtils.request('GET', '/api/history', undefined)
    .then(data => {
        // the data is the response given by the server if all is alright
    })
    .catch(error => {
        // Here you catch the errors(print out the error variable)
        console.error(error);
    })

export default withRouter(PacientAnalysisHistoryPage);
