function GameOverPage({ handleQuit, handlePlayAgain }) {
  return (
    <main className="gameoverpage">
      <div className="gameover-message">Oops! You clicked a card twice.</div>
      <div className="options">
        <button className="quit-button" onClick={handleQuit}>
          Quit
        </button>
        <button className="play-again-button" onClick={handlePlayAgain}>
          Play Again
        </button>
      </div>
    </main>
  );
}

export default GameOverPage;
