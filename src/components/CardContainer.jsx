function CardContainer({ visibleCards }) {
  if (!visibleCards) return null;

  let quality = "high";
  let extension = "webp";

  return (
    <div className="card-container">
      {visibleCards.map((card) => {
        return (
          <div key={card.id} className="card">
            <img src={card.image + "/" + quality + "." + extension} alt="" />
          </div>
        );
      })}
    </div>
  );
}

export default CardContainer;
