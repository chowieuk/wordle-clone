import React from "react";
import { range } from "../../utils";

function Guess({ value }) {
    return (
        <p className="guess">
            {value
                ? value.map((cell, index) => (
                      <span
                          key={index}
                          className={`cell ${cell.status}`}
                      >
                          {cell.letter}
                      </span>
                  ))
                : range(5).map((num) => (
                      <span
                          key={num}
                          className={`cell`}
                      ></span>
                  ))}
        </p>
    );
}

export default Guess;
