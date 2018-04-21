import React from 'react';
import { withRouter } from 'react-router-dom';

import PacientsIndex from 'pages/Pacients/Index.react';

class BoardIndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.displayBlock = null;
        if (props.location.pathname.startsWith('/board/pacients')) {
			this.displayBlock = PacientsIndex;
        }
        
        console.log(this.displayBlock);
    }
    
    render() {
        return this.displayBlock && <this.displayBlock/>
    }
};

export default withRouter(BoardIndexPage);
