import React, { PureComponent } from "react";
import { Button, ButtonToolbar } from "reactstrap";
import { reduxForm } from 'redux-form';
import { getAllExercisesTypes } from '../../../../services/exercises';
import ExerciseComponent from '../components/ExerciseComponent';

class ExerciseForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        exerciseTypes: [],
        exercises: [], exercisesCount: 0,
        name: "", userId: "", patient: ""
    };

    this.addExercise = this.addExercise.bind(this);
    this.deleteExercise = this.deleteExercise.bind(this);

    this.changeType = this.changeType.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.setUrl = this.setUrl.bind(this);
  }

  componentDidMount() {
    const data = this.props.data;
    const patient = this.props.patient;

    getAllExercisesTypes((errorMessage, exerciseTypes) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        this.setState({ exerciseTypes, patient });
      }
    });

    if (data) {
        console.log("componentDidMount with data = ", data);
        const name = data.name;

        const exercises = this.props.data.exercises;
        const exercisesCount = exercises.length;

        const userId = data.userId;
        console.log("exercises = ", exercises);

        this.setState({ name, exercises, exercisesCount, userId, patient });
    }
  };

  addExercise() {
    const exercises = [...this.state.exercises];
    const exercisesCount = this.state.exercisesCount + 1;

    exercises.push({ description: "", url: "" });

    this.setState({ exercises, exercisesCount });
  };

  deleteExercise(exerciseIndex) {
    const exercises = [...this.state.exercises];
    const exercisesCount = this.state.exercisesCount - 1;

    exercises.splice(exerciseIndex, 1);

    this.setState({ exercises, exercisesCount });
  };

  changeType(event) {
    this.setState({ name: event.target.value});
  };

  setDescription(exerciseIndex, value) {
    const exercises = [...this.state.exercises];
    exercises[exerciseIndex].description = value;

    this.setState({ exercises });
  };

  setUrl(exerciseIndex, value) {
    const exercises = [...this.state.exercises];
    exercises[exerciseIndex].url = value;

    this.setState({ exercises });
  };

  render() {
    const { exerciseTypes, exercises, name, patient } = this.state;
    const { onSubmit, onReturn, data, mode } = this.props;

    // verify if submit button should be enabled.
    var submitDisabled = false;
    if (name !== "" && exercises.length > 0) {
      exercises.forEach(function(exercise) {
        if (exercise.description === "") {
          submitDisabled = true
          return;
        }
      });
    } else { submitDisabled = true; }

    const typesComponent = exerciseTypes.map((type, index) => {
      return (
        <option
          defaultValue={type.type}
          key={`${type}_${index}`}
          selected={data && data.type === type.type}>
          {type.type}
        </option>
      );
    });

    return (
    <div style={{ width: "100%" }}>
      <Button
          size="sm" color="secondary" onClick={onReturn} style={{ float: "right", marginLeft: "10%" }}>
          לחזור למטופל{patient.name}
      </Button>

      <form className="form form--horizontal form__half" onSubmit={onSubmit}>
      <h4 className="bold-text">פעילות למטופל {patient.phoneNumber}</h4><br/><br/><br/>

        <div className="form__form-group">
          <span className="form__form-group-label"><b>סוג:</b></span>
          <div className="form__form-group-field" style={{ width: "60%" }}>
            <select id="type" name="type" className="react-select" onChange={this.changeType} value={name}>
              <option value='' />
              {typesComponent}
            </select>
          </div>
        </div>

        <ExerciseComponent
          exercises={exercises}
          deleteExercise={e => this.deleteExercise(e)}
          setDescription={(exerciseIndex, value) => this.setDescription(exerciseIndex, value)}
          setUrl={e => this.setUrl(e)}
        />

         <ButtonToolbar className="form__button-toolbar wizard__toolbar">
             <Button size="sm" color="primary" onClick={e => this.addExercise()}>הוספת תרגיל</Button>
             <Button size="sm" color="success" type="submit" disabled={submitDisabled}>
                {mode === "createExercise" && "יצירת פעילות"}
                {mode === "editExercise" && "עדכון פעילות"}
             </Button>
          </ButtonToolbar>
      </form>
    </div>
    );
  }
}

export default reduxForm({ form: 'exercise_form'})(ExerciseForm);
