import pokemonCardBack from "../assets/img/pokemon-card-back.webp";
import Tilt from "react-parallax-tilt";

function Card({ handleClick, isFlipped, imgSrc }) {
  return (
    <div className={isFlipped ? "card flipped" : "card"} onClick={handleClick}>
      <Tilt
        className="tilt"
        glareEnable={true}
        glareMaxOpacity={0.9}
        glareColor="#e6ddad"
        glarePosition="bottom"
        glareBorderRadius="20px"
      >
        <div className="card-front">
          <img src={imgSrc} />
        </div>
        <div className="card-back">
          <img src={pokemonCardBack} />
        </div>
      </Tilt>
    </div>
  );
}

export default Card;
