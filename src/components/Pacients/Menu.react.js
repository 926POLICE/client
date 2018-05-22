import React from 'react';
import { Menu, MenuItem } from 'components/Menu.react';

export default class PacientsMenu extends React.Component {
    constructor(props) {
        super(props);

        console.log(Menu);
    }
    render() {
        return (
            <Menu>
                <MenuItem to='/board/pacients/donate' display='DONATE'>Donate</MenuItem>
                <MenuItem to='/board/pacients/settings' display='SETTINGS'>Settings</MenuItem>
                <MenuItem to='/board/pacients/history' display='HISTORY'>Analysis History</MenuItem>
                {/* <MenuItem to='/board/pacients/template' display='TEMPLATE'>Template</MenuItem> */}
            </Menu>
        )
    }
}