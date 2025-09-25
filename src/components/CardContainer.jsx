import { useEffect, useRef, useState } from "react";
import Card from "./Card";

function CardContainer({ visibleCards, onClick }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isClickEnabled, setIsClickEnabled] = useState(true);
  const [displayCards, setDisplayCards] = useState(visibleCards);
  const prevCards = useRef(visibleCards);

  useEffect(() => {
    if (JSON.stringify(prevCards) !== JSON.stringify(visibleCards)) {
      setIsFlipped(true);

      setTimeout(() => {
        prevCards.current = visibleCards;
        setDisplayCards(visibleCards);
        setIsFlipped(false);
      }, 1000);
    }
  }, [visibleCards]);

  if (!visibleCards) return null;

  let quality = "low";
  let extension = "webp";

  function handleCardClick(id) {
    if (!isClickEnabled) {
      return;
    }

    setIsClickEnabled(false);
    onClick(id);

    setTimeout(() => {
      setIsClickEnabled(true);
    }, 1500);
  }

  return (
    <div className="card-container">
      {displayCards.map((card, index) => {
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
