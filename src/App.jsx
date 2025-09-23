import { useEffect, useState } from "react";
import "./styles/App.css";
import TCGdex from "@tcgdex/sdk";
import CardContainer from "./components/CardContainer";

async function getCards() {
  const tcgdex = new TCGdex("en");
  const sets = await tcgdex.fetch("sets", "sv03.5");

  return sets ? sets.cards : null;
}

function App() {
  const [cards, setCards] = useState(null);
  const [unclickedCards, setUnclickedCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);

  // initialize cards
  useEffect(() => {
    getCards().then((result) => {
      // convert array into object with ids paired to images
      let cardsObject = result.reduce((accumulator, card) => {
        accumulator[card.id] = card.image;

        return accumulator;
      }, {});

      setCards(cardsObject);
      setUnclickedCards(Object.keys(cardsObject));
    });
  }, []);

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

  if (cards !== null) {
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
      unclickedCards.splice(unclickedCards.indexOf(cardId), 1);
    } else {
      newClickedCards = [...clickedCards];
    }

    newUnclickedCards = unclickedCards;

    setClickedCards(newClickedCards);
    setUnclickedCards(newUnclickedCards);
  }

  return (
    <div id="root">
      <div className="top-banner"></div>
      <div className="bottom-banner"></div>
      <main>
        <div className="left"></div>
        <div className="center">
          <CardContainer visibleCards={visibleCards} onClick={handleOnClick} />
        </div>
        <div className="right">
          <div className="scores">
            <div className="score-container best-score">
              Best Score
              <div className="score">9</div>
            </div>
            <div className="score-container">
              Score
              <div className="score">3</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
