import React from 'react';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';

import LibraryLoader from 'utils/LibraryLoader';
import AjaxUtils from 'utils/AjaxUtils.js';

import serverUrls from 'data/serverUrls';
import createNotification from 'utils/createNotification.js';

class FormInput extends React.Component {
    render() {
        return (
            <div className="form-group row">
                <label className="col-sm-3 col-lg-2 col-form-label">{this.props.title}</label>
                <div className="col-sm-9">
                    { this.props.children }
                </div>
            </div>
        )
    }
}

class PendingDonationsEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                r: 0,
                p: 0,
                t: 0
            }
        }

        this.save = this.save.bind(this)
    }

    componentDidMount() {
        const self = this;
    }

    save() {
        const self = this;

        if (this.state.form.r == 0 || this.state.form.p == 0 || this.state.form.t == 0) {
            return this.props.createNotification("danger", "You can't leave a field with 0", 2000);
        }

        AjaxUtils.request("POST", serverUrls.personnel.collectBlood(), {
            donationid: this.props.match.params.donationID,
            rquantity: this.state.form.r,
            tquantity: this.state.form.t,
            pquantity: this.state.form.p,
            collectiondate: Date.now()
        })
            .then(() => {
                self.props.createNotification("success", "The blood collection was done with success", 2000);

                self.props.history.push({
                    pathname: `/board/personnel/pendingdonations/${this.props.match.params.userID}`,
                    state: {
                        display: "PENDING_DONATIONS",
                        good: true
                    }
                })
            })
            .catch(req => {
                console.error(req);
                self.props.createNotification("danger", "Something very very wrong happened", 2000);
            })
    }

    render() {
        return [
            <Helmet key="helmet">
                <link rel="stylesheet" href="css/stocks.min.css"/>
            </Helmet>,
            <div key="main" id="mainCnt">
                <div id="title">Set donations values</div>
                <FormInput title="Red blood cells quantity (ml):">
                    <input 
                        id="rblood"
                        className="form-control"
                        type="number"
                        value={this.state.form.r}
                        onChange={e => {
                            this.state.form.r = parseInt(e.target.value) || 0;
                            this.setState(this.state);
                        }}
                    />
                </FormInput>
                <FormInput title="Thrombocytes quantity (ml):">
                    <input 
                        id="tblood"
                        className="form-control"
                        type="number"
                        value={this.state.form.t}
                        onChange={e => {
                            this.state.form.t = parseInt(e.target.value) || 0;
                            this.setState(this.state);
                        }}
                    />
                </FormInput>
                <FormInput title="Blood plasma quantity (ml):">
                    <input 
                        id="pblood"
                        className="form-control"
                        type="number"
                        value={this.state.form.p}
                        onChange={e => {
                            this.state.form.p = parseInt(e.target.value) || 0;
                            this.setState(this.state);
                        }}
                    />
                </FormInput>
                <div>
                    <button className="btn mainBtn" onClick={this.save}>Save</button>
                </div>
            </div>
        ]
    }
};


export default withRouter(PendingDonationsEdit);
