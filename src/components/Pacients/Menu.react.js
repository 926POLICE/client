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
                <MenuItem to='/board/pacients/donate' display='DONATE'>Doneaza</MenuItem>
            </Menu>
        )
    }
}