import React from 'react';
import { Menu, MenuItem } from 'components/Menu.react';

export default class DonorsMenu extends React.Component {
    constructor(props) {
        super(props);

        console.log(Menu);
    }
    render() {
        return (
            <Menu>
                <MenuItem to={'/board/donors/donate/' + this.props.userID} display='DONATE'>Donate</MenuItem>
                <MenuItem to={'/board/donors/settings/' + this.props.userID} display='SETTINGS'>Settings</MenuItem>
                <MenuItem to={'/board/donors/history/' + this.props.userID} display='HISTORY'>Analysis history</MenuItem>
                <MenuItem to={'/board/donors/medicalhistory/' + this.props.userID} display='MHISTORY'>Medical history</MenuItem>
                <MenuItem to={'/board/donors/bloodjourney/' + this.props.userID} display='JOURNEY'>Blood journey</MenuItem>
                {/* <MenuItem to='/board/donors/template' display='TEMPLATE'>Template</MenuItem> */}
            </Menu>
        )
    }
}