import React from "react";

import Questions from './Questions';

const Sections = ({
  sections, deleteSection, addQuestion, changeQuestion, changeQuestionType, deleteQuestion, genericQuestionTypes, isGeneralPollTypeSelected
}) => {

  const components = sections.map(
    (section, sectionIndex) => {
      const sectionId = `section_${sectionIndex}`;

      return (
        <div key={sectionId} className="form__form-group" style={{ marginTop: "20px", marginBottom: "20px" }}>
          <span className="form__form-group-label"><b>סעיף {sectionIndex + 1}:</b></span>

          <div key={`n_${sectionId}`} className="form__form-group-field">
            <input
              type="text"
              placeholder="שם הסעיף"
              defaultValue={section.name}
              id={`section_name_${sectionIndex}`}
              name={`section_name_${sectionIndex}`}
            />
          </div>

          <div key={`q_${sectionId}`} className="form__form-group" style={{ marginTop: "10px", marginBottom: "10px" }}>
            <Questions
              sectionIndex={sectionIndex}
              questions={section.questions}
              addQuestion={addQuestion}
              changeQuestion={changeQuestion}
              changeQuestionType={changeQuestionType}
              deleteQuestion={deleteQuestion}
              deleteSection={deleteSection}
              genericQuestionTypes={genericQuestionTypes}
              isGeneralPollTypeSelected={isGeneralPollTypeSelected}
            />
          </div>
        </div>
      )
    }
  );

  return components;
}

export default Sections;
