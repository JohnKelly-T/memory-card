import { useEffect, useState } from "react";
import CardContainer from "../components/CardContainer";

function getInitialBestScore() {
  let storedBestScore = localStorage.getItem("bestScore");

  if (storedBestScore) {
    return Number(storedBestScore);
  }

  return 0;
}

function GamePage({ cards, onBackClick, onGameOver }) {
  const [unclickedCards, setUnclickedCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(getInitialBestScore());

  useEffect(() => {
    localStorage.setItem("bestScore", bestScore);
  }, [bestScore]);

  useEffect(() => {
    if (cards === null) {
      return;
    }
    setUnclickedCards(Object.keys(cards));
  }, [cards]);

  function getRandomIndex(n) {
    return Math.floor(Math.random() * n);
  }

  function createCardObject(id, image) {
    let card = {};
    card.id = id;
    card.image = image;

    return card;
  }

  // fisher yates shuffle
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  let visibleCards = [];

  if (cards !== null && unclickedCards.length !== 0) {
    // get up to two cards from unclicked
    for (let i = 0; i < 2; i++) {
      if (unclickedCards.length <= i) {
        break;
      }
      let randomCardId = unclickedCards[getRandomIndex(unclickedCards.length)];

      // avoid duplicates
      while (visibleCards.find((card) => card.id === randomCardId)) {
        randomCardId = unclickedCards[getRandomIndex(unclickedCards.length)];
      }

      let card = createCardObject(randomCardId, cards[randomCardId]);

      visibleCards.push(card);
    }

    // get up to four cards from clicked
    for (let i = 0; i < 4; i++) {
      if (clickedCards.length <= i) {
        break;
      }

      let randomCardId = clickedCards[getRandomIndex(clickedCards.length)];

      // avoid duplicates
      while (visibleCards.find((card) => card.id === randomCardId)) {
        randomCardId = clickedCards[getRandomIndex(clickedCards.length)];
      }

      let card = createCardObject(randomCardId, cards[randomCardId]);

      visibleCards.push(card);
    }

    // if there are remaining slots, get them from the bigger list (unclicked or clicked)
    let biggerList =
      unclickedCards.length > clickedCards.length
        ? unclickedCards
        : clickedCards;

    while (visibleCards.length < 6) {
      let randomCardId = biggerList[getRandomIndex(biggerList.length)];

      // avoid duplicates
      while (visibleCards.find((card) => card.id === randomCardId)) {
        randomCardId = biggerList[getRandomIndex(biggerList.length)];
      }

      let card = createCardObject(randomCardId, cards[randomCardId]);

      visibleCards.push(card);
    }

    // shuffle visible cards
    visibleCards = shuffle([...visibleCards]);
  }

  function handleOnClick(cardId) {
    let newClickedCards;
    let newUnclickedCards;

    if (!clickedCards.includes(cardId)) {
      newClickedCards = [...clickedCards, cardId];

      // remove clicked card id from unclicked list
      newUnclickedCards = [...unclickedCards];
      newUnclickedCards.splice(newUnclickedCards.indexOf(cardId), 1);

      // increment scores
      let nextScore = currentScore + 1;
      setCurrentScore(nextScore);

      if (nextScore > bestScore) {
        setBestScore(nextScore);
      }
    } else {
      // reset lists
      newClickedCards = [];
      newUnclickedCards = Object.keys(cards);
      // reset score
      setCurrentScore(0);
      // open gameover page
      onGameOver();
    }

    setUnclickedCards(newUnclickedCards);
    setClickedCards(newClickedCards);
  }

  return (
    <main className="gamepage">
      <div className="left">
        <svg
          className="back-button"
          onClick={onBackClick}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth={4}
            d="M44 40.836q-7.34-8.96-13.036-10.168t-10.846-.365V41L4 23.545L20.118 7v10.167q9.523.075 16.192 6.833q6.668 6.758 7.69 16.836Z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <div className="center">
        <CardContainer visibleCards={visibleCards} onClick={handleOnClick} />
      </div>
      <div className="right">
        <div className="scores">
          <div className="score-container best-score">
            Best Score
            <div className="score">{bestScore}</div>
          </div>
          <div className="score-container">
            Score
            <div className="score">{currentScore}</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default GamePage;
