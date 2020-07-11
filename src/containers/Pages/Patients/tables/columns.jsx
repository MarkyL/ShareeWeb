import React from "react";
import ReactTooltip from "react-tooltip";
import { Badge, Button, ButtonGroup } from "reactstrap";

const buildPatientsColumns = (polls, toggle, messages, fetchExercises) => {
  return [
    { name: "#", selector: "id", sortable: true, width: "10%" },
    { name: "מ״ס טלפון", selector: "phoneNumber", sortable: true },
    {
      name: "סטטוס",
      sortable: true,
      selector: "hospitalized",
      cell: row => (
        <h4>
          {
            row.hospitalized === true &&
            <Badge color="success" pill>מאושפז</Badge>
          }
          {
            row.hospitalized === false &&
            <Badge color="secondary" pill>משוחרר</Badge>
          }
        </h4>
      )
    },
    {
      name: "תאריך כניסה",
      sortable: true,
      selector: "startTimestamp",
      cell: row => (
        <div>
          {
            (new Date(parseInt(row.startTimestamp) * 1000)).toLocaleDateString()
          }
        </div>
      )
    },
    {
      name: "תאריך יציאה",
      sortable: true,
      selector: "endTimestamp",
      cell: row => (
        <div>
          {
            row.endTimestamp === 0 ? "-" : (new Date(parseInt(row.endTimestamp) * 1000)).toLocaleDateString()
          }
        </div>
      )
    },
    {
      name: "פעולות",
      cell: row => (
        <center>
          <ButtonGroup className="btn-group--icons">
            { row.hospitalized === true &&
              <Button outline style={{ backgroundColor: "#9dd1fc" }} onClick={() => toggle(row)}>
                <span className="lnr lnr-cross-circle" data-tip="להפוך למשוחרר" />
              </Button>
            }
            { row.hospitalized === false &&
              <Button outline style={{ backgroundColor: "#9dd1fc" }} onClick={() => toggle(row)}>
                <span className="lnr lnr-chevron-right-circle" data-tip="להפוך למאושפז" />
              </Button>
            }
            {
              <Button outline style={{ backgroundColor: "#9dd1fc" }} onClick={() => messages(row)}>
                <span className="lnr lnr-envelope" data-tip="הודעות" />
              </Button>
            }
            {
              <Button outline style={{ backgroundColor: "#9dd1fc" }} onClick={() => polls(row)}>
                <span className="lnr lnr-list" data-tip="תוצאות השאלונים" />
              </Button>
            }
            {
              <Button outline style={{ backgroundColor: "#9dd1fc" }} onClick={() => fetchExercises(row)}>
                <span className="lnr lnr-heart-pulse" data-tip="פעילויות" />
              </Button>
            }
          </ButtonGroup>
          <ReactTooltip />
        </center>
      )
    }
  ];
};

const buildMessagesColumns = () => {
  return [
    { name: "#", selector: "id", sortable: true, width: "10%" },
    { name: "כותרת", selector: "notificationTitle" },
    { name: "הודעה", selector: "notificationBody" },
    {
      name: "תאריך",
      sortable: true,
      selector: "timeStamp",
      cell: row => (
        <div>
          {
            (new Date(parseInt(row.timeStamp) * 1000)).toLocaleDateString()
          }
        </div>
      )
    },
  ];
};

const buildExercisesColumns = (select, deleteExercise) => {
  return [
    { name: "#", selector: "id", sortable: true, width: "10%" },
    { name: "סוג פעילות", selector: "name" },
    { name: "מספר תרגילים", selector: "exercises.length" },
    {
      name: "פעולות",
      cell: row => (
        <center>
          <ButtonGroup className="btn-group--icons">
            {
              <Button outline style={{ backgroundColor: "#9dd1fc" }} onClick={() => select(row.id, row)}>
                <span className="lnr lnr-pencil" data-tip="עריכת פעילות" />
              </Button>
            }
            {
              <Button outline style={{ backgroundColor: "#9dd1fc" }} onClick={() => deleteExercise(row.id)}>
                <span className="lnr lnr-cross" data-tip="מחיקה" />
              </Button>
            }
          </ButtonGroup>
          <ReactTooltip />
        </center>
      )
    }
  ];
};

export {
  buildPatientsColumns,
  buildMessagesColumns,
  buildExercisesColumns
};
