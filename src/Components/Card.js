import React from "react";
import front from "../img/front.png";

export default function Card({
  id,
  name,
  handlerClick,
  disabled,
  clickedCard,
  imagen,
}) {
  return (
    <div
      className={`card ${clickedCard ? "flipped" : ""}`}
      onClick={() => {
        !disabled && handlerClick(id, name);
      }}
    >
      <div className="enabled">
        <img alt={name} src={imagen} />
      </div>

      <div className="disabled">
        <img alt={name} src={front} />
      </div>
    </div>
  );
}
