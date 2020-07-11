import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import SignUpForm from './components/SignUpForm';
import { signUp } from '../../../services/authentication';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(userName, password, passwordConfirm) {
    if (!userName || !password || !passwordConfirm) {
      alert('נא למלא את כל השדות');
    } else if (password !== passwordConfirm) {
      alert('סיסמה לא תואמת');
    } else {
      signUp({ userName, password }, (error, user) => {
        if (error) {
          console.log(error);
          if (error.messageToClient === undefined) {
            alert("אופס, אנא נסה שוב מאוחר יותר");
          } else {
            alert(error.messageToClient);
          }

        } else {
          alert("המשתמש " + userName + " נוצר בהצלחה");
          if (localStorage.getItem("user")) {
                this.props.history.push("/dash/polls");
          }
        }
      });
    }
  }

  render() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "ADMIN") {
      this.props.history.push("/sign_in");
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
              <h4 className="account__subhead subhead">הוספת משתמש חדש</h4>
            </div>
            <SignUpForm onSubmit={this.onSubmit} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);
