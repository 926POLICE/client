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
                <MenuItem to='/board/personnel/bloodrequests' display='BLOOD_REQUESTS'>Blood requests</MenuItem>
                <MenuItem to='/board/personnel/bloodRequests' display='BLOOD_TRANSFUSIONS'>Blood transfusions</MenuItem>
                <MenuItem to='/board/personnel/bloodstocks' display='BLOOD_STOCKS'>Blood stocks</MenuItem>
                <MenuItem to='/board/personnel/donors' display='DONORS'>Donors</MenuItem>
                {/* <MenuItem to='/board/personnel/template' display='TEMPLATE'>Template</MenuItem> */}
            </Menu>
        )
    }
}