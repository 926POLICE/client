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
                <MenuItem to='/board/donors/donate' display='DONATE'>Donate</MenuItem>
                <MenuItem to='/board/donors/settings' display='SETTINGS'>Settings</MenuItem>
                <MenuItem to='/board/donors/history' display='HISTORY'>Analysis History</MenuItem>
                {/* <MenuItem to='/board/donors/template' display='TEMPLATE'>Template</MenuItem> */}
            </Menu>
        )
    }
}