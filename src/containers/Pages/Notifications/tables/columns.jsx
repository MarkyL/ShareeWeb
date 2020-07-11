import React from "react";
import ReactTooltip from "react-tooltip";
import { Badge, Button, ButtonGroup } from "reactstrap";

const buildNotificationsColumns = (toggleNotification, selectNotification) => {
  return [
    { name: "#", selector: "id", sortable: true, width: "5%" },
    { name: "כותרת", selector: "title", sortable: true },
    { name: "הודעה", selector: "body", sortable: true },
    { name: "שעה", selector: "time", sortable: true, width: "7%" },
    {
      name: "יום",
      width: "10%",
      sortable: true,
      selector: "weekdays",
      cell: row => (
        <h4>
          {
            row.weekdays === true &&
            <Badge color="warning" pill>יום חול</Badge>
          }
          {
            row.weekdays === false &&
            <Badge color="warning" pill>סופ״ש</Badge>
          }
        </h4>
      )
    },
    {
      name: "סטטוס",
      width: "10%",
      sortable: true,
      selector: "active",
      cell: row => (
        <h4>
          {
            row.active === true &&
            <Badge color="success" pill>פעיל</Badge>
          }
          {
            row.active === false &&
            <Badge color="secondary" pill>לא פעיל</Badge>
          }
        </h4>
      )
    },
    {
      name: "פעולות",
      width: "10%",
      cell: row => (
        <center>
          <ButtonGroup className="btn-group--icons">
            { row.active === true &&
              <Button outline style={{ backgroundColor: "#9dd1fc" }} onClick={() => toggleNotification(row)}>
                <span className="lnr lnr-cross-circle" data-tip="להפוך ללא פעיל" />
              </Button>
            }
            { row.active === false &&
              <Button outline style={{ backgroundColor: "#9dd1fc" }} onClick={() => toggleNotification(row)}>
                <span className="lnr lnr-chevron-right-circle" data-tip="להפוך לפעיל" />
              </Button>
            }
            {
              <Button outline style={{ backgroundColor: "#9dd1fc" }} onClick={() => selectNotification(row)}>
                <span className="lnr lnr-pencil" data-tip="ערוך הודעה" />
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
  buildNotificationsColumns,
};
