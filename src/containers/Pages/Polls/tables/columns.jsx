import React from "react";
import ReactTooltip from "react-tooltip";
import { Badge, Button, ButtonGroup, Progress } from "reactstrap";

const buildPollsColumns = (togglePoll, editPoll, showPollResults) => {
  return [
    { name: "#", selector: "id", sortable: true, width: "10%" },
    {
          name: "סוג",
          sortable: true,
          selector: "isGeneralPoll",
          width: "10%",
          cell: row => (
            <h4>
              {
                row.isGeneralPoll === true &&
                <Badge color="warning" pill>סקר כללי</Badge>
              }
              {
                row.isGeneralPoll === false &&
                <Badge color="primary" pill>שאלון רפואי</Badge>
              }
            </h4>
          )
        },
    { name: "תת סוג", selector: "type", sortable: true },
    { name: "כותרת", selector: "name", sortable: true },
    {
      name: "סעיפים",
      width: "5%",
      cell: row => row.pollSections.length
    },
    {
      name: "שאלות",
      width: "10%",
      cell: row => {
        return row.pollSections
          .map(section => section.questions.length)
          .reduce((a,b) => a + b, 0);
      },
    },
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
              <Button outline style={{ backgroundColor: "#9dd1fc" }} onClick={() => togglePoll(row.id)}>
                <span className="lnr lnr-cross-circle" data-tip="להפוך ללא פעיל" />
              </Button>
            }
            { row.isActive === false &&
              <Button outline style={{ backgroundColor: "#9dd1fc" }} onClick={() => togglePoll(row.id)}>
                <span className="lnr lnr-chevron-right-circle" data-tip="להפוך לפעיל" />
              </Button>
            }
            {
              <Button outline style={{ backgroundColor: "#9dd1fc" }} onClick={() => editPoll(row.id, row)}>
                <span className="lnr lnr-pencil" data-tip="ערוך סקר" />
              </Button>
            }
            {
              <Button outline style={{ backgroundColor: "#9dd1fc" }} onClick={() => showPollResults(row.id)}>
                <span className="lnr lnr-list" data-tip="תוצאות הסקר" />
              </Button>
            }
          </ButtonGroup>
          <ReactTooltip />
        </center>

      )
    }
  ];
};

const buildPollsTypesColumns = () => {
  return [
    { name: "#", selector: "id", sortable: true },
    {
          name: "סוג",
          sortable: true,
          selector: "isGeneralPoll",
          cell: row => (
            <h4>
              {
                row.isGeneralPoll === true &&
                <Badge color="warning" pill>General</Badge>
              }
              {
                row.isGeneralPoll === false &&
                <Badge color="primary" pill>Medical</Badge>
              }
            </h4>
          )
    },
    { name: "תת סוג", selector: "type", sortable: true }
  ];
};

const generalResultsColumns = () => {
  return [
    { name: "#", sortable: true, selector: "questionId", width: "10%" },
    { name: "שאלה", selector: "question", sortable: true },
    {
      name: "מספר מטופלים שענו",
      sortable: true,
      selector: "peopleAmount",
      width: "15%"
    },
    {
      name: "סוג",
      sortable: true,
      selector: "questionType",
      width: "15%",
      cell: row => (
        <h4>
          {
            row.questionType === "BOOLEAN" &&
            <Badge color="warning" pill>כן/לא</Badge>
          }
          {
            row.questionType === "TEXTUAL" &&
            <Badge color="warning" pill>טקסט חופשי</Badge>
          }
          {
            row.questionType === "NUMERICAL" &&
            <Badge color="warning" pill>דירוג מספרי 1-5</Badge>
          }
        </h4>
      )
    },
    {
      name: "תוצאות",
      cell: row => (
        <div style={{ width: "100%", textAlign: "center" }}>
        {
          row.positivePercentage && (
            <div className="progress-wrap--middle progress-wrap--blue">
              <Progress value={row.positivePercentage * 100} style={{ height: 20}}>{row.positivePercentage * 100}% ענו בחיוב </Progress>
            </div>
          )
        }
        {
          row.percentages && (
            <div>
              {
                row.percentages.map((answers, index) => {
                  return `דירוג ${index + 1}: ${answers * 100}%`;
                }).join(" | ")
              }
            </div>
          )
        }
        { row.answers && (
            <ButtonGroup className="btn-group--icons">
              <Button outline style={{ backgroundColor: "#9dd1fc" }} onClick={() => alert(row.answers.join('\n'))}>
                <span className="lnr lnr-list" data-tip="תשובות" />
              </Button>
              <ReactTooltip />
            </ButtonGroup>
          )
        }
        </div>
      )
    }
  ];
};

const ExpanableMedicalResults = ({ data }) => {
  const answers = data.pollResults.map((item, index) => {
    let booleanAnswerDisplay = "";

    if (item.answer === "true") {
      booleanAnswerDisplay = "כן";
    } else if (item.answer === "false") {
      booleanAnswerDisplay = "לא";
    }
    const displayAnswer = booleanAnswerDisplay === "" ? item.answer : booleanAnswerDisplay

    return (
      <div key={index}  style={{ textAlign: "right" }}>
        <p>
          <b>שאלה {index + 1}:</b> {item.question}
          <br />
          <b>תשובה:</b> <span>{displayAnswer}</span>
        </p>
        <p></p>
      </div>
    );
  });

  return <ul className={`rtl-support`}>{answers}</ul>;
};

const medicalResultsColumns = () => {
  const columns = [
    { name: "מ״ס המטופל", sortable: true, selector: "userId", width: "47%" },
    { name: "מ״ס טלפון", sortable: true, selector: "phoneNumber", width: "47%" },
  ];

  return columns;
};

export {
  buildPollsColumns,
  buildPollsTypesColumns,
  generalResultsColumns,
  medicalResultsColumns,
  ExpanableMedicalResults,
};
