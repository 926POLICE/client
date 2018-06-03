import React from 'react';

import { NavLink } from 'react-router-dom';

export class MenuItem extends React.Component {
    render() {
        return (
            <NavLink 
				to={{
					pathname: this.props.to,
					state: {
						display: this.props.display
					}
				}}
			>
				<div>
					<span>{this.props.children}</span>
				</div>
			</NavLink>
        )
    }
}

export class Menu extends React.Component {
    render() {
        return (
            <div id="menuCnt">
                { this.props.children }
            </div>
        )
    }
};