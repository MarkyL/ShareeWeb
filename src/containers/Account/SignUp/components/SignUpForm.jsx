import React, { PureComponent } from 'react';

import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';

class SignUpForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      passwordConfirm: "",
      showPassword: false,
      showPasswordConfirm: false,
      disableSubmitButton: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.showPassword = this.showPassword.bind(this);
    this.showPasswordConfirm = this.showPasswordConfirm.bind(this);
    this.disableSubmitButton = this.disableSubmitButton.bind(this);
  }

  onFieldChange({ target }) {
    this.setState({ [target.id]: target.value });
  }

  showPassword() {
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  }

  showPasswordConfirm() {
    this.setState(prevState => ({ showPasswordConfirm: !prevState.showPasswordConfirm }));
  }

  disableSubmitButton() {
    this.setState(prevState => ({ disableSubmitButton: !prevState.disableSubmitButton }));
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.username, this.state.password, this.state.passwordConfirm);
  }

  render() {
    const {
      username,
      password,
      passwordConfirm,
      showPassword,
      showPasswordConfirm,
      disableSubmitButton
    } = this.state;

    return (
      <form className="form" onSubmit={this.onSubmit}>
        {/* Email Field */}
        <div className="form__form-group">
          <span className="form__form-group-label">שם משתמש:</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon"><AccountOutlineIcon /></div>
            <input
              type="text"
              id="username"
              name="username"
              defaultValue={username}
              placeholder="הכנס שם משתמש"
              onChange={this.onFieldChange}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="form__form-group form__form-group--forgot">
          <span className="form__form-group-label">סיסמא:</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon"><KeyVariantIcon /></div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="הכנס סיסמה"
              defaultValue={password}
              onChange={this.onFieldChange}
            />
            <button
              type="button"
              onClick={this.showPassword}
              className={`form__form-group-button${showPassword ? ' active' : ''}`}
            >
              <EyeIcon />
            </button>
          </div>
        </div>

        {/* Repeat Password Field */}
        <div className="form__form-group form__form-group--forgot">
          <div className="form__form-group-field">
            <div className="form__form-group-icon"><KeyVariantIcon /></div>
            <input
              type={showPasswordConfirm ? "text" : "password"}
              id="passwordConfirm"
              name="passwordConfirm"
              placeholder="הכנס סיסמה עוד פעם"
              defaultValue={passwordConfirm}
              onChange={this.onFieldChange}
            />
            <button
              type="button"
              onClick={this.showPasswordConfirm}
              className={`form__form-group-button${showPasswordConfirm ? ' active' : ''}`}
            >
              <EyeIcon />
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="account__btns" style={{ marginTop: "10px" }}>
          <button
            type="submit"
            disabled={disableSubmitButton}
            className="btn btn-primary account__btn"
          >
            צור משתמש חדש
          </button>
        </div>
      </form>
    );
  }
}

export default SignUpForm;
