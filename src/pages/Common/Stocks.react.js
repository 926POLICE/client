import React from 'react';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';

import LibraryLoader from 'utils/LibraryLoader';
import AjaxUtils from 'utils/AjaxUtils.js';

import serverUrls from 'data/serverUrls';
import createNotification from 'utils/createNotification.js';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner'

class DoctorAvailableStocksPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            form: {},

            isLoading: true,
            editIndex: null
        }

        this.save = this.save.bind(this);
    }

    componentDidMount() {
        const self = this;

        AjaxUtils.request('GET', serverUrls.getBloodStocks)
            .then(data => {
                self.state.data = data;
                self.state.isLoading = false;
                self.setState(self.state);
              
            })
            .catch(req => {
                console.error(req);
                self.props.createNotification("danger", "Something very very wrong happened", 2000);
            })
    }

    save(index) {
        const self = this;

        AjaxUtils.request("PUT", serverUrls.personnel.updateStock(this.state.form.id), this.state.form)
            .then(() => {
                self.state.data[index] = Object.assign({}, this.state.form);
                self.state.editIndex = null;
                self.setState(self.state);

                self.props.createNotification("success", "The blood stock was updated successfully", 2000);
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
                <div id="title">Blood stocks</div>
                <table>
                    <thead>
                        <tr>
                            <th>Date of collection</th>
                            <th>Quantity</th>
                            <th>Type</th>
                            <th>Shelf Life</th>
                            { this.props.admin && <th>DonationID</th> }
                            { this.props.admin && <th></th> }
                        </tr>
                    </thead>

                      <tbody>
                        {
                            this.state.isLoading
                            ?
                            <tr>
                                <td colSpan={this.props.admin ? 7 : 6} style={{textAlign: "center"}}>
                                    <FontAwesomeIcon icon={faSpinner} size='3x' spin/>
                                </td>
                            </tr>
                            :
                            (this.state.data.length > 0)
                            ?
                            this.state.data.map((row, index) => {
                                const date = new Date(row.collectiondate);
                                const currentDate = this.state.form.collectiondate ? new Date(this.state.form.collectiondate).toISOString().substring(0, 10) : null;

                                return (
                                    <tr key={`r${index}`}>
                                        <td>
                                            {
                                                this.state.editIndex != index
                                                ?
                                                `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
                                                :
                                                <input 
                                                    type="date" 
                                                    className="form-control"
                                                    value={currentDate} 
                                                    onChange={e => { 
                                                        console.log(e.target.value);
                                                        this.state.form.collectiondate = new Date(e.target.value).getTime();
                                                        this.setState(this.state);
                                                    }}
                                                />
                                            }
                                        </td>
                                        <td>
                                            {
                                                this.state.editIndex != index
                                                ?
                                                `${row.quantity}ml`
                                                :
                                                <input 
                                                    type="number" 
                                                    className="form-control"
                                                    value={this.state.form.quantity} 
                                                    onChange={e => { 
                                                        this.state.form.quantity = parseInt(e.target.value) || this.state.data[this.state.editIndex].quantity;

                                                        this.setState(this.state);
                                                    }}
                                                />
                                            }
                                        </td>
                                        <td>{
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
                                        }</td>
                                        <td>
                                            {
                                                this.state.editIndex != index
                                                ?
                                                `${row.shelflife} days`
                                                :
                                                <input 
                                                    type="number" 
                                                    className="form-control"
                                                    value={this.state.form.shelflife} 
                                                    onChange={e => { 
                                                        this.state.form.shelflife = parseInt(e.target.value) || 1;
                                                        this.setState(this.state);
                                                    }}
                                                />
                                            }
                                        </td>
                                        { this.props.admin && <td>{row.donationid}</td> }
                                        { 
                                            this.props.admin
                                            &&
                                            <td>
                                                {
                                                    this.state.editIndex != index
                                                    ?
                                                    <button 
                                                        className="btn mainBtn" 
                                                        onClick={() => {
                                                            this.state.form = Object.assign({}, row);
                                                            this.state.editIndex = index;
                                                            this.setState(this.state);
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                    :
                                                    <div style={{display: 'flex', flexWrap: 'nowrap'}}>
                                                        <button
                                                            className="btn mainBtn"
                                                            style={{marginRight: ".5rem"}}
                                                            onClick={() => this.save(index)}
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            className="btn btn-danger"
                                                            onClick={() => {
                                                                this.state.editIndex = null;
                                                                this.setState(this.state);
                                                            }}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                }
                                            </td>
                                        }
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <td colSpan={this.props.admin ? 7 : 6} style={{textAlign: "center"}}>No stocks</td>
                            </tr>
                        }

                    </tbody>
                </table>
            </div>
        ]
    }
};


export default withRouter(DoctorAvailableStocksPage);
