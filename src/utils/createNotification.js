import React from 'react';

class Notification extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            render: true
        }
    }

    componentDidMount() {
        this.bomb();
    }

    componentWillReceiveProps(nextProps) {
        this.state.render = true;
        if (this.timeoutID) clearTimeout(this.timeoutID);
        this.setState(this.state, this.bomb);
    }

    bomb() {
        this.timeoutID = setTimeout(() => {
            this.state.render = false;
            this.setState(this.state);
            this.timeoutID = null;
        }, this.props.time)
    }
    
    render() {
        return this.state.render && (
            <div className={`notificationCnt alert alert-${this.props.level}`}>
                { this.props.message }
            </div>
        )
    }
}

export default (level, message, time) => {
    return <Notification level={level} message={message} time={time}/>
}