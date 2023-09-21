import React from "react";

function Guess({ value }) {
    return (
        <p className="guess">
            {value.split("").map((letter) => (
                <span className="cell">{letter}</span>
            ))}
        </p>
    );
}

export default Guess;
