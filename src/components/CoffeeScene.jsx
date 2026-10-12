import CoffeeCup from "./CoffeeCup.jsx";
import Steam from "./Steam.jsx";

export default function CoffeeScene({ phase, pulse }) {
  return (
    <div className="scene">
      <h1 className="headline">
        Start your day
        <br />
        with a warm cup.
      </h1>
      <p className="lede">
        A quiet corner for good coffee, slow mornings, and better ideas.
      </p>
      <div className="cup-wrap" data-phase={phase} aria-hidden="true">
        <Steam />
        <CoffeeCup pulse={pulse} />
      </div>
    </div>
  );
}
