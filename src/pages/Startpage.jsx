function StartPage({ handleClick }) {
  return (
    <main className="startpage">
      <div className="sitename">
        PokéMemory <i>EX</i>
      </div>

      <div className="pokeball-button" onClick={handleClick}>
        <div className="pokeball-inner-button"></div>
      </div>
    </main>
  );
}

export default StartPage;
