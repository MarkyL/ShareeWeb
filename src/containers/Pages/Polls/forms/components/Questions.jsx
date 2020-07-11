import React from "react";
import { Button } from "reactstrap";

const Questions = ({
  sectionIndex, deleteSection, questions,
  addQuestion, changeQuestion, changeQuestionType,
  deleteQuestion, genericQuestionTypes, isGeneralPollTypeSelected
}) => {

  const components = questions.map(
    ({ question, type, name }, questionIndex) => {
      const questionId = `question_${sectionIndex}_${questionIndex}`;
      const genericQuestionTypesComponent = genericQuestionTypes.map((type, index) => {
        if (!isGeneralPollTypeSelected) {
          return (
            <option
              value={`GENERIC_${type.name}`}
              key={`generic_${type.name}_${index}`}>
              {type.name}
            </option>
          );
        }
      });

      let selectValue = type
      if (type === "GENERIC") {
        selectValue = `GENERIC_${name}`
      }

      return (
        <div key={questionId} className="form__form-group">
          <div className="form__form-group-field" style={{ height: 34}}>
            <input
              type="text"
              value={question}
              component="input"
              placeholder="שאלה"
              id={`${questionId}_text`}
              name={`${questionId}_text`}
              onChange={({ target }) => changeQuestion(sectionIndex, questionIndex, target.value)}
            />

            <select
              value={selectValue}
              id={`${questionId}_type`}
              name={`${questionId}_type`}
              style={{ marginRight: "20px" }}
              onChange={({ target }) => changeQuestionType(sectionIndex, questionIndex, target.value)}
            >
              <option value="BOOLEAN">כן/לא</option>
              <option value="TEXTUAL">טקסט חופשי</option>
              <option value="NUMERICAL">דירוג מספרי 1-5</option>
              {genericQuestionTypesComponent}
            </select>

            <Button
              size="sm"
              color="danger"
              onClick={() => deleteQuestion(sectionIndex, questionIndex)}
              style={{ marginRight: "20px", height: 35, width: 240}}
            >
              מחיקת שאלה
            </Button>
          </div>

        </div>
      )
    }
  ).filter(component => component);

  components.push(
    <React.Fragment>
    <div key="sectionActions" className="form__form-group-field">
      <Button size="sm" color="primary" onClick={() => addQuestion(sectionIndex)}>הוספת שאלה</Button>
      <Button size="sm" color="danger" onClick={() => deleteSection(sectionIndex)}>מחיקת סעיף</Button>
    </div>
    </React.Fragment>
  );

  return components;
}

export default Questions;
