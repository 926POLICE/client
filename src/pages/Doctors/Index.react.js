import React from 'react';
import { withRouter } from 'react-router-dom';

import LibraryLoader from 'utils/LibraryLoader'

import Menu from 'components/Doctors/Menu.react.js';

import BloodRequest from './BloodRequest.react';
import BloodRequestAdd from './BloodRequestAdd.react';

import DoctorRequestsStatusPage from 'pages/doctors/DoctorRequestsStatusPage.react';
import DoctorAvailableStocksPage from 'pages/doctors/DoctorAvailableStocksPage.react';
// here add the next pages



class DoctorsIndexPage extends React.Component {
    constructor(props) {
        if (props.location.pathname.startsWith('/board/doctors/bloodRequests/add')) { // copy and modify this as required
			props.location.state = { display: 'BLOOD_REQUEST_ADD' };
		} else if (props.location.pathname.startsWith('/board/doctors/bloodRequests')) { // copy and modify this as required
			props.location.state = { display: 'BLOOD_REQUEST' };
        if (props.location.pathname.startsWith('/board/doctors/page')) {
			props.location.state = { display: 'PAGE' };
		} else if (props.location.pathname.startsWith('/board/doctors/TEMPLATE')) { // copy and modify this as required
			props.location.state = { display: 'TEMPLATE' };
		} else if (props.location.pathname.startsWith('/board/doctors/requests')) { // copy and modify this as required
			props.location.state = { display: 'REQUESTS' };
		} else if (props.location.pathname.startsWith('/board/doctors/bloodstocks')) { // copy and modify this as required
			props.location.state = { display: 'STOCKS' };
		} else {
            props.location.state = { display: 'BLOOD_REQUEST' };
        }

        console.log('ASSD', props.location.state, props.location.pathname);

        super(props);

        this.libraryLoader = new LibraryLoader();

        console.log("USERID", this.props.userID);
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
            userID: this.props.userID
        }

        switch (this.props.location.state.display) {
			case 'BLOOD_REQUEST':
                displayBlock = <BloodRequest {...props}/>;
                break;

            case 'BLOOD_REQUEST_ADD':
                displayBlock = <BloodRequestAdd {...props}/>;
                break;
            case 'REQUESTS':
                displayBlock = <DoctorRequestsStatusPage libraryLoader={this.libraryLoader}/>;
                break;
            case 'STOCKS':
                displayBlock = <DoctorAvailableStocksPage libraryLoader={this.libraryLoader}/>;
                break;
            // also add the page here (don't forget the break)
            // case 'TEMPLATE':
            //     displayBlock = <TemplatePageName libraryLoader={this.libraryLoader}/>;
            //     break;
        }
        
        console.log('DFFD', this.props.location.state.display);
        
        return (
            <div id="rootCnt">
                <Menu/>
                { displayBlock }
            </div>
        )
    }
};

export default withRouter(DoctorsIndexPage);
