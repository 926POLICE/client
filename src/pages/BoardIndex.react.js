import React from 'react';
import { withRouter } from 'react-router-dom';

import LibraryLoader from 'utils/LibraryLoader'

import DoctorsIndex from 'pages/Doctors/Index.react';
import DonorsIndex from 'pages/Donors/Index.react';
import PersonnelIndex from 'pages/Personnel/Index.react';

import createNotification from 'utils/createNotification.js';

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

        this.userID = this.props.location.state && this.props.location.state.userID;
    }

    componentDidMount() {
        // if (!this.userID) {
        //     window.location.href = "/";
        // }

        if (this.props.location.state && this.props.location.state.refresh) {
            window.location.reload();
        }
    }

    render() {
        return this.displayBlock && 
        [
            this.state.notificationBlock,
            <this.displayBlock 
                userID={this.userID}
                createNotification={(level, message, time) => {
                    this.state.notificationBlock = createNotification(level, message, time);
                    this.setState(this.state);
                }}
            />
        ]
    }
};

export default withRouter(BoardIndexPage);
