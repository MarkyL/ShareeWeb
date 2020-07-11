import React, { PureComponent } from "react";
import { Button, ButtonToolbar } from "reactstrap";
import { reduxForm } from 'redux-form';
import Questions from './components/Questions';

// {
//   "answers": [
//     "string"
//   ],
//   "id": 0,
//   "name": "string"
// }

class GenericQuestionsForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        name: "",
        answers: [],
        answersCount: 0,
        mode: "show"
    };

    this.addGenericQuestion = this.addGenericQuestion.bind(this)
    this.changeName = this.changeName.bind(this)
    this.deleteQuestion = this.deleteQuestion.bind(this)
    this.changeQuestionDescription = this.changeQuestionDescription.bind(this)
  }

  componentDidMount() {
    const data = this.props.data;

    if (data) {
        const name = data.name;
        const answers = this.props.data.answers;
        const answersCount = answers.length;

        this.setState({ name, answers, answersCount });
    }
  };

  addGenericQuestion() {
    const answers = [...this.state.answers];
    const answersCount = this.state.answersCount + 1;

    answers[answersCount - 1]= "";

    this.setState({ answers, answersCount });
  }

  changeName(name) {
      this.setState({ name })
  }

  changeQuestionDescription(questionIndex, value) {
    const answers = [...this.state.answers];
    answers[questionIndex] = value;

    this.setState({ answers });
  }

  deleteQuestion(questionIndex) {
    const answers = [...this.state.answers];
    const answersCount = this.state.answersCount - 1;

    answers.splice(questionIndex, 1);
    this.setState({ answers, answersCount });
  }

  render() {
    const { name, answers } = this.state;
    const { onSubmit, onReturn, data, mode } = this.props;

    const submitDisabled = name !== "" ? false : true;

    return (
    <div>
      <Button
          size="sm" color="secondary" onClick={onReturn} style={{ float: "right", marginLeft: "10%" }}>
          לחזור לרשימת השאלות הגנריות
      </Button>

      <form className="form form--horizontal form__half" onSubmit={onSubmit}>
        <h4 className="wizard__title">
          <b>
            {mode === "create" && "יצירת שאלה גנרית חדשה"}
            {mode === "edit" && "עדכון שאלה גנרית"}
          </b>
        </h4>

        <div className="form__form-group">
            <span className="form__form-group-label"><b>סוג השאלה:</b></span>
            <div className="form__form-group-field">
              <input type="text" id="name" name="name" placeholder="סוג השאלה" defaultValue={data && data.name}
                  onChange={({ target }) => this.changeName(target.value)} />
            </div>
        </div>

        <Questions
            answersData={answers}
            deleteQuestion={e => this.deleteQuestion(e)}
            changeQuestionDescription={(index, value) => { this.changeQuestionDescription(index, value)} }
           />

         <ButtonToolbar className="form__button-toolbar wizard__toolbar">
             <Button size="sm" color="primary" onClick={e => this.addGenericQuestion()}>הוספת תשובה אפשרית</Button>
             <Button size="sm" color="success" type="submit" disabled={submitDisabled}>
               {mode === "create" && "יצירת שאלה גנרית"}
               {mode === "edit" && "עדכון שאלה גנרית"}
             </Button>
          </ButtonToolbar>
      </form>
    </div>
    );
  }
}

export default reduxForm({ form: 'generic_questions_form'})(GenericQuestionsForm);
