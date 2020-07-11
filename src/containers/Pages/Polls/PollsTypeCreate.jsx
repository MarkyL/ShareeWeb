/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from "react";
import { withRouter } from 'react-router-dom';
import { Col, Row, Card, CardBody, Container } from "reactstrap";

import PollTypeForm from "./forms/PollTypeForm";
import { createPollType } from "../../../services/polls";

class PollsTypeCreate extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { pollsTypes: [] };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(title, subType) {
    const data = { type: title, isGeneralPoll: subType === "General" };

    createPollType(data, (error, newPollType) => {
      if (error) {
        console.log(error);
        if (error.messageToClient === undefined) {
          alert("אופס, אנא נסה שוב מאוחר יותר");
        } else {
          alert(error.messageToClient);
        }

      } else {
        this.props.history.push('/dash/polls/types');
      }
    });
  };

  render() {
    if (!localStorage.getItem("user")) {
      this.props.history.push("/sign_in");
    }

    return (
      <Container>
        <Row>
          <Col xs={12} md={12} lg={12} xl={12}>
            <Card>
              <CardBody>
                <div className="wizard">
                  <div className="wizard__form-wrapper">
                    <PollTypeForm onSubmit={this.onSubmit} />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(PollsTypeCreate);
