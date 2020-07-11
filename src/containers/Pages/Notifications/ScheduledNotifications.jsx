/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";

import DataTable from "react-data-table-component";
import { Col, Row, Card, CardBody, Button, Container } from "reactstrap";

import NotificationForm from "./forms/NotificationForm";
import { buildNotificationsColumns } from "./tables/columns";

import {
  getAllScheduledNotifications,
  toggleScheduledNotification,
  createScheduledNotification,
  editScheduledNotification
} from "../../../services/notifications";

class ScheduledNotifications extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mode: "show", notification: null, notifications: [],
    };

    this.listNotifications = this.listNotifications.bind(this);
    this.toggleNotification = this.toggleNotification.bind(this);
    this.selectNotification = this.selectNotification.bind(this);
    this.createNotification = this.createNotification.bind(this);
    this.editNotification = this.editNotification.bind(this);
  }

  componentDidMount() {
    getAllScheduledNotifications((error, notifications) => {
      if (error) {
        console.log(error);
        if (error.messageToClient === undefined) {
          alert("אופס, אנא נסה שוב מאוחר יותר");
        } else {
          alert(error.messageToClient);
        }

      } else {
        this.setState({ notifications });
      }
    });
  }

  async listNotifications() {
    await getAllScheduledNotifications((error, notifications) => {
      if (error) {
        console.log(error);
        if (error.messageToClient === undefined) {
          alert("אופס, אנא נסה שוב מאוחר יותר");
        } else {
          alert(error.messageToClient);
        }

      } else {
        this.setState({ mode: "show", notifications });
      }
    });
  }

  async toggleNotification(notification) {
    await toggleScheduledNotification(notification.id, (error) => {
      if (error) {
        console.log(error);
        if (error.messageToClient === undefined) {
          alert("אופס, אנא נסה שוב מאוחר יותר");
        } else {
          alert(error.messageToClient);
        }

      }
    });
    this.listNotifications();
  };

  async selectNotification(notification) {
    this.setState({ mode: "edit", notification });
  }

  async createNotification(data) {
    await createScheduledNotification(data, error => {
      if (error) {
        console.log(error);
        if (error.messageToClient === undefined) {
          alert("אופס, אנא נסה שוב מאוחר יותר");
        } else {
          alert(error.messageToClient);
        }

      }
    });
    this.listNotifications();
  }

  async editNotification(data) {
    await editScheduledNotification(data, error => {
      if (error) {
        console.log(error);
        if (error.messageToClient === undefined) {
          alert("אופס, אנא נסה שוב מאוחר יותר");
        } else {
          alert(error.messageToClient);
        }

      } else {
        this.listNotifications();
      }
    });
  }

  render() {
    const { mode, notification, notifications } = this.state;
    const columnsNotifications = buildNotificationsColumns(this.toggleNotification, this.selectNotification);

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
                  <NotificationForm
                    mode={mode}
                    onSubmit={this.createNotification}
                    onReturn={() => this.setState({ mode: "show" })}
                  />
                )}

                { mode === "edit" && (
                  <NotificationForm
                    mode={mode}
                    notification={notification}
                    onSubmit={this.editNotification}
                    onReturn={() => this.setState({ mode: "show" })}
                  />
                )}

                { mode === "show" && (
                  <div>
                    <h4 className="bold-text">הודעות מתוזמנות</h4>
                    <div className="card__title">
                      <Button size="sm" color="primary" onClick={() => this.setState({ mode: "create" })}>
                        לצור הודעה מתוזמנת
                      </Button>
                    </div>
                    <DataTable
                      pagination={true}
                      data={notifications}
                      defaultSortAsc={false}
                      columns={columnsNotifications}
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

export default withRouter(ScheduledNotifications);
