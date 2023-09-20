import React from "react";

function Guess({ children }) {
    return (
        <p className="guess">
            {children.split("").map((letter) => (
                <span className="cell">{letter}</span>
            ))}
        </p>
    );
}

export default Guess;
