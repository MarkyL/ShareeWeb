/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";

import { Col, Row, Card, CardBody, Button, Container } from "reactstrap";

import DataTable from "react-data-table-component";

import RoutinesForm from "./forms/RoutinesForm";
import { buildRoutinesColumns } from "./tables/columns";

import { serializeNewRoutine } from "./serializers";

import { createDailyRoutine, getAllDailyRoutines, updateDailyRoutineById, toggleRoutineActivity } from "../../../services/routines";

class Routines extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { routineId: null, routineData: null, mode: "show", routines: [] };

    this.toggle = this.toggle.bind(this);

    this.select = this.select.bind(this);
    this.create = this.create.bind(this);
    this.edit = this.edit.bind(this);
  }

  componentDidMount() {
    getAllDailyRoutines((error, routines) => {
      if (error) {
        console.log(error);
        if (error.messageToClient === undefined) {
          alert("אופס, אנא נסה שוב מאוחר יותר");
        } else {
          alert(error.messageToClient);
        }

      } else {
        this.setState({ routines });
      }
    });
  }

  toggle(routineId) {
    toggleRoutineActivity(routineId, (error) => {
      if (error) {
        console.log(error);
        if (error.messageToClient === undefined) {
          alert("אופס, אנא נסה שוב מאוחר יותר");
        } else {
          alert(error.messageToClient);
        }

      } else {
        getAllDailyRoutines((error, routines) => {
          if (error) {
            console.log(error);
            if (error.messageToClient === undefined) {
              alert("אופס, אנא נסה שוב מאוחר יותר");
            } else {
              alert(error.messageToClient);
            }

          } else {
            this.setState({ routines });
          }
        });
      }
    });
  };

  select(routineId, routineData) {
    this.setState({ mode: "edit", routineId, routineData })
  };

  async edit(event) {
    event.preventDefault();
    const serialized = serializeNewRoutine(event.target.elements, this.state.routineData.isActive);

    await updateDailyRoutineById(this.state.routineId, serialized, (error) => {
      if (error) {
        console.log(error);
        if (error.messageToClient === undefined) {
          alert("אופס, אנא נסה שוב מאוחר יותר");
        } else {
          alert(error.messageToClient);
        }
      }
    });

    await getAllDailyRoutines((error, routines) => {
      if (error) {
        console.log(error);
        if (error.messageToClient === undefined) {
          alert("אופס, אנא נסה שוב מאוחר יותר");
        } else {
          alert(error.messageToClient);
        }

      } else {
        this.setState({ routines, mode: "show" });
      }
    });

    this.setState();
  }

  async create(event) {
    event.preventDefault();
    const serialized = serializeNewRoutine(event.target.elements);

    await createDailyRoutine(serialized, error => {
      if (error) {
        console.log(error);
        if (error.messageToClient === undefined) {
          alert("אופס, אנא נסה שוב מאוחר יותר");
        } else {
          alert(error.messageToClient);
        }

      }
    });

    await getAllDailyRoutines((error, routines) => {
      if (error) {
        console.log(error);
        if (error.messageToClient === undefined) {
          alert("אופס, אנא נסה שוב מאוחר יותר");
        } else {
          alert(error.messageToClient);
        }

      } else {
        this.setState({ routines, mode: "show" });
      }
    });
  }

  render() {
    const { mode, routines, routineData } = this.state;
    const columns = buildRoutinesColumns(this.toggle, this.select);

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
                  <div className="wizard">
                    <div className="wizard__form-wrapper">
                      <RoutinesForm onSubmit={this.create} mode={mode} onReturn={() => { this.setState({ mode: "show" })} }/>
                    </div>
                  </div>
                )}

                {
                  mode === "edit" && routineData && (
                  <div className="wizard">
                    <div className="wizard__form-wrapper">
                      <RoutinesForm data={routineData} mode={mode} onSubmit={this.edit} onReturn={() => this.setState({ mode: "show" })} />
                    </div>
                  </div>
                )}

                { mode === "show" && (
                  <div>
                    <h4 className="bold-text">רשימת סדרי יום</h4>
                    <div className="card__title">
                      <Button size="sm" color="primary" onClick={() => this.setState({ mode: "create" })}>יצירת סדר יום חדש</Button>
                    </div>
                    <DataTable
                      data={routines}
                      columns={columns}
                      pagination={true}
                      defaultSortAsc={false}
                      defaultSortField={"isActive"}
                      className="table-responsive table--bordered"
                    />
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

export default withRouter(Routines);
