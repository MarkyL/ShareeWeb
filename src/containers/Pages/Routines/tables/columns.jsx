import React from "react";
import ReactTooltip from "react-tooltip";
import { Badge, Button, ButtonGroup } from "reactstrap";

const buildRoutinesColumns = (toggleRoutine, editRoutine) => {
  return [
    { name: "#", selector: "id", sortable: true, width: "10%" },
    { name: "שם", selector: "name", sortable: true },
    {
      name: "סטטוס",
      sortable: true,
      selector: "isActive",
      width: "10%",
      cell: row => (
        <h4>
          {
            row.isActive === true &&
            <Badge color="success" pill>פעיל</Badge>
          }
          {
            row.isActive === false &&
            <Badge color="secondary" pill>לא פעיל</Badge>
          }
        </h4>
      )
    },
    {
      name: "פעולות",
      width: "15%",
      cell: row => (
        <center>
          <ButtonGroup className="btn-group--icons">
            { row.isActive === true &&
              <Button outline style={{ backgroundColor: "#9dd1fc" }} onClick={() => toggleRoutine(row.id)}>
                <span className="lnr lnr-cross-circle" data-tip="להפוך ללא פעיל" />
              </Button>
            }
            { row.isActive === false &&
              <Button outline style={{ backgroundColor: "#9dd1fc" }} onClick={() => toggleRoutine(row.id)}>
                <span className="lnr lnr-chevron-right-circle" data-tip="להפוך לפעיל" />
              </Button>
            }
            {
              <Button outline style={{ backgroundColor: "#9dd1fc" }} onClick={() => editRoutine(row.id, row)}>
                <span className="lnr lnr-pencil" data-tip="ערוך סדר יום" />
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
  buildRoutinesColumns
};
