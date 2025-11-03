export default function Die(props) {
  return (
    <>
      {/* STYLING: Change the style class depending on whether the 'isHeld' prop is true or false. 
          CLICK EVENT: When the button is clicked, run a click function that references the 'hold' prop (which is a function). Since it is a function, use the clicked button's ID as an arguement.
      */}

      <button
        className={props.isHeld ? 'btn-die-held' : 'btn-die'}
        onClick={() => props.hold(props.id)}
        aria-pressed={props.isHeld}
        aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? 'held' : 'not held'}`}
      >
        {props.value}
      </button>
    </>
  );
}
