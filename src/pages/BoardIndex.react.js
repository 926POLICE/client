import React from 'react';
import { withRouter } from 'react-router-dom';

import LibraryLoader from 'utils/LibraryLoader'

import DoctorsIndex from 'pages/Doctors/Index.react';
import DonorsIndex from 'pages/Donors/Index.react';
import PersonnelIndex from 'pages/Personnel/Index.react';

import TopBar from 'components/TopBar.react';

import createNotification from 'utils/createNotification.js';

import AjaxUtils from 'utils/AjaxUtils.js';
import serverUrls from '../data/serverUrls';

class BoardIndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.displayBlock = null;
        if (props.location.pathname.startsWith('/board/donors')) {
			this.displayBlock = DonorsIndex;
        } else if (props.location.pathname.startsWith('/board/personnel')) {
			this.displayBlock = PersonnelIndex;
        } else if (props.location.pathname.startsWith('/board/doctors')) {
			this.displayBlock = DoctorsIndex;
        }
        
        this.state = {
            notificationBlock: null
        }

        this.libraryLoader = new LibraryLoader();
    }

    componentDidMount() {
        if (this.props.location.state && this.props.location.state.refresh) {
            window.location.reload();
        }

        if (!this.props.location.pathname.startsWith('/board/personnel')) {
            const self = this;
            AjaxUtils.request("GET", serverUrls.donors.getPersonalDetails + '/' + this.props.match.params.userID)
                .then(data => {
                    self.state.name = data.name;
                    self.setState(self.state);
                })
                .catch(req => {

                })
        } else {
            this.state.name = "admin";
            this.setState(this.state);
        }
    }

    render() {
        return this.displayBlock && 
        [
            this.state.notificationBlock,
            <TopBar key="topBar" name={this.state.name || ""}/>,
            <this.displayBlock
                key="displayBlock"
                createNotification={(level, message, time) => {
                    this.state.notificationBlock = createNotification(level, message, time = 2000);
                    this.setState(this.state);
                }}
            />
        ]
    }
};

export default withRouter(BoardIndexPage);
