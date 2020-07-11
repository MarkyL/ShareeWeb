/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";

import { Col, Row, Card, CardBody, Button, ButtonToolbar, Container } from "reactstrap";

import DataTable from "react-data-table-component";

import PollsResults from "./PollsResults";
import PatientForm from "./forms/PatientForm";
import ExerciseForm from "./forms/ExerciseForm";
import { buildPatientsColumns, buildMessagesColumns, buildExercisesColumns } from "./tables/columns";

import { serializeNewExercise } from "./serializers";

import {
  createPatient,
  getAllPatients,
  sendPushToPatient,
  togglePatientHospitalization,
  getMedicalPollResultsForUser,
  getAllPushNotificationsByUserId
} from "../../../services/patients";

import {
  getAllExerciseCategoriesByUserId,
  deleteExerciseCategoryById,
  createExerciseCategory,
  updateExerciseCategory
} from "../../../services/exercises";

class Patients extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      polls: [],
      mode: "show",
      patient: {},
      patients: [],
      messages: [],
      message: { subject: null, text: null },
      exercises: [], exerciseId: "",
      exerciseData: null
    };

    this.polls = this.polls.bind(this);
    this.toggle = this.toggle.bind(this);
    this.messages = this.messages.bind(this);

    this.sendMessage = this.sendMessage.bind(this);
    this.createPatient = this.createPatient.bind(this);

    this.onSubjectChange = this.onSubjectChange.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);

    this.addExercise = this.addExercise.bind(this);
    this.fetchExercises = this.fetchExercises.bind(this);
    this.select = this.select.bind(this);
    this.deleteExercise = this.deleteExercise.bind(this);
    this.editExercise = this.editExercise.bind(this);
  }

  componentDidMount() {
    getAllPatients((error, patients) => {
      if (error) {
        console.log(error);
        if (error.messageToClient === undefined) {
          alert("אופס, אנא נסה שוב מאוחר יותר");
        } else {
          alert(error.messageToClient);
        }

      } else {
        this.setState({ patients });
      }
    });
  }

  polls(patient) {
    getMedicalPollResultsForUser(patient.id, (error, polls) => {
      if (error) {
        console.log(error);
        if (error.messageToClient === undefined) {
          alert("אופס, אנא נסה שוב מאוחר יותר");
        } else {
          alert(error.messageToClient);
        }

      } else {
        this.setState({ mode: "polls", patient, polls });
      }
    });
  };

  toggle(patient) {
    togglePatientHospitalization(patient.id, (error) => {
      if (error) {
        console.log(error);
        if (error.messageToClient === undefined) {
          alert("אופס, אנא נסה שוב מאוחר יותר");
        } else {
          alert(error.messageToClient);
        }

      } else {
        getAllPatients((error, patients) => {
          if (error) {
            console.log(error);
            if (error.messageToClient === undefined) {
              alert("אופס, אנא נסה שוב מאוחר יותר");
            } else {
              alert(error.messageToClient);
            }

          } else {
            this.setState({ patients });
          }
        });
      }
    });
  };

  messages(patient) {
    getAllPushNotificationsByUserId(patient.id, (error, messages) => {
      if (error) {
        console.log(error);
        if (error.messageToClient === undefined) {
          alert("אופס, אנא נסה שוב מאוחר יותר");
        } else {
          alert(error.messageToClient);
        }

      } else {
        this.setState({ mode: "messages", patient, messages });
      }
    });
  };

  onSubjectChange({ target }) {
    this.setState({ message: { ...this.state.message, subject: target.value }});
  }

  onMessageChange({ target }) {
    this.setState({ message: { ...this.state.message, text: target.value }});
  }

  async sendMessage(event) {
    event.preventDefault();
    const { patient, message } = this.state;

    const data = {
      userId: patient.id,
      notificationBody: message.text,
      notificationTitle: message.subject
    };

    await sendPushToPatient(data, (error) => {
      if (error) {
        console.log(error);
        if (error.messageToClient === undefined) {
          alert("אופס, אנא נסה שוב מאוחר יותר");
        } else {
          alert(error.messageToClient);
        }

      } else {
        this.messages(patient);
      }
    });
  };

  async createPatient(phone) {
    const data = { phoneNumber: phone };

    await createPatient(data, (error) => {
      if (error) {
        console.log(error);
        if (error.messageToClient === undefined) {
          alert("אופס, אנא נסה שוב מאוחר יותר");
        } else {
          alert(error.messageToClient);
        }

      }
    });

    await getAllPatients((error, patients) => {
      if (error) {
        console.log(error);
        if (error.messageToClient === undefined) {
          alert("אופס, אנא נסה שוב מאוחר יותר");
        } else {
          alert(error.messageToClient);
        }

      } else {
        this.setState({ patients, mode: "show"});
      }
    });
  }

  //exercises region

  async addExercise(event) {
    event.preventDefault();

    const patient = this.state.patient;
    const userId = patient.id;
    const serialized = serializeNewExercise(event.target.elements, userId);

    await createExerciseCategory(serialized, errorMessage => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        this.fetchExercises(patient);
      }
    });
  }

  fetchExercises(patient) {
    getAllExerciseCategoriesByUserId(patient.id, (errorMessage, exercises) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        //TODO show appropriate message when exercises are empty.
        console.log("getAllExerciseCategoriesByUserId - ", exercises);
        this.setState({ mode: "exercises", patient, exercises });
      }
    });
  }

  select(exerciseId, exerciseData) {
    this.setState({ mode: "editExercise", exerciseId, exerciseData });
  }

  async editExercise(event) {
    event.preventDefault();

    const patient = this.state.patient;
    const userId = patient.id;

    const serialized = serializeNewExercise(event.target.elements, userId);

    await updateExerciseCategory(userId, serialized, errorMessage => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        this.fetchExercises(patient);
      }
    });
  }

  deleteExercise(rowId) {
    console.log("deleteExercise with deleteExercise = ", rowId);
    deleteExerciseCategoryById(rowId, errorMessage => {
      if (errorMessage) {
        console.log("deleteExerciseCategoryById - ", errorMessage)
      } else {
        //TODO show a delete notification
        this.fetchExercises(this.state.patient)
        console.log("Exercise deleted successfully!")
      }

    });
  }

  //end of exercises region

  render() {
    const { mode, patient, patients, polls, messages, exercises, exerciseData } = this.state;
    const columnsMessages = buildMessagesColumns();
    const columnsPatients = buildPatientsColumns(this.polls, this.toggle, this.messages, this.fetchExercises);
    const columnsExercises = buildExercisesColumns(this.select, this.deleteExercise);

    if (!localStorage.getItem("user")) {
      this.props.history.push("/sign_in");
    }

    return (
      <Container className="dashboard">
        <Row>
          <Col xs={12} md={12} lg={12} xl={12}>
            <Card>
              <CardBody>

                { mode === "create" && (
                  <PatientForm mode={mode} onSubmit={this.createPatient} onReturn={() => this.setState({ mode: "show" })} />
                )}

                { mode === "messages" && (
                  <div>
                    <h4 className="bold-text">הודעות למטופל {patient.phoneNumber}</h4>
                    <div className="card__title">
                      <Button size="sm" color="secondary" onClick={() => this.setState({ mode: "show" })}>
                        לחזור לרשימת המטופלים
                      </Button>

                      <form
                        onSubmit={this.sendMessage}
                        style={{ marginTop: "30px" }}
                        className="form form--horizontal form__half"
                      >
                        <div className="form__form-group">
                          <span className="form__form-group-label"><b>כותרת:</b></span>
                          <div className="form__form-group-field">
                            <input id="sub" placeholder="כותרת" onChange={this.onSubjectChange} />
                          </div>
                        </div>
                        <div className="form__form-group">
                          <span className="form__form-group-label"><b>הודעה:</b></span>
                          <div className="form__form-group-field">
                            <textarea id="msg" placeholder="הודעה" onChange={this.onMessageChange} />
                          </div>
                        </div>
                        <ButtonToolbar className="form__button-toolbar wizard__toolbar">
                          <Button size="sm" color="primary" type="submit">
                            שלח הודעה למטופל
                          </Button>
                        </ButtonToolbar>
                      </form>
                    </div>
                    <DataTable
                      data={messages}
                      pagination={true}
                      defaultSortAsc={false}
                      defaultSortField={"id"}
                      columns={columnsMessages}
                      className="table-responsive table--bordered"
                    />
                  </div>
                )}

                { mode === "polls" && (
                  <div>
                    <h4 className="bold-text">תוצאות של הסקרים למטופל {patient.phoneNumber}</h4>
                    <div className="card__title">
                      <Button size="sm" color="secondary" onClick={() => this.setState({ mode: "show" })}>
                        לחזור לרשימת המטופלים
                      </Button>
                    </div>
                    <PollsResults results={polls} />
                  </div>
                )}

                { mode === "show" && (
                  <div>
                    <h4 className="bold-text">רשימת המטופלים</h4>
                    <div className="card__title">
                      <Button size="sm" color="primary" onClick={() => this.setState({ mode: "create" })}>
                        הוספת מטופל
                      </Button>
                    </div>
                    <DataTable
                      data={patients}
                      pagination={true}
                      defaultSortAsc={false}
                      columns={columnsPatients}
                      defaultSortField={"hospitalized"}
                      className="table-responsive table--bordered"
                    />
                  </div>
                )}

                { mode === "exercises" && (
                  <div>
                    <h4 className="bold-text">פעילויות למטופל {patient.phoneNumber}</h4>
                    <div className="card__title">
                      <Button size="sm" color="secondary" onClick={() => this.setState({ mode: "show" })}>
                        לחזור לרשימת המטופלים
                      </Button>
                      <br/><br/><br/>
                      <Button size="sm" color="primary" onClick={() => this.setState({ mode: "createExercise" })}>
                        יצירת פעילות חדשה
                      </Button>

                      <DataTable
                        data={exercises}
                        pagination={true}
                        defaultSortAsc={false}
                        columns={columnsExercises}
                        className="table-responsive table--bordered"
                      />

                    </div>
                  </div>
                )}

                { mode === "createExercise" && (
                  <div className="wizard">
                    <div className="wizard__form-wrapper">
                      <ExerciseForm patient={patient} onSubmit={this.addExercise} mode={mode} onReturn={() => { this.setState({ mode: "exercises" })} }/>
                    </div>
                  </div>
                )}

                { mode === "editExercise" && (
                  <div className="wizard">
                    <div className="wizard__form-wrapper">
                      <ExerciseForm patient={patient} data={exerciseData} onSubmit={this.editExercise} mode={mode} onReturn={() => { this.setState({ mode: "exercises" })} }/>
                    </div>
                  </div>
                )}

              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Patients);
