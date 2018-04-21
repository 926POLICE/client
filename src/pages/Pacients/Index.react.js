import React from 'react';
import { withRouter } from 'react-router-dom';

import LibraryLoader from 'utils/LibraryLoader'

import Menu from 'components/Pacients/Menu.react.js';
import DonateBloodPage from 'pages/Pacients/DonateBlood.react';

class PacientsIndexPage extends React.Component {
    constructor(props) {
        if (props.location.pathname.startsWith('/board/pacients/donate')) {
			props.location.state = { display: 'DONATE' };
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
