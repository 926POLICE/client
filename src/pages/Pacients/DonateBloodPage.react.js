import React from 'react';
import { withRouter } from 'react-router-dom';

import LibraryLoader from 'utils/LibraryLoader'
import AjaxUtils from 'utils/AjaxUtils.js';
import PacientSettingsPageReact from './PacientSettingsPage.react';
import RegisterPage from './RegisterPage.react.js'

class DonateBloodPage extends React.Component {
    constructor(props) {
        super(props);
        var props = {
            firstName: "",
            lastName: "",
            day: "",
            month: "",
            year: "",
            address: "",
            city_town: "",
            country: "",
            residence_address: "",
            residence_city_town: "",
            residence_country: "",
        }
        this.state = {
            firstName: "",
            lastName: "",
            day: "",
            month: "",
            year: "",
            address: "",
            city_town: "",
            country: "",
            residence_address: "",
            residence_city_town: "",
            residence_country: "",
        }

        this.handleSubmitButton = this.handleSubmitButton.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.handleMonthChange = this.handleMonthChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleCityTownChange = this.handleCityTownChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleResidenceAddressChange = this.handleResidenceAddressChange.bind(this);
        this.handleResidenceCityTownChange = this.handleResidenceCityTownChange.bind(this);
        this.handleResidenceCountryChange = this.handleResidenceCountryChange.bind(this);

    }



    componentDidMount() {
        const self = this;
    }


    render() {
        return (
            <div id="mainCnt">
                <div id="title">DONATE</div>
                <form id="submitForm" onSubmit={this.handleSubmitButton}>

                    <label>
                        First name:
    <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleFirstNameChange} />
                    </label>
                    <br></br>
                    <label>
                        Last name:
    <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleLastNameChange} />
                    </label>
                    <br></br>
                    <label>Date of birth</label><br></br>
                    <label>
                        day
    <input type="text" name="day" value={this.state.day} onChange={this.handleDayChange} />
                    </label>
                    <label>
                        /month
    <input type="text" name="month" value={this.state.month} onChange={this.handleMonthChange} />
                    </label>
                    <label>
                        /year
    <input type="text" name="year" value={this.state.year} onChange={this.handleYearChange} />
                    </label>
                    <label>
                        Address:
    <input type="text" name="address" value={this.state.address} onChange={this.handleAddressChange} />
                    </label>
                    <br></br>
                    <label>(address from ID card)</label>
                    <br></br>
                    <label>
                        City/Town:
    <input type="text" name="city_town" value={this.state.city_town} onChange={this.handleCityTownChange} />
                    </label>
                    <label>
                        Country:
    <input type="text" name="country" value={this.state.country} onChange={this.handleCountryChange} />
                    </label>
                    <br></br>
                    <label>
                        Residence:
    <input type="text" name="residence_address" value={this.state.residence_address} onChange={this.handleResidenceAddressChange} />
                    </label>
                    <br></br>
                    <label>
                        (if you live at another address than in your ID card)
</label>
                    <br></br>
                    <label>
                        City/Town:
    <input type="text" name="residence_city_town" value={this.state.residence_city_town} onChange={this.handleResidenceCityTownChange} />
                    </label>
                    <label>
                        Country:
    <input type="text" name="residence_country" value={this.state.residence_country} onChange={this.handleResidenceCountryChange} />
                    </label>
                    <br></br>
                    {/*<button name="submitButton" value="Submit"></button>*/}
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );


    }

    handleFirstNameChange(event) {
        this.setState({ firstName: event.target.value });
    }

    handleLastNameChange(event) {
        this.setState({ lastName: event.target.value });
    };


    handleDayChange(event) {
        this.setState({ day: event.target.value });
    }

    handleMonthChange(event) {
        this.setState({ month: event.target.value });
    }

    handleYearChange(event) {
        this.setState({ year: event.target.value });
    }

    handleAddressChange(event) {
        this.setState({ address: event.target.value });
    }

    handleCityTownChange(event) {
        this.setState({ city_town: event.target.value });
    }

    handleCountryChange(event) {
        this.setState({ country: event.target.value });
    }

    handleResidenceAddressChange(event) {
        this.setState({ residence_address: event.target.value });
    }

    handleResidenceCityTownChange(event) {
        this.setState({ residence_city_town: event.target.value });
    }

    handleResidenceCountryChange(event) {
        this.setState({ residence_country: event.target.value });
    }

    handleSubmitButton(event) {
        console.log('handling submit button ' +
            this.state.firstName + ' ' +
            this.state.lastName + ' ' +
            this.state.day + ' ' +
            this.state.month + ' ' +
            this.state.year + ' ' +
            this.state.address + ' ' +
            this.state.city_town + ' ' +
            this.state.country + ' ' +
            this.state.residence_address + ' ' +
            this.state.residence_city_town + ' ' +
            this.state.residence_country
        );

        AjaxUtils.request('POST', '/api/donations', {
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                day: this.state.day,
                month: this.state.month,
                year: this.state.year,
                address: this.state.address,
                city_town: this.state.city_town,
                country: this.state.country,
                residence_address: this.state.residence_address,
                residence_city_town: this.state.residence_city_town,
                residence_country: this.state.residence_country
            })
        })

        event.preventDefault();
    }
};

export default withRouter(DonateBloodPage);
