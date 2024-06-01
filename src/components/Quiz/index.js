import React, { Component } from "react";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import { QuizMarvel } from "../quizMarvel";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      levelsNames: ["debutant", "confirme", "expert"],
      quizLevel: 0,
      maxQuestions: 10,
      storedQuestions: [],
      question: null,
      options: [],
    };
  }

  loadQuestions = (level) => {
    const fetchedArrayQuiz = QuizMarvel[0].quizz[level];
    if (fetchedArrayQuiz >= this.state.maxQuestions) {
      const newArray = fetchedArrayQuiz.map((answer, ...keepRest) => keepRest);
      this.setState({ storedQuestions: newArray });
    } else {
      console.log("pas assez de questions!");
    }
  };
  componentDidMount() {
    this.loadQuestions(this.state.levelsNames[this.state.quizLevel]);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.storedQuestions.length !== prevState.storedQuestions) {
      this.setState({ question: this.state.storedQuestions });
    }
  }
  render() {
    // const { pseudo } = this.props.userData;
    return (
      <div>
        <Levels />
        <ProgressBar />
        <h2>Notre question Quiz</h2>
        <p className="answerOptions">Question 1</p>
        <p className="answerOptions">Question 2</p>
        <p className="answerOptions">Question 3</p>
        <p className="answerOptions">Question 4a</p>
        <button className="btnSubmit">Suivant</button>
      </div>
    );
  }
}

export default Quiz;
