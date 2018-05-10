import React from 'react';
import { Menu, MenuItem } from 'components/Menu.react';

export default class DoctorsMenu extends React.Component {
    constructor(props) {
        super(props);

        console.log(Menu);
    }
    render() {
        return (
            <Menu>
                <MenuItem to='/board/doctors/page' display='PAGE'>Page</MenuItem>
                <MenuItem to='/board/doctors/stocks' display='STOCKS'>Stocks</MenuItem>
                <MenuItem to='/board/doctors/requests' display='REQUESTS'>Requests</MenuItem>
                {/* <MenuItem to='/board/doctors/template' display='TEMPLATE'>Template</MenuItem> */}
            </Menu>
        )
    }
}