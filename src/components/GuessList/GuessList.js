import React from "react";
import Guess from "../Guess/Guess";
import { range } from "../../utils";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

function stringToObjectArray(str) {
    return str.split("").map((char) => ({ letter: char }));
}

function GuessList({ guessList, tentativeGuess, gameStatus }) {
    return (
        <>
            <div className="guess-results">
                {range(guessList.length).map((num) => (
                    <Guess
                        key={guessList[num].id}
                        value={guessList[num].value}
                    ></Guess>
                ))}
                {gameStatus === "running" && (
                    <Guess value={stringToObjectArray(tentativeGuess)}></Guess>
                )}
                {range(NUM_OF_GUESSES_ALLOWED - guessList.length - 1).map(
                    () => (
                        <Guess key={crypto.randomUUID()}></Guess>
                    )
                )}
            </div>
        </>
    );
}

export default GuessList;
