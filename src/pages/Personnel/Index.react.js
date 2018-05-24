import React from 'react';
import { withRouter } from 'react-router-dom';

import Menu from 'components/Personnel/Menu.react.js';
import BloodRequestPage from 'pages/Common/BloodRequests.react';
import StocksPage from 'pages/Common/Stocks.react';
import DonorsPage from './Donors.react';
import DonorsEditPage from 'pages/Common/Settings.react';

class PersonnelIndexPage extends React.Component {
    constructor(props) {
        if (props.location.pathname.startsWith('/board/personnel/bloodstocks')) {
			props.location.state = { display: 'BLOOD_STOCKS' };
		} else if (props.location.pathname.startsWith('/board/personnel/bloodrequests')) {
			props.location.state = { display: 'BLOOD_REQUESTS' };
		} else if (props.location.pathname.startsWith('/board/personnel/donors/edit')) {
			props.location.state = { display: 'DONORS_EDIT' };
		} else if (props.location.pathname.startsWith('/board/personnel/donors')) {
			props.location.state = { display: 'DONORS' };
		} else {
            props.history.push({
                pathname: '/board/personnel/bloodrequests',
                state: { display: 'BLOOD_REQUESTS' }
            })
        }

        super(props);
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
            createNotification: this.props.createNotification,
            admin: true
        }

        switch (this.props.location.state && this.props.location.state.display) {
			case 'BLOOD_STOCKS':
                displayBlock = <StocksPage {...props}/>;
                break;

            case 'BLOOD_REQUESTS':
                displayBlock = <BloodRequestPage {...props}/>;
                break;

            case 'DONORS':
                displayBlock = <DonorsPage {...props}/>;
                break;

            case 'DONORS_EDIT':
                displayBlock = <DonorsEditPage {...props}/>;
                break;
		}
        
        return (
            <div id="rootCnt">
                <Menu/>
                { displayBlock }
            </div>
        )
    }
};

export default withRouter(PersonnelIndexPage);
