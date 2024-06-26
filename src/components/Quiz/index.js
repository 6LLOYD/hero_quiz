import React, { Component, Fragment } from "react";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import { QuizMarvel } from "../quizMarvel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuizOver from "../QuizOver";
import { FaChevronRight } from "react-icons/fa";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
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
      userStatus: false,
      percent: 0,
    };

    this.state = this.initialState;
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

  showToastMsg = (pseudo) => {
    if (!this.state.userStatus) {
      this.setState({ userStatus: true });
      toast(`Hey '${pseudo}', nice to see you!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  componentDidMount() {
    this.loadQuestions(this.state.levelsNames[this.state.quizLevel]);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.storedQuestions !== prevState.storedQuestions &&
      this.state.storedQuestions.length
    ) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion]?.question,
        options:
          this.state.storedQuestions[this.state.idQuestion]?.options || [], // Ajouter une valeur par défaut vide
      });
    }

    if (
      this.state.idQuestion !== prevState.idQuestion &&
      this.state.storedQuestions.length
    ) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion]?.question,
        options:
          this.state.storedQuestions[this.state.idQuestion]?.options || [], // Ajouter une valeur par défaut vide
        userAnswer: null,
        btnDisabled: true,
      });
    }
    if (this.props.userData.pseudo !== prevProps.userData.pseudo) {
      this.showToastMsg(this.props.userData.pseudo);
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

  getPercentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;

  gameOver = () => {
    const gradePercent = this.getPercentage(
      this.state.maxQuestions,
      this.state.score
    );
    if (gradePercent >= 50) {
      this.setState({
        quizLevel: this.state.quizLevel + 1,
        percent: gradePercent,
        quizEnd: true,
      });
    } else {
      this.setState({
        percent: gradePercent,
        quizEnd: true,
      });
    }
  };

  loadLevelQuestions = (param) => {
    this.setState({ ...this.initialState, quizLevel: param });
    this.loadQuestions(this.state.levelsNames[param]);
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
          <FaChevronRight /> {option}
        </p>
      );
    });

    return this.state.quizEnd ? (
      <QuizOver
        ref={this.storedDataRef}
        levelNames={this.state.levelsNames}
        score={this.state.score}
        maxQuestions={this.state.maxQuestions}
        quizLevel={this.state.quizLevel}
        percent={this.state.percent}
        loadLevelQuestions={this.loadLevelQuestions}
      />
    ) : (
      <Fragment>
        <Levels
          levelsNames={this.state.levelsNames}
          quizLevel={this.state.quizLevel}
        />
        <ProgressBar
          idQuestion={this.state.idQuestion}
          maxQuestions={this.state.maxQuestions}
          score={this.state.score}
        />
        <h2>{this.state.question}</h2>
        {displayOptions}
        <button
          className="btnSubmit"
          disabled={this.state.btnDisabled}
          onClick={this.nextQuestion}
        >
          {this.state.idQuestion < this.state.maxQuestions
            ? "Suivant"
            : "Terminer"}
        </button>

        <ToastContainer />
      </Fragment>
    );
  }
}

export default Quiz;
