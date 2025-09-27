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

  function handleBackClick() {
    setPage("start");
  }

  return (
    <div id="root">
      {page === "start" ? (
        <StartPage handleClick={() => setPage("game")} />
      ) : (
        <GamePage cards={cards} onBackClick={handleBackClick} />
      )}

      <div className={page === "start" ? "top-banner start" : "top-banner"}>
        <svg
          className="pokeball-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2m0 2c-4.08 0-7.45 3.05-7.94 7h4.07c.44-1.73 2.01-3 3.87-3s3.43 1.27 3.87 3h4.07c-.49-3.95-3.86-7-7.94-7m0 16c4.08 0 7.45-3.05 7.94-7h-4.07c-.44 1.73-2.01 3-3.87 3s-3.43-1.27-3.87-3H4.06c.49 3.95 3.86 7 7.94 7m0-10a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"
          ></path>
        </svg>
      </div>
      <div
        className={page === "start" ? "bottom-banner start" : "bottom-banner"}
      >
        {page === "start" ? (
          <div>
            @ 2025 Developed and Designed by{" "}
            <a href="https://github.com/JohnKelly-T">John Kelly C. Temeña</a>
          </div>
        ) : (
          "Click cards only once to earn points! Up to 207 cards to memorize!"
        )}
      </div>
    </div>
  );
}

export default App;
