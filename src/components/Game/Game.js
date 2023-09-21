import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import GuessInput from "../GuessInput/GuessInput";
import GuessList from "../GuessList/GuessList";
import EndBanner from "../EndBanner";
import { checkGuess } from "../../game-helpers";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
    const [guessList, setGuessList] = React.useState([
        { id: 123, value: checkGuess("FIRST", answer) },
        { id: 456, value: checkGuess("GUESS", answer) },
    ]);

    function handleSubmitGuess(tentativeGuess) {
        if (guessList.length >= NUM_OF_GUESSES_ALLOWED) {
            return;
        }
        const nextGuessList = [
            ...guessList,
            {
                id: crypto.randomUUID(),
                value: checkGuess(tentativeGuess, answer),
            },
        ];
        setGuessList(nextGuessList);
    }
    return (
        <>
            <GuessList
                guessList={guessList}
                setGuessList={setGuessList}
            />
            {guessList.length === NUM_OF_GUESSES_ALLOWED && (
                <EndBanner
                    status="sad"
                    answer={answer}
                ></EndBanner>
            )}
            {guessList[guessList.length - 1].value
                .map((obj) => obj.letter)
                .join("") === answer && (
                <EndBanner
                    status="happy"
                    noOfGuesses={guessList.length}
                ></EndBanner>
            )}
            <GuessInput handleSubmitGuess={handleSubmitGuess} />
        </>
    );
}

export default Game;
