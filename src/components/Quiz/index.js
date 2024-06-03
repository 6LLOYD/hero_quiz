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
      idQuestion: 0,
    };
  }

  loadQuestions = (quizz) => {
    const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];

    if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
      const newArray = fetchedArrayQuiz.map((questionObj) => questionObj); // Corrigé : Map sur les objets de question

      this.setState({ storedQuestions: newArray });
    } else {
      console.log("pas assez de questions!");
    }
  };

  componentDidMount() {
    this.loadQuestions(this.state.levelsNames[this.state.quizLevel]);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.storedQuestions !== prevState.storedQuestions) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion]?.question,
        options:
          this.state.storedQuestions[this.state.idQuestion]?.options || [], // Ajouter une valeur par défaut vide
      });
    }
  }

  render() {
    // const { pseudo } = this.props.userData;
    const displayOptions = this.state.options.map((option, index) => {
      return (
        <p className="answerOptions" key={index}>
          {option}
        </p>
      );
    });

    return (
      <div>
        <Levels />
        <ProgressBar />
        <h2>{this.state.question}</h2>
        {displayOptions}
        <button className="btnSubmit">Suivant</button>
      </div>
    );
  }
}

export default Quiz;
