import React from 'react';
import { withRouter } from 'react-router-dom';

import LibraryLoader from 'utils/LibraryLoader'

import Menu from 'components/Donors/Menu.react.js';
import DonateBloodPage from './DonateBlood.react';
import DonorsettingsPage from 'pages/Common/Settings.react';
import DonorAnalysisHistoryPage from './AnalysisHistory.react';
import DonorMedicalHistoryPage from './MedicalHistory.react';
import JourneyPage from './BloodJourney.react';

import AjaxUtils from 'utils/AjaxUtils.js';
import serverUrls from '../../data/serverUrls';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'

// here add the next pages

class DonorsIndexPage extends React.Component {
    constructor(props) {
        if (props.location.pathname.startsWith('/board/donors/donate')) {
			props.location.state = { display: 'DONATE' };
		}  else if (props.location.pathname.startsWith('/board/donors/settings')) { // copy and modify this as required
            props.location.state = { display: 'SETTINGS' };
        } else if (props.location.pathname.startsWith('/board/donors/history')) { // copy and modify this as required
            props.location.state = { display: 'HISTORY' }; 
        } else if (props.location.pathname.startsWith('/board/donors/medicalhistory')) { // copy and modify this as required
            props.location.state = { display: 'MHISTORY' }; 
        } else if (props.location.pathname.startsWith('/board/donors/bloodjourney')) { // copy and modify this as required
            props.location.state = { display: 'JOURNEY' }; 
        } else {
            props.history.push({
                pathname: '/board/donors/donate/' + props.match.params.userID,
                state: { display: 'DONATE' }
            })
        }

        super(props);

        this.state = {
            showNotification: false
        }

        this.libraryLoader = new LibraryLoader();
    }

    componentDidMount() {
        const self = this;

        AjaxUtils.request("GET", serverUrls.donors.getNotification(this.props.match.params.userID))
            .then(data => {
                if (data) {
                    self.state.showNotification = true;
                    self.setState(self.state);
                }
            })
            .catch(req => {
                console.error(req);
                self.props.createNotification("danger", "Something very very wrong happened", 2000);
            })
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
            case 'MHISTORY':
                displayBlock = <DonorMedicalHistoryPage {...props}/>;
                break;
            case 'JOURNEY':
                displayBlock = <JourneyPage {...props}/>;
                break;
		}
        
        return [
            this.state.showNotification
            &&
            <div key="notfCnt" id="notfCnt">
                <div>We need you BLOOD</div>
                <div><FontAwesomeIcon icon={faTimes} onClick={() => { this.state.showNotification = false; this.setState(this.state); }}/></div>
            </div>,
            <div key="rootCnt" id="rootCnt">
                <Menu userID={this.props.match.params.userID}/>
                { displayBlock }
            </div>
        ]
    }
};

export default withRouter(DonorsIndexPage);
