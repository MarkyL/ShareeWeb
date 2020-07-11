/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class SignOut extends Component {
  render() {
    localStorage.removeItem("user");
    localStorage.removeItem("last-action");

    return (<Redirect to="/sign_in" />);
  }
}

export default SignOut;
