import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import "../styles/modal.css";

export default function Modal({
  time,
  metrics,
  fails,
  handlerModal,
  restart,
  setData,
  dataUser,
  setUserName,
  submitOne,
  setSubmitOne,
}) {
  return (
    <div className="modal">
      <div className="containerModal">
        <FontAwesomeIcon
          icon={faTimes}
          className="modalIcon"
          size="3x"
          onClick={handlerModal}
        />
        <h1 className="modalTitle">Congrats!</h1>
        <div className="modalStats">
          <div className="modalStatsMiniContainers">
            <p className="modalStatsMiniContainersTitle">Your time was:</p>
            <p className="modalStatsMiniContainersMetrics">{time + metrics}</p>
          </div>
          <div className="modalStatsMiniContainers">
            <p className="modalStatsMiniContainersTitle">And yours fails:</p>
            <p className="modalStatsMiniContainersMetrics">{fails}</p>
          </div>
        </div>
        <table>
          <tr className="firstTr">
            <th className="firstTh">TOP 3</th>
            <th className="firstTh">Player</th>
            <th className="firstTh">Time (in seconds)</th>
            <th className="firstTh">Fails</th>
          </tr>
          {dataUser.map((user, index) => {
            return (
              <tr key={user.id}>
                <th>{index + 1}</th>
                <th>{user.name}</th>
                <th>{user.time}</th>
                <th>{user.fails}</th>
              </tr>
            );
          })}
        </table>
        <div className="perspective">
          <div className="divMainButtonStart">
            <button className="startRealButton" onClick={restart}>
              Play Again!
            </button>
          </div>
        </div>

        {submitOne ? (
          <form
            id="modalForm"
            onSubmit={(e) => {
              e.preventDefault();
              setData();
              setSubmitOne(false);
            }}
          >
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              required={true}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <button id="submit" type="submit">
              Submit
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}
