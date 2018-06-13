import React from 'react';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';

import AjaxUtils from 'utils/AjaxUtils.js';

import serverUrls from 'data/serverUrls';

class MedicalHistory extends React.Component {
    constructor(props) {
        super(props);

        //an array of donations
        this.state = {
            data: [ ],

            input: ""
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const self = this;
        AjaxUtils.request("GET", serverUrls.donors.getPersonalDetails + '/' + this.props.match.params.userID)
            .then(data => {
                self.state.data = data.medicalHistory
                    .split(/\n/)
                    .filter(e => e.length ? true : false)
                    .map(e => { let a = e.split(":"); return { date: a[0], message: a[1].replace(/\"/g, "") } });
                self.setState(self.state);
            })
            .catch(req => {
                console.error(req);
                self.props.createNotification("danger", "Something very very wrong happened", 2000);
            })
    }

    onSubmit(e) {
        e.preventDefault();

        if (!this.state.input) {
            this.props.createNotification("danger", "Write something first", 2000);
            return;
        }

        const self = this;
        AjaxUtils.request("PUT", serverUrls.donors.addMedicalHistory(this.props.match.params.userID), this.state.input)
            .then(data => {
                self.props.createNotification("success", "Success");
                self.componentDidMount();
            })
            .catch(req => {
                console.error(req);
                self.props.createNotification("danger", "Something very very wrong happened", 2000);
            })
    }

    render() {
        return [
            <Helmet key="helmet">
                <link rel="stylesheet" href="css/medicalHistory.min.css"/>
            </Helmet>,
            <div key="main" id="mainCnt">
                <div id="title">Medical history</div>
                <div id="sCnt">
                    <form onSubmit={this.onSubmit}>
                        <div>
                            <div className="row">
                                <div className="col-3">Do you have anything to say?:</div>    
                                <div className="col-9">
                                    <input 
                                        type="text"
                                        className={`form-control`} 
                                        value={this.state.input || ''} 
                                        onChange={e => { this.state.input = e.target.value; this.setState(this.state) }}
                                    />
                                </div>
                            </div>
                        </div>
                        <input type="submit" className="btn mainBtn" value="Trimite"/>
                    </form>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Log</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (this.state.data.length > 0)
                            ?
                            this.state.data.map((log, index) => {
                                return (
                                    <tr key={`log${index}`}>
                                        <td>{log.date}</td>
                                        <td>{log.message}</td>
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <td colSpan={2}>No history</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        ]
    }
};

export default withRouter(MedicalHistory);
