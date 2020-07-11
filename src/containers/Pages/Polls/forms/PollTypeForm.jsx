import React, { PureComponent } from "react";
import { Button, ButtonToolbar } from "reactstrap";

class NewPollForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { title: "", subType: "General" };

    this.onSubmit = this.onSubmit.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onSubTypeChange = this.onSubTypeChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(this.state.title, this.state.subType);
  }

  onTitleChange({ target }) {
    this.setState({ title: target.value });
  }

  onSubTypeChange({ target }) {
    this.setState({ subType: target.value });
  }

  render() {
    const { title } = this.state;

    const submitDisabled = title !== "" ? false : true;

    return (
      <form className="form form--horizontal form__half" onSubmit={this.onSubmit}>
        <h4 className="wizard__title"><b>סוג סקר חדש</b></h4>

        <div className="form__form-group">
          <span className="form__form-group-label"><b>סוג:</b></span>
          <div className="form__form-group-field">
            <select id="type" name="type" className="react-select" onChange={this.onSubTypeChange}>
              <option value="General">General</option>
              <option value="Medical">Medical</option>
            </select>
          </div>
        </div>

        <div className="form__form-group">
          <span className="form__form-group-label"><b>תת סוג:</b></span>
          <div className="form__form-group-field">
            <input type="text" id="name" name="name" placeholder="כותרת" onChange={this.onTitleChange} />
          </div>
        </div>

        <ButtonToolbar className="form__button-toolbar wizard__toolbar">
          <Button size="sm" color="primary" type="submit" disabled={submitDisabled}>שמירה</Button>
        </ButtonToolbar>
      </form>
    );
  }
}

export default NewPollForm;
