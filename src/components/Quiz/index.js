import React, { Component, Fragment } from "react";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import { QuizMarvel } from "../quizMarvel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuizOver from "../QuizOver";

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
      btnDisabled: true,
      userAnswer: null,
      score: 0,
      quizEnd: false,
    };
    this.storedDataRef = React.createRef();
  }

  loadQuestions = (quizz) => {
    const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];

    if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
      this.storedDataRef.current = fetchedArrayQuiz;
      const newArray = fetchedArrayQuiz.map((questionObj) => questionObj); // Corrigé : Map sur les objets de question

      this.setState({ storedQuestions: newArray });
    } else {
      console.log("pas assez de questions!");
    }
  };

  showWelcomeMsg = (pseudo) => {
    toast(`Hey '${pseudo}', nice to see you!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  componentDidMount() {
    this.loadQuestions(this.state.levelsNames[this.state.quizLevel]);
    if (this.props.userData && this.props.userData.pseudo) {
      this.showWelcomeMsg(this.props.userData.pseudo);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.storedQuestions !== prevState.storedQuestions) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion]?.question,
        options:
          this.state.storedQuestions[this.state.idQuestion]?.options || [], // Ajouter une valeur par défaut vide
      });
    }

    if (this.state.idQuestion !== prevState.idQuestion) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion]?.question,
        options:
          this.state.storedQuestions[this.state.idQuestion]?.options || [], // Ajouter une valeur par défaut vide
        userAnswer: null,
        btnDisabled: true,
      });
    }
  }

  submitAnswer = (selectedAnswer) => {
    this.setState({ userAnswer: selectedAnswer, btnDisabled: false });
  };

  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      this.gameOver();
    } else {
      this.setState((prevState) => ({
        idQuestion: prevState.idQuestion + 1,
      }));
    }
    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;

    if (this.state.userAnswer === goodAnswer) {
      this.setState((prevState) => ({
        score: prevState.score + 1,
      }));
      toast.success("Well done, +1!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.error("Wrong answer, +0!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  gameOver = () => {
    this.setState({ quizEnd: true });
  };

  render() {
    // const { pseudo } = this.props.userData;
    const displayOptions = this.state.options.map((option, index) => {
      return (
        <p
          className={`answerOptions ${
            this.state.userAnswer === option ? "selected" : null
          }`}
          onClick={() => this.submitAnswer(option)}
          key={index}
        >
          {option}
        </p>
      );
    });

    return this.state.quizEnd ? (
      <QuizOver />
    ) : (
      <Fragment>
        <Levels />
        <ProgressBar />
        <h2>{this.state.question}</h2>
        {displayOptions}
        <button
          className="btnSubmit"
          disabled={this.state.btnDisabled}
          onClick={this.nextQuestion}
        >
          Suivant
        </button>

        <ToastContainer />
      </Fragment>
    );
  }
}

export default Quiz;
