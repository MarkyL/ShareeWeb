import React from "react";
import { Button } from "reactstrap";

const Questions = ({
  deleteQuestion, answersData, addQuestion, changeQuestionDescription
}) => {

  const components = answersData.map(
    ( answer, questionIndex) => {
      const questionId = `question_${questionIndex}`;

      return (
        <div key={questionId} className="form__form-group" style={{ marginTop: "20px", marginBottom: "20px" }}>
          <div className="form__form-group-field" style={{ height: 34 }}>
            <input
              type="text"
              value={answer}
              component="input"
              placeholder="תשובה אפשרית..."
              id={`questionDescription_${questionIndex}`}
              onChange={({ target }) => changeQuestionDescription(questionIndex, target.value)}
            />
          </div>

          <br/><br/><br/>
          <div className="form__form-group-field">
            <Button
              size="sm"
              color="danger"
              onClick={() => deleteQuestion(questionIndex)}>
              מחיקת תשובה אפשרית
            </Button>
          </div>
        </div>
      )
    }
  ).filter(component => component);

  return components;
}

export default Questions;
