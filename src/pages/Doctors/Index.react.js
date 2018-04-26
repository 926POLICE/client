import React from 'react';
import { withRouter } from 'react-router-dom';

import LibraryLoader from 'utils/LibraryLoader'

import Menu from 'components/Doctors/Menu.react.js';

class DoctorsIndexPage extends React.Component {
    constructor(props) {
        if (props.location.pathname.startsWith('/board/doctors/page')) {
			props.location.state = { display: 'PAGE' };
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
