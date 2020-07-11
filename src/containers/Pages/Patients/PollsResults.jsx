import React from "react";
import PollResultsPanel from './components/PollResultsPanel';

const PollsResults = ({ results }) => {
  const components = results.reverse().map(
    (poll, pollIndex) => {
      const pollIndexKey = `poll_results_${pollIndex}`;

      return (
        <PollResultsPanel
          key={pollIndexKey} title={`סקר ${poll.pollName}`} collapsed={pollIndex + 1 === results.length ? false : true}
        >
          <form className="form form--horizontal form__half">
            {
              poll.pollResults.map((result, index) => {
                let booleanAnswerDisplay = "";

                if (result.answer === "true") {
                  booleanAnswerDisplay = "כן";
                } else if (result.answer === "false") {
                  booleanAnswerDisplay = "לא";
                }

                return (
                  <div key={index} className="form__form-group">
                    <span className="form__form-group-label" style={{ width: "60%" }}><b>{index + 1} - {result.question}:</b></span>
                    <div className="form__form-group-field" style={{ width: "60%" }}>
                      <br/>{booleanAnswerDisplay === "" ? result.answer : booleanAnswerDisplay}
                    </div>
                  </div>
                );
              })
            }
          </form>
        </PollResultsPanel>
      )
    }
  );

  return components;
}

export default PollsResults;
