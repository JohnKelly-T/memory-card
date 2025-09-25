import { useState } from "react";
import Card from "./Card";

function CardContainer({ visibleCards, onClick }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isClickEnabled, setIsClickEnabled] = useState(true);

  if (!visibleCards) return null;

  let quality = "low";
  let extension = "webp";

  function handleCardClick(id) {
    if (!isClickEnabled) {
      return;
    }

    setIsFlipped(true);
    setIsClickEnabled(false);

    onClick(id);

    setTimeout(() => {
      setIsFlipped(false);
    }, 1000);

    setTimeout(() => {
      setIsClickEnabled(true);
    }, 1500);
  }

  return (
    <div className="card-container">
      {visibleCards.map((card, index) => {
        return (
          <Card
            key={index}
            isFlipped={isFlipped}
            handleClick={() => handleCardClick(card.id)}
            imgSrc={card.image + "/" + quality + "." + extension}
          />
        );
      })}
    </div>
  );
}

export default CardContainer;
