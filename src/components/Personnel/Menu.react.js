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
                <MenuItem to='/board/personnel/bloodstocks' display='BLOODSTOCKS'>Blood stocks</MenuItem>
                <MenuItem to='/board/personnel/bloodstocks' display='BLOODSTOCKS'>Menu 1</MenuItem>
                <MenuItem to='/board/personnel/bloodstocks' display='BLOODSTOCKS'>Menu 2</MenuItem>
            </Menu>
        )
    }
}