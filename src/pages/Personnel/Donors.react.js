import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import LibraryLoader from 'utils/LibraryLoader';
import AjaxUtils from 'utils/AjaxUtils.js';

import serverUrls from 'data/serverUrls';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faPencil from '@fortawesome/fontawesome-free-solid/faPencilAlt'

class DonorsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                {
                    id: 10,
                    name: "name",
                    collectionDate: Date.now(),
                    residence: "HERE",
                    bloodType: "R1",
                    rh: true,
                    anticorps: "123"
                }
            ]
        }
    }

    componentDidMount() {
        const self = this;

        AjaxUtils.request('GET', serverUrls.donors.getAll)
            .then(data => {
                self.state.data = data;
                self.setState(self.state);
            })
            .catch(req => {
                console.error(req);
                this.props.createNotification("danger", "Something very very wrong happened", 2000);
                self.setState(self.state);
            })
    }

    render() {
        return [
            <Helmet key="helmet">
                <link rel="stylesheet" href="css/plainBoard.min.css"/>
            </Helmet>,
            <div key="main" id="mainCnt">
                { this.state.notificationBlock }
                <div id="title">Donors</div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Birthday</th>
                            <th>Residence</th>
                            <th>Blood type</th>
                            <th>Rh</th>
                            <th>Anticorps</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.data.map((row, index) => {
                            const date = new Date(row.collectionDate);

                            return (
                                <tr key={`r${index}`}>
                                    <td>{row.name}</td>
                                    <td>{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</td>
                                    <td>{row.residence || row.address}</td>
                                    <td>{row.bloodType}</td>
                                    <td>{row.rh}</td>
                                    <td>{row.anticorps}</td>
                                    <td>
                                        <Link 
                                            key="editBtn" 
                                            className="btn btn-warning"
                                            to={{
                                                pathname: `/board/personnel/donors/edit/${row.id}`,
                                                state: { display: 'DONORS_EDIT' }
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faPencil}/>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>

                </table>
            </div>
        ]
    }
};


export default withRouter(DonorsPage);