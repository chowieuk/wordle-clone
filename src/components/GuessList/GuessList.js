import React from "react";
import Guess from "../Guess/Guess";
import { range } from "../../utils";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

function GuessList({ guessList }) {
    return (
        <>
            <div className="guess-results">
                {guessList.map(({ id, value }) => (
                    <Guess
                        key={id}
                        value={value}
                    ></Guess>
                ))}
                {range(guessList.length, NUM_OF_GUESSES_ALLOWED).map(() => (
                    <Guess
                        key={crypto.randomUUID()}
                        value={"     "}
                    ></Guess>
                ))}
            </div>
        </>
    );
}

export default GuessList;
