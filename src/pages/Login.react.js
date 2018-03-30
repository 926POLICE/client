import React from 'react';
import { withRouter } from 'react-router-dom';

class LoginPage extends React.Component {
    constructor(props) {
        // Check if we need to show the register elements/page
        if (props.location.pathname.startsWith('/invite')) {
            props.location.state = { display: 'INVITE' };
        } else {
            props.location.state = { display: 'LOGIN' };
        }
        super(props);

        // this.cookies = new Cookies();

        this.state = {
            title: '',
            pass: ''
        };

        this.isInvite = (props.location.state.display === 'INVITE');

        if (this.isInvite) {
            this.state.passAgain = '';
            this.state.title = 'Inregistrare';
            this.state.realName = '';
        } else {
            // this.state.user = this.cookies.get('loginUsername') || '';
            this.state.user = '';
            this.state.title = 'Login';
        }

        this.popoutElem = null;

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentDidMount() {
        const self = this;

        this.userRef.value = this.state.user;

        // If the user is registering/INVITE then get the company name
        if (this.props.location.state.display === 'INVITE') {
            isDebugging && console.log(`Invite code: ${this.props.match.params.invite}`);
            AjaxUtils.request('GET', '/get_company_name', { invite: this.props.match.params.invite },
                (data) => {
                    isDebugging && console.log('/get_company_name', 'data:', data);
                    if (data.status === true) {
                        self.state.title = data.company;
                        self.setState(self.state);
                    } else {
                        if (data.error == -1 || data.error == -2) {
                            self.popoutElem.show('Invitatia nu este buna', 'danger');
                        } else {
                            isDebugging && console.error(`Something went wrong.`);
                            self.popoutElem.show('Probleme cu serverul. Se va rezolva in curand', 'danger');
                        }
                    }
                }
            );
        }
    }

    onFormSubmit() {
        console.log(this.state);

        if (this.isInvite) {
            // Check if the passwords are the same
            if (this.state.pass !== this.state.passAgain) {
                this.popoutElem.show('Parolele nu sunt la fel', 'danger');
                return;
            }
        }

        if (this.isInvite) var sendingData = { realName: this.state.pass, pass: this.state.pass, invite: this.props.match.params.invite };
        else               var sendingData = { user: this.state.user, pass: this.state.pass };

        const self = this;
        AjaxUtils.request('POST', (this.isInvite) ? '/register_from_invite' : '/login', sendingData,
            (data) => {
                isDebugging && console.log((self.isInvite) ? '/register_from_invite' : '/login', 'data:', data);

                // If everything is ok then redirect to the given url
                if (data.status === true) {
                    var date = new Date();
                    self.cookies.set('loginUsername', self.state.user, {
                        expires: new Date(date.getFullYear() + 1, date.getMonth()),
                        overwrite: true,
                        path: '/login'
                    });

                    window.location.href = data.url;
                } else {
                    if (self.isInvite) {
                        if (data.error == -1 || data.error == -2) {
                            self.popoutElem.show('Invitatia nu este buna', 'danger');
                            return;
                        }
                    } else {
                        if (data.error == -1 || data.error == -2) {
                            self.popoutElem.show('Emailul sau parola incorecte', 'danger');
                            return;
                        }
                    }

                    isDebugging && console.error(`Something went wrong.`);
                    self.popoutElem.show('Probleme cu serverul. Se va rezolva in curand', 'danger');
                }
            }
        );
    }

    render() {
        var registerBlock = [];

        if (!this.isInvite) registerBlock.push(<input key="userInput" ref={e => this.userRef = e} type="text" placeholder="Email" value={this.state.user} onChange={(e) => { this.state.user = e.target.value; this.setState(this.state); }} required/>);
        else                registerBlock.push(<input key="realNameInput" type="text" placeholder="Nume" value={this.state.realName} onChange={(e) => { this.state.realName = e.target.value; this.setState(this.state); }} required/>);
        registerBlock.push(<input key="passInput" type="password" placeholder="Parola" value={this.state.pass} onChange={(e) => { this.state.pass = e.target.value; this.setState(this.state); }} required/>);
        if (this.isInvite) registerBlock.push(<input key="passAgainInput" type="password" placeholder="Parola inca o data" value={this.state.passAgain} onChange={(e) => { this.state.passAgain = e.target.value; this.setState(this.state); }} required/>);


        return (
            <div className="login">
                {/* <Popout ref={ e => this.popoutElem = e }/> */}
                <h1>{ this.state.title }</h1>
                <form id="loginForm" onSubmit={(e) => { e.preventDefault(); setTimeout(this.onFormSubmit, 200) }} autoComplete="new-password">
                    { registerBlock }
                    <button type="submit" className="btn btn-primary btn-block btn-large">{(this.isInvite) ? 'Inregistrare' : 'Login'}</button>
                </form>
            </div>
        );
    }
};

export default withRouter(LoginPage);
