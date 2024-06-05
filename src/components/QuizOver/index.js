import React, { Fragment, useEffect, useState } from "react";
import { GiTrophyCup } from "react-icons/gi";
import Modal from "../Modal";
import axios from "axios";

const QuizOver = React.forwardRef((props, ref) => {
  const { levelNames, score, maxQuestions, quizLevel, loadLevelQuestions } =
    props;
  const [asked, setAsked] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [charactersInfos, setCharactersInfos] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_PUBLIC_KEY = process.env.REACT_APP_HERO_API_KEY;

  const hash = "5b8bab94134affd718005fdc21d90179";

  useEffect(() => {
    setAsked(ref.current);

    if (localStorage.getItem("marvelStorageDate")) {
      const date = localStorage.getItem("marvelStorageDate");
      checkDataAge(date);
    }
  }, [ref]);

  const checkDataAge = (date) => {
    var today = Date.now();
    const timeDifference = today - date;

    const daysDifference = timeDifference / (1000 * 3600 * 24);

    if (daysDifference >= 15) {
      localStorage.clear();
      localStorage.setItem("marvelStorageDate", Date.now());
    }
  };

  const showModal = (id) => {
    setOpenModal(true);
    if (localStorage.getItem(id)) {
      setCharactersInfos(JSON.parse(localStorage.getItem(id)));
      setLoading(false);
    } else {
      axios
        .get(
          `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`
        )
        .then((response) => {
          setCharactersInfos(response.data);
          setLoading(false);
          localStorage.setItem(id, JSON.stringify(response.data));
          if (!localStorage.getItem("marvelStorageDate")) {
            localStorage.setItem("marvelStorageDate", Date.now());
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const hideModal = () => {
    setOpenModal(false);
    setLoading(true);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const averageGrade = maxQuestions / 2;

  if (score < averageGrade) {
    setTimeout(() => {
      loadLevelQuestions(quizLevel);
    }, 4000);
  }
  const decision =
    score >= averageGrade ? (
      <Fragment>
        <div className="stepsBtnContainer">
          {quizLevel < levelNames.length ? (
            <Fragment>
              <p className="successMsg">Bravo, passez au niveau suivant!</p>
              <button
                className="btnResult success"
                onClick={() => loadLevelQuestions(quizLevel)}
              >
                Niveau Suivant
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <p className="successMsg">
                <GiTrophyCup size={50} />
                Bravo, vous êtes un expert
              </p>
              <button
                className="btnResult gameOver"
                onClick={() => loadLevelQuestions(0)}
              >
                Acceuil
              </button>
            </Fragment>
          )}
        </div>
        <div className="percentage">
          <div className="progressPercent">
            Score : {score}/{maxQuestions}
          </div>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <div className="stepsBtnContainer">
          <p className="failureMsg">Vous avez échoué!</p>
        </div>
        <div className="percentage">
          <div className="progressPercent">
            Score : {score}/{maxQuestions}
          </div>
        </div>
      </Fragment>
    );
  const questionAnswer =
    score >= averageGrade ? (
      asked.map((question) => {
        return (
          <tr key={question.id}>
            <td>{question.question}</td>
            <td>{question.answer}</td>
            <td>
              <button
                className="btnInfo"
                onClick={() => showModal(question.heroId)}
              >
                Infos
              </button>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan={3}>
          <div className="loader"></div>
          <p style={{ textAlign: "center", color: "red" }}>Pas de réponses!</p>
        </td>
      </tr>
    );

  const resultInModal = !loading ? (
    <Fragment>
      <div className="modalHeader">
        <h2>{charactersInfos.data.results[0].name}</h2>
      </div>
      <div className="modalBody">
        <div className="comicImage">
          <img
            src={
              charactersInfos.data.results[0].thumbnail.path +
              "." +
              charactersInfos.data.results[0].thumbnail.extension
            }
            alt={charactersInfos.data.results[0].name}
          />
          <p>{charactersInfos.attributionText}</p>
        </div>
        <div className="comicDetails">
          <h3>Description</h3>
          {charactersInfos.data.results[0].description ? (
            <p>{charactersInfos.data.results[0].description}</p>
          ) : (
            <p>Description indisponible ...</p>
          )}
          <h3>Plus d'infos</h3>
          {charactersInfos.data.results[0].urls &&
            charactersInfos.data.results[0].urls.map((url, index) => {
              return (
                <a
                  key={index}
                  href={url.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {capitalizeFirstLetter(url.type)}
                </a>
              );
            })}
        </div>
      </div>
      <div className="modalFooter">
        <button className="modalBtn" onClick={hideModal}>
          Fermer
        </button>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <div className="modalHeader">
        <h2>Réponse de Marvel ...</h2>
      </div>
      <div className="modalBody">
        <div className="loader"></div>
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      {decision}
      <hr />
      <p>les réponses aux questions posées:</p>
      <div className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Questions</th>
              <th>Réponses</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody>{questionAnswer}</tbody>
        </table>
      </div>
      <Modal showModal={openModal} hideModal={hideModal}>
        {resultInModal}
      </Modal>
    </Fragment>
  );
});

export default QuizOver;
