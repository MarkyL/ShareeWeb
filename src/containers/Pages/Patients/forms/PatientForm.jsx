import React, { PureComponent } from "react";
import { withRouter } from 'react-router-dom';
import { Button, ButtonToolbar } from "reactstrap";

class PatientForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { phone: "" };

    this.onSubmit = this.onSubmit.bind(this);
    this.onPhoneChange = this.onPhoneChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(this.state.phone);
  }

  onPhoneChange({ target }) {
    this.setState({ phone: target.value });
  }

  render() {
    const { phone } = this.state;
    const { onReturn } = this.props;

    const submitDisabled = phone !== "" ? false : true;

    return (
      <div className="wizard">
        <div className="wizard__form-wrapper">
          <div style={{ width: "100%" }}>
            <Button
              size="sm" color="secondary" onClick={onReturn} style={{ float: "right", marginLeft: "10%" }}
            >
              לחזור לרשימת המטופלים
            </Button>

            <form className="form form--horizontal form__half" onSubmit={this.onSubmit}>
              <h4 className="wizard__title"><b>מטופל חדש</b></h4>

              <div className="form__form-group">
                <span className="form__form-group-label"><b>מ״ס טלפון:</b></span>
                <div className="form__form-group-field">
                  <input type="text" id="phone" name="phone" placeholder="מ״ס טלפון" onChange={this.onPhoneChange} />
                </div>
              </div>

              <ButtonToolbar className="form__button-toolbar wizard__toolbar">
                <Button size="sm" color="primary" type="submit" disabled={submitDisabled}>יצירת מטופל חדש</Button>
              </ButtonToolbar>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PatientForm);
