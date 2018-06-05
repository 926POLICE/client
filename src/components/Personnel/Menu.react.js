import React from 'react';
import { Menu, MenuItem } from 'components/Menu.react';

export default class PersonnelMenu extends React.Component {
    constructor(props) {
        super(props);

        console.log(Menu);
    }
    render() {
        return (
            <Menu>
                <MenuItem to={'/board/personnel/bloodrequests/' + this.props.userID} display='BLOOD_REQUESTS'>Blood requests</MenuItem>
                <MenuItem to={'/board/personnel/bloodstocks/' + this.props.userID} display='BLOOD_STOCKS'>Blood stocks</MenuItem>
                <MenuItem to={'/board/personnel/donors/' + this.props.userID} display='DONORS'>Donors</MenuItem>
                <MenuItem to={'/board/personnel/pendingdonations/' + this.props.userID} display='PENDING_DONATIONS'>Pending donations</MenuItem>
                <MenuItem to={'/board/personnel/untestedstocks/' + this.props.userID} display='UNTESTED_STOCKS'>Untested stocks</MenuItem>
                <MenuItem to={'/board/personnel/badstocks/' + this.props.userID} display='BAD_STOCKS'>Bad stocks</MenuItem>
            </Menu>
        )
    }
}