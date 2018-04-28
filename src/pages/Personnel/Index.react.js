import React from 'react';
import { withRouter } from 'react-router-dom';

import Menu from 'components/Personnel/Menu.react.js';
import BloodStocksPage from 'pages/Personnel/BloodStocks.react';
// here add the next pages

class PersonnelIndexPage extends React.Component {
    constructor(props) {
        if (props.location.pathname.startsWith('/board/personnel/bloodstocks')) {
			props.location.state = { display: 'BLOODSTOCKS' };
		} else if (props.location.pathname.startsWith('/board/personnel/TEMPLATE')) { // copy and modify this as required
			props.location.state = { display: 'TEMPLATE' };
		} else {
            props.location.state = { display: null };
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

        switch (this.props.location.state.display) {
			case 'BLOODSTOCKS':
                displayBlock = <BloodStocksPage libraryLoader={this.libraryLoader}/>;
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

export default withRouter(PersonnelIndexPage);
