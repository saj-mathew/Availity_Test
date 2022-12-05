import React, { Component} from 'react';
import './style.css'
export class Home extends Component {
  static displayName = Home.name;
    render() {
    return (
        <div className="form">
            <h2>Registration</h2>

            <div className="form-body">
                <div className="username">
                    <label className="form__label" >First Name </label>
                    <input className="form__input" type="text" id="firstName" placeholder="First Name" />
                </div>
                <div className="lastname">
                    <label className="form__label" >Last Name </label>
                    <input type="text" name="" id="lastName" className="form__input" placeholder="LastName" />
                </div>
                <div className="lastname">
                    <label className="form__label" >NPI Number </label>
                    <input type="text" id="npinumber" className="form__input" placeholder="NPI Number" />
                </div>
                <div className="password">
                    <label className="form__label" >Business Address </label>
                    <textarea className="form__input" rows="6" type="text" id="businessaddress" placeholder="Business Address" />
                </div>
                <div className="confirm-password">
                    <label className="form__label" >Telephone Number </label>
                    <input className="form__input" type="tel" id="phone" placeholder="Telephone Number" />
                </div>
                <div className="email">
                    <label className="form__label" >Email Address </label>
                    <input type="email" id="email" className="form__input" placeholder="email" />
                </div>
            </div>
            <div class="footer">
                <button type="submit" class="btn">Register</button>
            </div>
        </div>      
    );
  }
}
