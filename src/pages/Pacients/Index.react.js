import React from 'react';
import { withRouter } from 'react-router-dom';

import LibraryLoader from 'utils/LibraryLoader'

import Menu from 'components/Pacients/Menu.react.js';
import DonateBloodPage from 'pages/Pacients/DonateBlood.react';
// here add the next pages

class PacientsIndexPage extends React.Component {
    constructor(props) {
        if (props.location.pathname.startsWith('/board/pacients/donate')) {
			props.location.state = { display: 'DONATE' };
		} else if (props.location.pathname.startsWith('/board/pacients/TEMPLATE')) { // copy and modify this as required
			props.location.state = { display: 'TEMPLATE' };
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
			case 'DONATE':
                displayBlock = <DonateBloodPage libraryLoader={this.libraryLoader}/>;
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

export default withRouter(PacientsIndexPage);
