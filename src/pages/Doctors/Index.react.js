import React from 'react';
import { withRouter } from 'react-router-dom';

import LibraryLoader from 'utils/LibraryLoader'

import Menu from 'components/Doctors/Menu.react.js';
import DoctorRequestsStatusPage from 'pages/doctors/DoctorRequestsStatusPage.react';
import DoctorAvailableStocksPage from 'pages/doctors/DoctorAvailableStocksPage.react';
// here add the next pages


class DoctorsIndexPage extends React.Component {
    constructor(props) {
        if (props.location.pathname.startsWith('/board/doctors/page')) {
			props.location.state = { display: 'PAGE' };
		} else if (props.location.pathname.startsWith('/board/doctors/TEMPLATE')) { // copy and modify this as required
			props.location.state = { display: 'TEMPLATE' };
		} else if (props.location.pathname.startsWith('/board/doctors/requests')) { // copy and modify this as required
			props.location.state = { display: 'REQUESTS' };
		} else if (props.location.pathname.startsWith('/board/doctors/bloodstocks')) { // copy and modify this as required
			props.location.state = { display: 'STOCKS' };
		} else {
            props.location.state = { display: null };
        }

        super(props);

        this.libraryLoader = new LibraryLoader();
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.location.state) {
            nextProps.location.state = {};
        }
    }
    
    render() {
        var displayBlock = null;

        switch (this.props.location.state.display) {
			case 'PAGE':
                // displayBlock = <DonateBloodPage libraryLoader={this.libraryLoader}/>;
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
        
        return (
            <div id="rootCnt">
                <Menu/>
                { displayBlock }
            </div>
        )
    }
};

export default withRouter(DoctorsIndexPage);
