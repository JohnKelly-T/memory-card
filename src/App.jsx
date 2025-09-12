import { useEffect, useState } from "react";
import "./styles/App.css";
import TCGdex from "@tcgdex/sdk";
import CardContainer from "./components/CardContainer";

async function getCards() {
  const tcgdex = new TCGdex("en");
  const sets = await tcgdex.fetch("sets", "sv03.5");

  return sets.cards;
}

function App() {
  const [cards, setCards] = useState(null);

  useEffect(() => {
    getCards().then((result) => setCards(result));
  }, []);

  let visibleCards = cards ? cards.slice(0, 6) : null;

  console.log(visibleCards);

  return (
    <div id="root">
      <div className="top-banner"></div>
      <div className="bottom-banner"></div>
      <main>
        <div className="left"></div>
        <div className="center">
          <CardContainer visibleCards={visibleCards} />
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
