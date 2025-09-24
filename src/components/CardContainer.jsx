import Card from "./Card";

function CardContainer({ visibleCards, onClick }) {
  if (!visibleCards) return null;

  let quality = "low";
  let extension = "webp";

  return (
    <div className="card-container">
      {visibleCards.map((card) => {
        return (
          <Card
            key={card.id}
            handleClick={() => onClick(card.id)}
            imgSrc={card.image + "/" + quality + "." + extension}
          />
        );
      })}
    </div>
  );
}

export default CardContainer;
