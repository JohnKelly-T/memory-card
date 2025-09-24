function CardContainer({ visibleCards, onClick }) {
  if (!visibleCards) return null;

  let quality = "low";
  let extension = "webp";

  return (
    <div className="card-container">
      {visibleCards.map((card) => {
        return (
          <div key={card.id} className="card" onClick={() => onClick(card.id)}>
            <img src={card.image + "/" + quality + "." + extension} alt="" />
          </div>
        );
      })}
    </div>
  );
}

export default CardContainer;
