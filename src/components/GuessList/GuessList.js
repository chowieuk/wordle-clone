import React from "react";
import Guess from "../Guess/Guess";
import { range } from "../../utils";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

function GuessList({ guessList }) {
    return (
        <>
            <div className="guess-results">
                {range(NUM_OF_GUESSES_ALLOWED).map((num) => (
                    <Guess
                        key={
                            guessList[num]
                                ? guessList[num].id
                                : crypto.randomUUID()
                        }
                        value={guessList[num] ? guessList[num].value : null}
                    ></Guess>
                ))}
            </div>
        </>
    );
}

export default GuessList;
