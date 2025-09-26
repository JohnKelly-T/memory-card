import { useEffect, useState } from "react";
import "./styles/App.css";
import TCGdex from "@tcgdex/sdk";
import GamePage from "./pages/GamePage";
import StartPage from "./pages/Startpage";

async function getCards() {
  const tcgdex = new TCGdex("en");
  const sets = await tcgdex.fetch("sets", "sv03.5");

  return sets ? sets.cards : null;
}

function App() {
  const [cards, setCards] = useState(null);
  const [page, setPage] = useState("start");

  // initialize cards
  useEffect(() => {
    getCards().then((result) => {
      // convert array into object with ids paired to images
      let cardsObject = result.reduce((accumulator, card) => {
        accumulator[card.id] = card.image;

        return accumulator;
      }, {});

      setCards(cardsObject);
    });
  }, []);

  return (
    <div id="root">
      {page === "start" ? (
        <StartPage handleClick={() => setPage("game")} />
      ) : (
        <GamePage cards={cards} />
      )}

      <div
        className={page === "start" ? "top-banner start" : "top-banner"}
      ></div>
      <div
        className={page === "start" ? "bottom-banner start" : "bottom-banner"}
      ></div>
    </div>
  );
}

export default App;
