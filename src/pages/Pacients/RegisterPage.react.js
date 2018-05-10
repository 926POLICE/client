import React from 'react';
import { withRouter } from 'react-router-dom';



const RegisterPage = () => {
    (<form id="submitForm" onSubmit={this.handleSubmitButton}>
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
    </form>);
};

export default withRouter(RegisterPage);
