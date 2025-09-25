import pokemonCardBack from "../assets/img/pokemon-card-back.webp";

function Card({ handleClick, isFlipped, imgSrc }) {
  return (
    <div className={isFlipped ? "card flipped" : "card"} onClick={handleClick}>
      <div className="card-front">
        <img src={imgSrc} />
      </div>
      <div className="card-back">
        <img src={pokemonCardBack} />
      </div>
    </div>
  );
}

export default Card;
