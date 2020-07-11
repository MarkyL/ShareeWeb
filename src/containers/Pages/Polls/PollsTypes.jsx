/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Card, CardBody, Button, Container } from 'reactstrap';

import DataTable from 'react-data-table-component';

import { buildPollsTypesColumns } from './tables/columns';
import { getAllPollTypes } from '../../../services/polls';

class Polls extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { pollsTypes: [] };
  }

  componentDidMount() {
    getAllPollTypes((error, pollsTypes) => {
      if (error) {
        console.log(error);
        if (error.messageToClient === undefined) {
          alert("אופס, אנא נסה שוב מאוחר יותר");
        } else {
          alert(error.messageToClient);
        }

      } else {
        this.setState({ pollsTypes });
      }
    });
  }

  render() {
    const { pollsTypes } = this.state;
    const pollsTypesColumns = buildPollsTypesColumns();

    if (!localStorage.getItem("user")) {
      this.props.history.push("/sign_in");
    }

    return (
      <Container className="dashboard">
        <Row>
          <Col xs={12} md={12} lg={12} xl={12}>
            <Card>
              <CardBody>
                <h4 className="bold-text">רשימת סוגי הסקרים</h4>
                <div className="card__title">
                  <Link to={"/dash/polls/types/create"}>
                    <Button size="sm" color="primary">יצירת סוג סקר חדש</Button>
                  </Link>
                </div>
                <DataTable
                  data={pollsTypes}
                  columns={pollsTypesColumns}
                  pagination={true}
                  className="table-responsive table--bordered"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Polls;
