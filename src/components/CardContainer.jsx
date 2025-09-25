import { useState } from "react";
import Card from "./Card";

function CardContainer({ visibleCards, onClick }) {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!visibleCards) return null;

  let quality = "low";
  let extension = "webp";

  function handleCardClick(id) {
    setIsFlipped(true);

    setTimeout(() => {
      onClick(id);
    }, 500);

    setTimeout(() => {
      setIsFlipped(false);
    }, 1000);
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
