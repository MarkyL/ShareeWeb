import React from "react";
import { Button } from "reactstrap";

const ExerciseComponent = ({
  exercises, deleteExercise, setDescription, setUrl //, addQuestion, changeQuestion, changeQuestionType, deleteQuestion
}) => {
  const components = exercises.map(
    (exercise, exerciseIndex) => {
      const exerciseId = `exercise_${exerciseIndex}`;

      return (
        <div key={exerciseId} className="form__form-group" style={{ marginTop: "20px", marginBottom: "20px" }}>
          <span className="form__form-group-label"><b>פעילות {exerciseIndex + 1}:</b></span>

          <div key={`description_${exerciseId}`} className="form__form-group-field" style={{ width: "60%" }}>
            <input
              type="text"
              placeholder="תיאור הפעילות"
              value={exercise.description}
              id={`description_${exerciseId}`}
              name={`description_${exerciseId}`}
              onChange={({ target }) => setDescription(exerciseIndex, target.value)}
            />
          </div>
          <br/><br/><br/>
          <div key={`url_${exerciseId}`} className="form__form-group-field" style={{ width: "60%" }}>
            <input
              type="text"
              placeholder="קישור"
              value={exercise.url}
              id={`url_${exerciseId}`}
              name={`url_${exerciseId}`}
              onChange={({ target }) => setUrl(exerciseIndex, target.value)}
            />
          </div>

          <br/><br/><br/>
          <div className="form__form-group-field">
            <Button
              size="sm"
              color="danger"
              onClick={() => deleteExercise(exerciseIndex)}>
              מחיקת תרגיל
            </Button>
          </div>
        </div>
      )
    }
  );

  return components;
}

export default ExerciseComponent;
