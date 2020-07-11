import React, { PureComponent } from "react";
import { Button, ButtonToolbar } from "reactstrap";
import { reduxForm } from 'redux-form';
import Activities from './components/Activities';

const isWeekDay = true

class RoutinesForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        name: "",
        weekdayActivities: [], weekdayActivitiesCount: 0,
        weekendActivities: [], weekendActivitiesCount: 0,
        mode: "show"
    };

    this.addActivity = this.addActivity.bind(this)
    this.deleteActivity = this.deleteActivity.bind(this)
    this.changeActivityDescription = this.changeActivityDescription.bind(this)
    this.changeTime = this.changeTime.bind(this)
    this.changeName = this.changeName.bind(this)
  }

  componentDidMount() {
    const data = this.props.data;

    if (data) {
        const name = data.name;

        const weekdayActivities = this.props.data.weekdayActivities;//data.weekdayActivities;
        const weekdayActivitiesCount = weekdayActivities.length;

        const weekendActivities = data.weekendActivities;
        const weekendActivitiesCount = weekendActivities.length;
        this.setState({ name, weekdayActivities, weekdayActivitiesCount, weekendActivities, weekendActivitiesCount });
    }
  };

  changeName(name) {
    this.setState({ name })
  }

  addActivity(isWeekDay) {
    if (isWeekDay) {
        const weekdayActivities = [...this.state.weekdayActivities];
        const weekdayActivitiesCount = this.state.weekdayActivitiesCount + 1;

        weekdayActivities.push({ activityDescription: "", startTime: "00:00", endTime: "00:00" });

        this.setState({ weekdayActivities, weekdayActivitiesCount });
    } else {
        const weekendActivities = [...this.state.weekendActivities];
        const weekendActivitiesCount = this.state.weekendActivitiesCount + 1;

        weekendActivities.push({ activityDescription: "", startTime: "00:00", endTime: "00:00" });

        this.setState({ weekendActivities, weekendActivitiesCount });
    }
  }

  deleteActivity(isWeekDay, activityIndex) {
    if (isWeekDay) {
      const weekdayActivities = [...this.state.weekdayActivities];
      const weekdayActivitiesCount = this.state.weekdayActivitiesCount - 1;

      weekdayActivities.splice(activityIndex, 1);

      this.setState({ weekdayActivities, weekdayActivitiesCount });
    } else {
      const weekendActivities = [...this.state.weekendActivities];
      const weekendActivitiesCount = this.state.weekendActivitiesCount - 1;

      weekendActivities.splice(activityIndex, 1);

      this.setState({ weekendActivities, weekendActivitiesCount });
    }
  }

  changeActivityDescription(isWeekDay, activityIndex, value) {
    if (isWeekDay) {
       const weekdayActivities = [...this.state.weekdayActivities];
       weekdayActivities[activityIndex].activityDescription = value;

       this.setState({ weekdayActivities })
    } else {
       const weekendActivities = [...this.state.weekendActivities];
       weekendActivities[activityIndex].activityDescription = value;

       this.setState({ weekendActivities })
    }
  }

  changeTime(isWeekDay, isStartTime, activityIndex, value) {
    if (isWeekDay) {
      const weekdayActivities = [...this.state.weekdayActivities]
      if (isStartTime) {
        weekdayActivities[activityIndex].startTime = value
      } else {
        weekdayActivities[activityIndex].endTime = value
      }
      this.setState({ weekdayActivities })
    } else {
      const weekendActivities = [...this.state.weekendActivities]
      if (isStartTime) {
        weekendActivities[activityIndex].startTime = value
      } else {
        weekendActivities[activityIndex].endTime = value
      }
      this.setState({ weekendActivities })
    }
  }

  render() {
    const { name, weekdayActivities, weekendActivities } = this.state;
    const { onSubmit, onReturn, data, mode } = this.props;

    const submitDisabled = name !== "" ? false : true;

    return (
    <div>
      <Button
          size="sm" color="secondary" onClick={onReturn} style={{ float: "right", marginLeft: "10%" }}>
          לחזור לרשימת סדרי יום
      </Button>

      <form className="form form--horizontal form__half" onSubmit={onSubmit}>
        <h4 className="wizard__title"><b>סדר יום מטופל</b></h4>

        <div className="form__form-group">
            <span className="form__form-group-label"><b>כותרת:</b></span>
            <div className="form__form-group-field">
              <input type="text" id="name" name="name" placeholder="כותרת" defaultValue={data && data.name}
                  onChange={({ target }) => this.changeName(target.value)} />
            </div>
        </div>

        <div className="form__form-group">
          <span className="form__form-group-label"><b>סוג:</b></span>
          <div className="form__form-group-field">
            <span className="form__form-group-label"><b>פעילויות יום חול</b></span>
          </div>
        </div>

        <Activities
            isWeekDay={isWeekDay}
            activities={weekdayActivities}
            deleteActivity={e => this.deleteActivity(isWeekDay, e)}
            changeActivityDescription={(isStartTime, index, value) => { this.changeActivityDescription(isWeekDay, isStartTime, index, value)} }
            changeTime={(isStartTime, index, value) => this.changeTime(isWeekDay, isStartTime, index, value)}
           />

        <ButtonToolbar className="form__button-toolbar wizard__toolbar">
            <Button size="sm" color="primary" onClick={e => this.addActivity(isWeekDay)}>הוספת פעילות יום חול</Button>
         </ButtonToolbar>

         <div className="form__form-group">
           <span className="form__form-group-label"><b>סוג:</b></span>
           <div className="form__form-group-field">
             <span className="form__form-group-label"><b>פעילויות סוף שבוע</b></span>
           </div>
         </div>

         <Activities
           isWeekDay={!isWeekDay}
           activities={weekendActivities}
           deleteActivity={e => this.deleteActivity(!isWeekDay, e)}
           changeActivityDescription={(isStartTime, index, value) => this.changeActivityDescription(!isWeekDay, isStartTime, index, value)}
           changeTime={(isStartTime, index, value) => this.changeTime(!isWeekDay, isStartTime, index, value)}
         />

         <ButtonToolbar className="form__button-toolbar wizard__toolbar">
             <Button size="sm" color="primary" onClick={e => this.addActivity(!isWeekDay)}>הוספת פעילות סוף שבוע</Button>
             <Button size="sm" color="success" type="submit" disabled={submitDisabled}>
               {mode === "create" && "יצירת סדר יום"}
               {mode === "edit" && "עדכון סדר יום"}
             </Button>
          </ButtonToolbar>
      </form>
    </div>
    );
  }
}

export default reduxForm({ form: 'routines_form'})(RoutinesForm);
