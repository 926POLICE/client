import React from 'react';
import { withRouter } from 'react-router-dom';

import LibraryLoader from 'utils/LibraryLoader'

import Menu from 'components/Doctors/Menu.react.js';

import BloodRequest from 'pages/Common/BloodRequests.react';
import BloodRequestAdd from './BloodRequestAdd.react';

import StocksPage from 'pages/Common/Stocks.react';
// here add the next pages


class DoctorsIndexPage extends React.Component {
    constructor(props) {
        if (props.location.pathname.startsWith('/board/doctors/bloodrequests/add')) {
			props.location.state = { display: 'BLOOD_REQUESTS_ADD' };
		} else if (props.location.pathname.startsWith('/board/doctors/bloodrequests')) {
			props.location.state = { display: 'BLOOD_REQUESTS' };
		} else if (props.location.pathname.startsWith('/board/doctors/bloodstocks')) {
			props.location.state = { display: 'STOCKS' };
		} else {
            props.history.push({
                pathname: '/board/doctors/bloodrequests/' + props.match.params.userID,
                state: { display: 'BLOOD_REQUESTS' }
            })
        }

        super(props);

        console.log(this.props.userID);

        this.libraryLoader = new LibraryLoader();
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.location.state) {
            nextProps.location.state = {};
        }
    }
    
    render() {
        var displayBlock = null;

        const props = {
            libraryLoader: this.libraryLoader,
            userID: this.props.userID,
            createNotification: this.props.createNotificaton
        }

        switch (this.props.location.state && this.props.location.state.display) {
			case 'BLOOD_REQUESTS':
                displayBlock = <BloodRequest {...props}/>;
                break;

            case 'BLOOD_REQUESTS_ADD':
                displayBlock = <BloodRequestAdd {...props}/>;
                break;

            case 'STOCKS':
                displayBlock = <StocksPage {...props}/>;
                break;
        }
        
        return (
            <div id="rootCnt">
                <Menu userID={this.props.match.params.userID}/>
                { displayBlock }
            </div>
        )
    }
};

export default withRouter(DoctorsIndexPage);
