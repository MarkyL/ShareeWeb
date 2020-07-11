/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

import { Col, Row, Card, CardBody, Container } from 'reactstrap';

import DataTable from 'react-data-table-component';

import { getGeneralPollResultsById, getMedicalPollResultsById } from '../../../services/polls';
import { generalResultsColumns, medicalResultsColumns, ExpanableMedicalResults } from './tables/columns';

class PollsRersults extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { isGeneral: null, results: [], name: "" };
  }

  componentDidMount() {
    const pollName = this.props.match.params.pollName;
    if (this.props.match.params.pollSubType === "general") {
      getGeneralPollResultsById(this.props.match.params.pollId, (error, results) => {
        if (error) {
          console.log(error);
          if (error.messageToClient === undefined) {
            alert("אופס, אנא נסה שוב מאוחר יותר");
          } else {
            alert(error.messageToClient);
          }

        } else {
          this.setState({ isGeneral: true, results: results.pollResults, name: pollName });
        }
      });
    } else if (this.props.match.params.pollSubType === "medical") {
      getMedicalPollResultsById(this.props.match.params.pollId, (error, results) => {
        if (error) {
          console.log(error);
          if (error.messageToClient === undefined) {
            alert("אופס, אנא נסה שוב מאוחר יותר");
          } else {
            alert(error.messageToClient);
          }

        } else {
          this.setState({ isGeneral: false, results: results, name: pollName });
        }
      });
    }
  }

  render() {
    const { results, isGeneral, name } = this.state;

    if (!localStorage.getItem("user")) {
      this.props.history.push("/sign_in");
    }

    return (
      <Container className="dashboard">
        <Row>
          <Col xs={12} md={12} lg={12} xl={12}>
            <Card>
              <CardBody>
                <h4 className="bold-text">תוצאות הסקר - "{name}"</h4>
                { isGeneral &&
                  <DataTable
                    data={results}
                    pagination={true}
                    columns={generalResultsColumns()}
                    defaultSortField={"questionId"}
                    className="table-responsive table--bordered"
                  />
                }
                { !isGeneral &&
                  <DataTable
                    data={results}
                    pagination={true}
                    expandableRows={true}
                    expandableRowsComponent={<ExpanableMedicalResults />}
                    columns={medicalResultsColumns()}
                    className="table-responsive table--bordered"
                  />
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(PollsRersults);
