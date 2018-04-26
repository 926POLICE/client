import React from 'react';
import { withRouter } from 'react-router-dom';

import LibraryLoader from 'utils/LibraryLoader'

import DoctorsIndex from 'pages/Doctors/Index.react';
import PacientsIndex from 'pages/Pacients/Index.react';
import PersonnelIndex from 'pages/Personnel/Index.react';

class BoardIndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.displayBlock = null;
        if (props.location.pathname.startsWith('/board/pacients')) {
			this.displayBlock = PacientsIndex;
        } else if (props.location.pathname.startsWith('/board/personnel')) {
			this.displayBlock = PersonnelIndex;
        } else if (props.location.pathname.startsWith('/board/doctors')) {
			this.displayBlock = DoctorsIndex;
        }
        
        this.libraryLoader = new LibraryLoader();
    }

    componentDidMount() {
        this.libraryLoader.loadCSS('/css/board.min.css');
    }
    
    render() {
        return this.displayBlock && <this.displayBlock/>
    }
};

export default withRouter(BoardIndexPage);