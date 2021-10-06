import React from "react";
import Card from "../Components/Card";

export default function Board({
  cards,
  handlerClick,
  disabled,
  clickedCard,
  resolved,
}) {
  return (
    <div className="red">
      {cards.map((card) => {
        return (
          <Card
            clickedCard={
              clickedCard.includes(card.card.id) ||
              resolved.includes(card.card.id)
            }
            disabled={disabled || resolved.includes(card.card.id)}
            handlerClick={handlerClick}
            key={card.card.id}
            id={card.card.id}
            name={card.card.name}
            imagen={card.card.img}
          />
        );
      })}
    </div>
  );
}
