import React, { PureComponent } from "react";
import { withRouter } from 'react-router-dom';
import { Button, ButtonToolbar } from "reactstrap";

import Sections from './components/Sections';
import { getAllPollTypes } from '../../../../services/polls';

import { getAllGenericQuestions } from "../../../../services/genericQuestions";

class PollForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      types: [],
      sections: [],
      sectionsCount: 0,
      questionsCount: 0,
      genericQuestionTypes: [],
      isGeneralPollSelected: true
    };

    this.addSection = this.addSection.bind(this);
    this.deleteSection = this.deleteSection.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);
    this.changeQuestionType = this.changeQuestionType.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);

    this.changeType = this.changeType.bind(this);
  }

  componentDidMount() {
    const data = this.props.data;

    getAllPollTypes((error, types) => {
      if (error) {
        console.log(error);
        if (error.messageToClient === undefined) {
          alert("אופס, אנא נסה שוב מאוחר יותר");
        } else {
          alert(error.messageToClient);
        }

      } else {
        console.log("getAllPollTypes types = ", types);
        this.setState({ types });
      }
    });

    getAllGenericQuestions((errorMessage, genericQuestionTypes) => {
          if (errorMessage) {
            console.log(errorMessage);
          } else {
            this.setState({ genericQuestionTypes, mode: "show" });
          }
    });

    if (data) {

      const sectionsCount = data.pollSections.length;
      const questionsCount = data.pollSections.map(s => s.questions.length).reduce((a, b) => a + b);

      this.setState({ sectionsCount, questionsCount,
                      sections: this.props.data.pollSections,
                      isGeneralPollSelected: this.props.data.isGeneralPoll });

      let temp = this.props.data.pollSections;
      console.log("mark data = ", data);
    }
  }

  addSection() {
    const sections = [...this.state.sections];
    const sectionsCount = this.state.sectionsCount + 1;

    sections.push({ questions: [] });

    this.setState({ sections, sectionsCount });
  };

  deleteSection(sectionIndex) {
    const sections = [...this.state.sections];
    const sectionsCount = this.state.sectionsCount - 1;

    sections.splice(sectionIndex, 1);

    this.setState({ sections, sectionsCount });
  };

  addQuestion(sectionIndex) {
    const sections = [...this.state.sections];
    const questionsCount = this.state.questionsCount + 1;

    sections[sectionIndex].questions.push({ question: "", type: "BOOLEAN"  });

    this.setState({ sections, questionsCount });
  };

  changeQuestion(sectionIndex, questionId, value) {
    const sections = [...this.state.sections];
    
    sections[sectionIndex].questions[questionId].question = value;
    this.setState({ sections });
  }

  changeQuestionType(sectionIndex, questionId, value) {
    console.log("changeQuestionType - value = ", value);
    const sections = [...this.state.sections];
    
    sections[sectionIndex].questions[questionId].type = value;
    this.setState({ sections });
  }

  deleteQuestion(sectionIndex, questionIndex) {
    const sections = [...this.state.sections]
    const questionsCount = this.state.questionsCount - 1;

    sections[sectionIndex].questions.splice(questionIndex, 1);

    this.setState({ sections, questionsCount })
  };

  changeType(event) {
    this.setState({ isGeneralPollSelected: event.target.value === "GENERAL" });
  };

  render() {
    const { onSubmit, onReturn, data, mode } = this.props;
    const { sectionsCount, questionsCount, sections, types, genericQuestionTypes, isGeneralPollSelected } = this.state;

    const submitDisabled = sectionsCount > 0 && questionsCount > 0 ? false : true;

    const subtypesComponent = types.map((type, index) => {
      if (type.isGeneralPoll === isGeneralPollSelected) {
        return (
          <option
            defaultValue={type.type}
            key={`${type}_${index}`}
            selected={data && data.type === type.type}
            sub-type={type.isGeneralPoll ? "isGeneralPoll" : "isMedicalPoll"}>
            {type.type}
          </option>
        );
      }
    });

    return (
      <div style={{ width: "100%" }}>
        <Button
          size="sm" color="secondary" onClick={onReturn} style={{ float: "right", marginLeft: "10%" }}>
          לחזור לרשימת הסקרים
        </Button>

        <form className="form form--horizontal form__half" onSubmit={onSubmit}>
          <h4 className="wizard__title"><b>
            {mode === "create" && "יצירת סקר"}
            {mode === "edit" && "עדכון סקר"}
          </b></h4>

          <div className="form__form-group">
            <span className="form__form-group-label"><b>כותרת:</b></span>
            <div className="form__form-group-field">
              <input type="text" id="name" name="name" placeholder="כותרת" defaultValue={data && data.name} />
            </div>
          </div>

          <div className="form__form-group">
            <span className="form__form-group-label"><b>סוג:</b></span>
            <div className="form__form-group-field">
              <select id="type" name="type" className="react-select" onChange={this.changeType}>
                <option value="GENERAL">סקר כללי</option>
                <option value="MEDICAL" selected={isGeneralPollSelected === false}>שאלון רפואי</option>
              </select>
            </div>
          </div>

          <div className="form__form-group">
            <span className="form__form-group-label"><b>תת סוג:</b></span>
            <div className="form__form-group-field">
              <select id="subtype" name="subtype" className="react-select">
                {subtypesComponent}
              </select>
            </div>
          </div>

          <Sections
            sections={sections}
            deleteSection={this.deleteSection}
            addQuestion={this.addQuestion}
            changeQuestion={this.changeQuestion}
            changeQuestionType={this.changeQuestionType}
            deleteQuestion={this.deleteQuestion}
            genericQuestionTypes={genericQuestionTypes}
            isGeneralPollTypeSelected={isGeneralPollSelected}
          />

          <ButtonToolbar className="form__button-toolbar wizard__toolbar">
            <Button size="sm" color="primary" onClick={this.addSection}>הוספת סעיף חדש</Button>
            <Button size="sm" color="success" type="submit" disabled={submitDisabled}>
              {mode === "create" && "יצירת סקר"}
              {mode === "edit" && "עדכון סקר"}
            </Button>
          </ButtonToolbar>
        </form>
      </div>
    );
  }
}

export default withRouter(PollForm);
