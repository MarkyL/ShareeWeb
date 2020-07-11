import React from "react";
import { Button } from "reactstrap";
import Moment from "moment";
import TimePicker from '../../../../../shared/components/form/TimePicker';

const Activities = ({
  isWeekDay, deleteActivity, activities, addActivity, changeActivityDescription, changeTime
}) => {
  const components = activities.map(
    ({ activityDescription, startTime, endTime }, activityIndex) => {
      const activityId = `activity_${activityIndex}`;
      const timeFormat = 'HH:mm';
      const activityType = isWeekDay ? "weekdayActivities" : "weekendActivities";

      return (
        <div key={activityId} className="form__form-group" style={{ marginTop: "20px", marginBottom: "20px" }}>
          <div className="form__form-group-field" style={{ height: 34 }}>
            <input
              type="text"
              value={activityDescription}
              component="input"
              placeholder="תיאור פעילות..."
              id={`activityDescription_${activityType}_${activityIndex}`}
              name={`activityDescription_${activityType}_${activityIndex}`}
              onChange={({ target }) => changeActivityDescription(activityIndex, target.value)}
            />
          </div>

          <div className="form__form-group-field" style={{ height: 34}}>
              <span className="form__form-group-label"><b>שעת התחלה:</b></span>
              <div className="form__form-group-field" style={{ width: 300}}>
                 <TimePicker
                    name={`activityTime_Start_${activityType}_${activityIndex}`}
                    onChange={( target ) => changeTime(true, activityIndex, Moment(target).format(timeFormat))}
                    defaultValue={Moment(startTime, 'HH:mm')}
                  />
              </div>
          </div>

          <div className="form__form-group-field" style={{ height: 34}}>
               <span className="form__form-group-label"><b>שעת סיום:</b></span>
               <div className="form__form-group-field" style={{ width: 300}}>
                  <TimePicker
                    name={`activityTime_End_${activityType}_${activityIndex}`}
                    onChange={( target ) => changeTime(false, activityIndex, Moment(target).format(timeFormat))}
                    defaultValue={Moment(endTime, 'HH:mm')}
                  />
               </div>
          </div>

          <br/><br/><br/>
          <div className="form__form-group-field">
            <Button
              size="sm"
              color="danger"
              onClick={() => deleteActivity(activityIndex)}
            >
              מחיקת פעילות
            </Button>
          </div>
        </div>
      )
    }
  ).filter(component => component);

  return components;
}

export default Activities;
