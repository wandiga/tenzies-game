import { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import Die from './components/Die';
import Confetti from 'react-confetti';

export default function App() {
  // ** FUNCTION FOR GENERATING 10 RANDOM NUMBERS **
  function generateAllNewDice() {
    return Array.from({ length: 10 }, () => ({
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    })); // "Create an array from this array-like object with a length of 10, and for each of the 10 items you create, generate an object with a random ID, a 'value' key of a random number between 1 and 6 and a 'isHeld' key set to false"
  }

  // ** STATE FOR HOLDING THE 10 RANDOM NUMBERS GENERATED ABOVE **
  const [dice, setDice] = useState(() => generateAllNewDice()); // The UI re-renders when a new set of random numbers (objects) is generated through the 'generateAllNewDice' call.

  const buttonRef = useRef(null);

  // ** LOGIC FOR GAME WON. **
  // Conditions: 1. All dice must be held. 2. All dice values must be the same.
  // 'Every' is an array method that runs through each item in the 'Dice' array and checks if the conditions above are true.
  // 'gameWon' is a variable that is Boolean.
  const gameWon = dice.every((die) => die.isHeld === true) && dice.every((die) => die.value === dice[0].value);

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  // ** CHANGE THE STATE OF ONLY THE BUTTON WHO'S ID MATCHES THE CLICKED BUTTON'S ID. **
  function holdDie(id) {
    setDice((prevDice) => {
      // Calls state setter function. Uses the current array as a parameter.
      return prevDice.map((prevDie) => {
        // Maps through the current array, for each array item, calls it prevNum.
        return prevDie.id === id ? { ...prevDie, isHeld: !prevDie.isHeld } : prevDie; // For each item in the current array, check the 'Item ID' against the ID of the button that was clicked. If it matches, print the item (an object, really) and toggle the 'isHeld' value. If not, print the item as is.
      });
    });
  }

  // ** CHANGE THE SET OF BUTTONS. IF GAME IS NOT WON, GENERATE NEW BUTTONS FOR THE ONES THAT ARE NOT HELD. IF GAME IS WON, GENERATE THE WHOLE SET OF BUTTONS. **
  function rollDice() {
    if (!gameWon) {
      setDice((prevDice) => {
        return prevDice.map((prevDie) => {
          return prevDie.isHeld ? prevDie : { ...prevDie, value: Math.ceil(Math.random() * 6) }; // If the prevNum has an 'isHeld' state of true, keep the number as is. of not, create a new number object from the current one, but change the value to a new one.
        });
      });
    } else {
      setDice(generateAllNewDice());
    }
  }

  // ** MAP FUNCTION TO CREATE DIE FOR EACH RANDOM NUMBER. ALL DICE ARE PUT IN ONE ELEMENT. **
  const diceElements = dice.map((die) => <Die key={die.id} id={die.id} value={die.value} isHeld={die.isHeld} hold={holdDie} />);
  // {The hold function as a props references another function called holdDie, which accepts the props.id that were received from the clicked button as a parameter.}

  return (
    <main>
      <div className="header">
        <h1>Tenzies</h1>
        <p>
          Roll the dice until they all match. <br /> Click a die to hold it between rolls.
        </p>
      </div>
      {/* CONFETTI AFTER GAME WON */}
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <div className="dice-container">
        {/* RENDER THE DICE ELEMENTS CREATED FROM ABOVE. */}
        {diceElements}
      </div>

      <button id="btn-roll" ref={buttonRef} className="btn-roll" onClick={rollDice}>
        {gameWon ? 'New Game' : 'Roll'} {/* If the gameWon variable is true, the button label changes. */}
      </button>
    </main>
  );
}
