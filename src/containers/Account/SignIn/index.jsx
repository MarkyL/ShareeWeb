/* eslint-disable */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import SignInForm from './components/SignInForm';
import { signIn } from '../../../services/authentication';
import { openSession } from '../../../utilities/authentication';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(userName, password) {
    signIn({ userName, password }, (error, user) => {
      if (error) {
        console.log(error);
        if (error.messageToClient === undefined) {
          alert("אופס, אנא נסה שוב מאוחר יותר");
        } else {
          alert(error.messageToClient);
        }
      } else {
        localStorage.setItem("user", JSON.stringify({
          role: user.role,
          username: user.userName
        }));

        openSession();
        this.props.history.push("/dash/polls");
      }
    });
  }

  render() {
    if (localStorage.getItem("user")) {
      this.props.history.push("/dash/polls");
    }

    return (
      <div className="account">
        <div className="account__wrapper">
          <div className="account__card">
            <div className="account__head">
              <h3 className="account__title">מערכת ניהול
                <span className="account__logo"> Sharee-
                  <span className="account__logo-accent">Web</span>
                </span>
              </h3>
              <h4 className="account__subhead subhead">כניסה למערכת</h4>
            </div>
            <SignInForm onSubmit={this.onSubmit} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignIn);
