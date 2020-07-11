/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";

import { Col, Row, Card, CardBody, Button, Container } from "reactstrap";

import DataTable from "react-data-table-component";

import PollForm from "./forms/PollForm";
import { buildPollsColumns } from "./tables/columns";

import { serializeNewPoll } from "./serializers";
import {
  createPoll, editPoll, getAllPolls, togglePollActivity
} from "../../../services/polls";

class Polls extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { pollId: null, pollData: null, mode: "show", polls: [] };

    this.toggle = this.toggle.bind(this);
    this.results = this.results.bind(this);

    this.select = this.select.bind(this);
    this.create = this.create.bind(this);
    this.edit = this.edit.bind(this);
  }

  componentDidMount() {
    getAllPolls((error, polls) => {
      if (error) {
        console.log(error);
        if (error.messageToClient === undefined) {
          alert("אופס, אנא נסה שוב מאוחר יותר");
        } else {
          alert(error.messageToClient);
        }

      } else {
        this.setState({ polls });
      }
    });
  }

  toggle(pollId) {
    togglePollActivity(pollId, (error) => {
      if (error) {
        console.log(error);
        if (error.messageToClient === undefined) {
          alert("אופס, אנא נסה שוב מאוחר יותר");
        } else {
          alert(error.messageToClient);
        }

      } else {
        getAllPolls((error, polls) => {
          if (error) {
            console.log(error);
            if (error.messageToClient === undefined) {
              alert("אופס, אנא נסה שוב מאוחר יותר");
            } else {
              alert(error.messageToClient);
            }

          } else {
            this.setState({ polls });
          }
        });
      }
    });
  };

  results(pollId) {
    const poll = this.state.polls.map(poll => pollId === poll.id ? poll : false).filter(i => i)[0];

    this.props.history.push(`/dash/polls/results/${poll.isGeneralPoll ? "general" : "medical"}/${pollId}/${poll.name}`);
  };

  select(pollId, pollData) {
    this.setState({ mode: "edit", pollId, pollData })
  };

  async edit(event) {
    event.preventDefault();
    const serialized = serializeNewPoll(event.target.elements, this.state.pollData.isActive);

    await editPoll(this.state.pollId, serialized, error => {
      if (error) {
        console.log(error);
        if (error.messageToClient === undefined) {
          alert("אופס, אנא נסה שוב מאוחר יותר");
        } else {
          alert(error.messageToClient);
        }

      }
    });

    await getAllPolls((error, polls) => {
      if (error) {
        console.log(error);
        if (error.messageToClient === undefined) {
          alert("אופס, אנא נסה שוב מאוחר יותר");
        } else {
          alert(error.messageToClient);
        }

      } else {
        this.setState({ polls, mode: "show" });
      }
    });

    this.setState();
  }

  async create(event) {
    event.preventDefault();
    const serialized = serializeNewPoll(event.target.elements);

    await createPoll(serialized, (error) => {
      if (error) {
        console.log(error);
        if (error.messageToClient === undefined) {
          alert("אופס, אנא נסה שוב מאוחר יותר");
        } else {
          alert(error.messageToClient);
        }

      }
    });

    await getAllPolls((error, polls) => {
      if (error) {
        console.log(error);
        if (error.messageToClient === undefined) {
          alert("אופס, אנא נסה שוב מאוחר יותר");
        } else {
          alert(error.messageToClient);
        }

      } else {
        this.setState({ polls, mode: "show" });
      }
    });
  }

  render() {
    const { mode, polls, pollData } = this.state;
    const columns = buildPollsColumns(this.toggle, this.select, this.results);

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
                      <PollForm onSubmit={this.create} mode={mode} onReturn={() => this.setState({ mode: "show" })} />
                    </div>
                  </div>
                )}

                {
                  mode === "edit" && pollData && (
                  <div className="wizard">
                    <div className="wizard__form-wrapper">
                      <PollForm data={pollData} mode={mode} onSubmit={this.edit} onReturn={() => this.setState({ mode: "show" })} />
                    </div>
                  </div>
                )}

                { mode === "show" && (
                  <div>
                    <h4 className="bold-text">רשימת הסקרים</h4>
                    <div className="card__title">
                      <Button size="sm" color="primary" onClick={() => this.setState({ mode: "create" })}>יצירת סקר חדש</Button>
                    </div>
                    <DataTable
                      data={polls}
                      columns={columns}
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

export default withRouter(Polls);
