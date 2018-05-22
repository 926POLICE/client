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
                <MenuItem to='/board/doctors/bloodrequests' display='BLOOD_REQUESTS'>Blood requests</MenuItem>
                <MenuItem to='/board/doctors/bloodstocks' display='STOCKS'>Blood stocks</MenuItem>
                {/* <MenuItem to='/board/doctors/template' display='TEMPLATE'>Template</MenuItem> */}
            </Menu>
        )
    }
}