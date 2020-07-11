import React, { PureComponent } from 'react';

import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';

class SignInForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showPassword: false,
      disableSubmitButton: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.showPassword = this.showPassword.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
  }

  showPassword() {
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  }

  onFieldChange({ target }) {
    this.setState({ [target.id]: target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.username, this.state.password);
  }

  render() {
    const { username, password, showPassword } = this.state;

    return (
      <form className="form" onSubmit={this.onSubmit}>
        {/* Username Field */}
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
        <div className="form__form-group">
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
              onClick={e => this.showPassword(e)}
              className={`form__form-group-button${showPassword ? " active" : ""}`}
            >
              <EyeIcon />
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="account__btns" style={{ marginTop: "10px" }}>
          <button type="submit" className="btn btn-primary account__btn">
            התחבר
          </button>
        </div>
      </form>
    );
  }
}

export default SignInForm;
