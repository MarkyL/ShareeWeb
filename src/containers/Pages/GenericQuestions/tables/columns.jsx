import React from "react";
import ReactTooltip from "react-tooltip";
import { Button, ButtonGroup } from "reactstrap";

const buildGenericQuestionTypesColumns = (editGenericQuestion) => {
  return [
    { name: "#", selector: "id", sortable: true },
    { name: "סוג השאלה", selector: "name", sortable: true },
    {
          name: "פעולות",
          width: "15%",
          cell: row => (
            <center>
              <ButtonGroup className="btn-group--icons">
                {
                  <Button outline style={{ backgroundColor: "#9dd1fc" }} onClick={() => editGenericQuestion(row.id, row)}>
                    <span className="lnr lnr-pencil" data-tip="עריכת שאלה" />
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
  buildGenericQuestionTypesColumns
};
