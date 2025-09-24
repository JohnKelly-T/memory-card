import { useState } from "react";
import pokemonCardBack from "../assets/img/pokemon-card-back.webp";

function Card({ handleClick, imgSrc }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="card" onClick={handleClick}>
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
