import React from 'react';
import { withRouter } from 'react-router-dom';

import LibraryLoader from 'utils/LibraryLoader'

import Menu from 'components/Doctors/Menu.react.js';
import BloodRequest from './BloodRequest.react';
import BloodRequestAdd from './BloodRequestAdd.react';

class DoctorsIndexPage extends React.Component {
    constructor(props) {
        if (props.location.pathname.startsWith('/board/doctors/bloodRequests/add')) { // copy and modify this as required
			props.location.state = { display: 'BLOOD_REQUEST_ADD' };
		} else if (props.location.pathname.startsWith('/board/doctors/bloodRequests')) { // copy and modify this as required
			props.location.state = { display: 'BLOOD_REQUEST' };
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
