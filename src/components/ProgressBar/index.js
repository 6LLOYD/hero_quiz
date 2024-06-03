import React, { Fragment } from "react";

const ProgressBar = ({ idQuestion, maxQuestions, score }) => {
  const getWidth = (totalQuestion, questionId) => {
    return (100 / totalQuestion) * questionId;
  };

  const actualQuestion = idQuestion + 1;
  const progressPercent = getWidth(maxQuestions, actualQuestion);
  return (
    <Fragment>
      <div className="percentage">
        <div className="progressPercent">{`Question: ${actualQuestion}/${maxQuestions}`}</div>
        <div className="progressPercent">{`Score: ${score}/${maxQuestions}`}</div>
      </div>
      <div className="progressBar">
        <div
          className="progressBarChange"
          style={{ width: `${progressPercent}%` }}
        >
          {progressPercent}%
        </div>
      </div>
    </Fragment>
  );
};

export default React.memo(ProgressBar);
