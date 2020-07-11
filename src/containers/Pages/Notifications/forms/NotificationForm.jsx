import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { Button, ButtonToolbar } from "reactstrap";

import TimePicker from "../../../../shared/components/form/TimePicker";
import Moment from "moment";

class NotificationForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: props && props.notification ? props.notification.title : "",
      body: props && props.notification ? props.notification.body : "",
      time: props && props.notification ? props.notification.time : "12:00",
      weekdays: props && props.notification ? props.notification.weekdays : true,
      id: props && props.notification.id
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onWeekendChange = this.onWeekendChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }

  onFieldChange({ target }) {
    this.setState({ [target.id]: target.value });
  }

  onTimeChange(time) {
    this.setState({ time: Moment(time._d).format("HH:mm") });
  }

  onWeekendChange() {
    this.setState({ weekdays: !this.state.weekdays });
  }

  render() {
    const { mode, onReturn } = this.props;
    const { title, body, time, weekdays } = this.state;
    const submitDisabled = ![title, body, time].includes("") ? false : true;

    return (
      <div className="wizard">
        <div className="wizard__form-wrapper">
          <div style={{ width: "100%" }}>
            <Button
              size="sm" color="secondary" onClick={onReturn} style={{ float: "right", marginLeft: "10%" }}
            >
              לחזור להודעות מתוזמנות
            </Button>

            <form className="form form--horizontal form__half" onSubmit={this.onSubmit}>
              <h4 className="wizard__title">
                <b>
                {mode === "create" && "הודעה מתוזמנת חדשה"}
                {mode === "edit" && "עדכון הודעה מתוזמנת"}
                </b>
              </h4>

              <div className="form__form-group">
                <span className="form__form-group-label"><b>כותרת:</b></span>
                <div className="form__form-group-field">
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="כותרת"
                    defaultValue={title}
                    onChange={this.onFieldChange}
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label"><b>הודעה:</b></span>
                <div className="form__form-group-field">
                  <textarea
                    id="body"
                    name="body"
                    placeholder="הודעה"
                    defaultValue={body}
                    onChange={this.onFieldChange}
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label"><b>שעה:</b></span>
                <div className="form__form-group-field">
                  <TimePicker
                    id="time"
                    name="time"
                    format="HH:mm"
                    onChange={this.onTimeChange}
                    defaultValue={Moment(time, "HH:mm")}
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label"><b>סופ״ש:</b></span>
                <div className="form__form-group-field" style={{ display: "flex" }}>
                  <input
                    id="weekend"
                    name="weekend"
                    type="checkbox"
                    checked={!weekdays}
                    style={{ flex: "0 0 5%" }}
                    onChange={this.onWeekendChange}
                    onClick={this.onWeekendChange}
                  />
                </div>
              </div>
              <ButtonToolbar className="form__button-toolbar wizard__toolbar">
                { mode === "create" && <Button size="sm" color="primary" type="submit" disabled={submitDisabled}>צור הודעה מתוזמנת</Button> }
                { mode === "edit" && <Button size="sm" color="primary" type="submit" disabled={submitDisabled}>עדכון הודעה מתוזמנת</Button> }
              </ButtonToolbar>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NotificationForm);
