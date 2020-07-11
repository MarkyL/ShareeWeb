/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from "react";

import { Col, Row, Card, CardBody, Button, Container } from "reactstrap";

import DataTable from "react-data-table-component";

import { buildGenericQuestionTypesColumns } from "./tables/columns";

import { serializeNewGenericQuestion } from "./serializers";

import GenericQuestionsForm from "./forms/GenericQuestionsForm";

import {
      getAllGenericQuestions,
      createGenericQuestion,
      updateGenericQuestion,
} from "../../../services/genericQuestions";


class GenericQuestionTypes extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    genericQuestionTypes: [],
    mode: "show",
    genericQuestionId: null ,
    genericQuestionData: null
    };

    this.select = this.select.bind(this);
    this.create = this.create.bind(this);
    this.edit = this.edit.bind(this);
    this.fetchTypes = this.fetchTypes.bind(this);
  }

  componentDidMount() {
    this.fetchTypes();
  };

  fetchTypes() {
    getAllGenericQuestions((errorMessage, genericQuestionTypes) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        this.setState({ genericQuestionTypes, mode: "show" });
      }
    });
  }

  select(genericQuestionId, genericQuestionData) {
    this.setState({ mode: "edit", genericQuestionId, genericQuestionData })
  };

  async create(event) {
    event.preventDefault();
    const serialized = serializeNewGenericQuestion(event.target.elements);

    await createGenericQuestion(serialized, error => {
      if (error) {
        console.log(error);
        if (error.messageToClient === undefined) {
          alert("אופס, אנא נסה שוב מאוחר יותר");
        } else {
          alert(error.messageToClient);
        }

      }
    });

    this.fetchTypes()
  }

  async edit(event) {
      event.preventDefault();
      const serialized = serializeNewGenericQuestion(event.target.elements)

      await updateGenericQuestion(this.state.genericQuestionId, serialized, (error) => {
        if (error) {
          console.log(error);
          if (error.messageToClient === undefined) {
            alert("אופס, אנא נסה שוב מאוחר יותר");
          } else {
            alert(error.messageToClient);
          }

        } else {
          this.fetchTypes()
        }
      });

  }

  render() {
    const { mode, genericQuestionTypes, genericQuestionData } = this.state;
    const genericQuestionTypesColumns = buildGenericQuestionTypesColumns(this.select);

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
                    <GenericQuestionsForm onSubmit={this.create} mode={mode} onReturn={() => { this.setState({ mode: "show" })} }/>
                  </div>
                </div>
              )}

              {
                mode === "edit" && genericQuestionData && (
                <div className="wizard">
                  <div className="wizard__form-wrapper">
                    <GenericQuestionsForm data={genericQuestionData} mode={mode} onSubmit={this.edit} onReturn={() => this.setState({ mode: "show" })} />
                  </div>
                </div>
              )}

              { mode === "show" && (
                <div>
                  <h4 className="bold-text">רשימת שאלות גנריות</h4>
                  <div className="card__title">
                    <Button size="sm" color="primary" onClick={() => this.setState({ mode: "create" })}>יצירת שאלה גנרית חדש</Button>
                  </div>
                  <DataTable
                    data={genericQuestionTypes}
                    columns={genericQuestionTypesColumns}
                    pagination={true}
                    defaultSortAsc={false}
                    defaultSortField={"id"}
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

export default GenericQuestionTypes;
