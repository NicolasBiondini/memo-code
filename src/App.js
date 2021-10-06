// https://coolors.co/03071e-370617-6a040f-9d0208-d00000-dc2f02-e85d04-f48c06-faa307-ffba08

import React, { useState, useEffect } from "react";
import "./App.css";
import Board from "./Components/Board";
import Modal from "./Components/Modal";
import logo from "./img/logoGrande.png";

//algorithm for random places
import { places } from "./functions/aleatorio";
//select difficulty
import { difficulty } from "./functions/difficulty";

function App() {
  //states of functionality
  const [cards, setCards] = useState([]);
  const [clickedCard, setClickedCard] = useState([]);
  const [clickedName, setClickedName] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [resolved, setResolved] = useState([]);
  const [finished, setFinished] = useState(false);
  const [points, setPoints] = useState(0);
  const [time, setTime] = useState([]);
  const [finishTime, setFinishTime] = useState(0);
  const [timeMetric, setTimeMetric] = useState(null);
  const [fails, setFails] = useState(0);
  const [dataUser, setDataUser] = useState([]);
  const [userName, setUserName] = useState("undefined");
  const [submitOne, setSubmitOne] = useState(true);

  //start the game
  const [visible, setVisible] = useState(false);

  //make an array of cards
  const array = difficulty();

  //click functionality
  const handlerClick = (id, name) => {
    setDisabled(true);

    if (clickedCard.length === 0) {
      setClickedCard([id]);
      setClickedName([name]);
      setDisabled(false);
    } else {
      if (sameCard(name) && sameId(id)) {
        //MAKE SOMETHING
        setDisabled(false);
      } else if (sameCard(name) && !sameId(id)) {
        //MAKE SOMETHING
        setClickedCard([...clickedCard, id]);
        setResolved([...resolved, clickedCard[0], id]);
        setClickedCard([]);
        setClickedName([]);
        setPoints(points + 1);
        isFinish();
        setDisabled(false);
      } else {
        //MAKE SOMETHING
        setFails(fails + 1);
        setClickedCard([...clickedCard, id]);
        setTimeout(() => {
          setClickedCard([]);
          setClickedName([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  const sameCard = (name) => clickedName.includes(name);
  const sameId = (id) => clickedCard.includes(id);

  //finished the game
  const isFinish = () => {
    if (resolved.length + 2 === array.length) {
      getData();
      setFinished(true);
      setTime([...time, new Date()]);
    }
  };

  //know the game time
  const countTime = () => {
    let parseTime;

    if ((time[1] - time[0]) / 1000 / 60 < 1) {
      parseTime = ((time[1] - time[0]) / 1000).toFixed(2);
      setFinishTime(parseTime);
      setTimeMetric(" seconds!");
    } else {
      parseTime = ((time[1] - time[0]) / 1000 / 60).toFixed(2);
      setFinishTime(parseTime);
      setTimeMetric(" minutes!");
    }
  };

  //reset the game
  const resetGame = () => {
    setClickedCard([]);
    setClickedName([]);
    setResolved([]);
    setPoints(0);
    setFinished(false);
    setFails(0);
    setTime([new Date()]);
    setCards(places(array));
    setSubmitOne(true);
  };

  //show modal or not
  const handlerModal = (e) => {
    e.preventDefault();
    setFinished(false);
  };

  const setData = () => {
    let playersArray = dataUser;

    let player = {
      name: userName,
      time:
        timeMetric === " seconds!" ? finishTime : (finishTime * 60).toFixed(2),
      fails: fails,
      id: `${userName}+${finishTime}+${fails}`,
    };

    playersArray.push(player);

    const compare = (a, b) => {
      if (Number(a.time) < Number(b.time)) {
        return -1;
      }
      if (Number(a.time) > Number(b.time)) {
        return 1;
      }
      return 0;
    };

    let playersArraySortered = playersArray.sort(compare);
    let playersFinal = playersArraySortered.slice(0, 3);
    setDataUser(playersFinal);

    localStorage.setItem("players", JSON.stringify(playersFinal));
  };

  const getData = () => {
    if (localStorage.getItem("players") !== null) {
      let data = localStorage.getItem("players");
      data = JSON.parse(data);
      setDataUser(data);
      return data;
    } else {
      setDataUser([]);
    }
  };

  useEffect(() => {
    if (finished) {
      countTime();
    }
  });

  return (
    <div className="App">
      {finished ? (
        <Modal
          time={finishTime}
          metrics={timeMetric}
          fails={fails}
          handlerModal={handlerModal}
          restart={resetGame}
          setData={setData}
          dataUser={dataUser}
          setUserName={setUserName}
          submitOne={submitOne}
          setSubmitOne={setSubmitOne}
        />
      ) : null}
      {visible ? (
        <Board
          cards={cards}
          clickedCard={clickedCard}
          resolved={resolved}
          handlerClick={handlerClick}
          disabled={disabled}
        />
      ) : (
        <div className="start">
          <img alt="logo memo code" src={logo} width="500px" />
          <div className="divMainButtonStart">
            <button
              className="startRealButton"
              onClick={() => {
                setCards(places(array));
                setTime([new Date()]);
                setVisible(true);
              }}
            >
              Start Now!
            </button>
          </div>
        </div>
      )}
      {visible ? (
        <div className="blue">
          <img
            alt="logo memo code"
            src={logo}
            width="90%"
            onClick={() => {
              resetGame();
              setVisible(false);
            }}
          />
          {finished ? <h1>{finishTime + timeMetric}</h1> : null}
          <div id="points">
            <h2>Fails :</h2>
            <h3>{fails}</h3>
          </div>
          {!finished && (
            <button id="button-blue" onClick={() => resetGame()}>
              Reset Level
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default App;
