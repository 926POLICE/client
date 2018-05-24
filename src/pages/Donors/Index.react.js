import React from 'react';
import { withRouter } from 'react-router-dom';

import LibraryLoader from 'utils/LibraryLoader'

import Menu from 'components/Donors/Menu.react.js';
import DonateBloodPage from './DonateBlood.react';
import DonorsettingsPage from 'pages/Common/Settings.react';
import DonorAnalysisHistoryPage from './AnalysisHistory.react';

// here add the next pages

class DonorsIndexPage extends React.Component {
    constructor(props) {
        if (props.location.pathname.startsWith('/board/donors/donate')) {
			props.location.state = { display: 'DONATE' };
		}  else if (props.location.pathname.startsWith('/board/donors/settings')) { // copy and modify this as required
            props.location.state = { display: 'SETTINGS' };
        } else if (props.location.pathname.startsWith('/board/donors/history')) { // copy and modify this as required
            props.location.state = { display: 'HISTORY' }; 
        } else {
            props.history.push({
                pathname: '/board/donors/donate/' + props.match.params.userID,
                state: { display: 'DONATE' }
            })
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

        const props = {
            libraryLoader: this.libraryLoader,
            userID: this.props.userID,
            createNotification: this.props.createNotification
        }

        switch (this.props.location.state && this.props.location.state.display) {
			case 'DONATE':
                displayBlock = <DonateBloodPage {...props}/>;
                break;
            case 'SETTINGS':
                displayBlock = <DonorsettingsPage {...props}/>;
                break;
            case 'HISTORY':
                displayBlock = <DonorAnalysisHistoryPage {...props}/>;
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

export default withRouter(DonorsIndexPage);
