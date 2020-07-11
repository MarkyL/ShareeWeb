/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from 'react';
import { Col, Row, Card, CardBody, Button, Container } from 'reactstrap';

import DataTable from 'react-data-table-component';

import { buildExercisesTypesColumns } from './tables/columns';
import { getAllExercisesTypes, createExerciseCategoryType } from '../../../services/exercises';

//imports for the dialog
// import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//end of imports for dialog
class ExercisesTypes extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { exercisesTypes: [], open: false, newName: ""};
  }

  handleOpenDialog() {
      this.setState({ open: true });
  };

  handleCloseDialog() {
      this.setState({ open: false });
  };

  handleSaveType(e) {
    const newName = this.state.newName;
    console.log("handleSaveType newName = ", newName);

    if (newName !== "") {
      const data = { type: newName };

      createExerciseCategoryType(data, (errorMessage, newExerciseType) => {
        if (errorMessage) {
          console.log(errorMessage);
        } else {
          console.log("createExerciseCategoryType success");
          this.setState({ open: false });
          this.fetchTypes();
        }
      })
    } else {
      console.log("handleSaveType - cant save with empty newName");
    }
  }

  onChangeName(name) {
    this.setState({ newName: name })
  }

  componentDidMount() {
    this.fetchTypes();
  };

  fetchTypes() {
    getAllExercisesTypes((errorMessage, exercisesTypes) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        this.setState({ exercisesTypes });
      }
    });
  }

  render() {
    const { exercisesTypes, open } = this.state;
    const exercisesTypesColumns = buildExercisesTypesColumns();

    return (
      <Container className="dashboard">
        <Row>
          <Col xs={12} md={12} lg={12} xl={12}>
            <Card>
              <CardBody>
                <h4 className="bold-text">רשימת סוגי הפעילויות</h4>
                <div className="card__title">
                    <Button size="sm" color="primary" onClick={e => this.handleOpenDialog()}>יצירת סוג פעילות חדש</Button>
                </div>
                <DataTable
                  data={exercisesTypes}
                  columns={exercisesTypesColumns}
                  pagination={true}
                  className="table-responsive table--bordered"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Dialog
          dir="rtl"
          open={open}
          className="rtl-support"
          aria-labelledby="form-dialog-title"
          onClose={e => this.handleCloseDialog()}
        >
          <DialogTitle id="form-dialog-title"><center>יצירת סוג פעילות חדש</center></DialogTitle>
          <DialogContent>
            <DialogContentText>
              סוג פעילות נועד להבדיל בין סוגים שונים של פעילויות פרא-רפואיות עבור המטופלים.
            </DialogContentText>
            <TextField
              props
              fullWidth
              id="name"
              type="text"
              placeholder="שם הפעילות..."
              onChange={( e ) => this.onChangeName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button size="sm" onClick={e => this.handleCloseDialog()} color="primary">
              ביטול
            </Button>
            <Button size="sm" onClick={e => this.handleSaveType()} color="primary">
              שמירה
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  }
}

export default ExercisesTypes;
