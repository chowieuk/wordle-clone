import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import GuessInput from "../GuessInput/GuessInput";
import GuessList from "../GuessList/GuessList";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
    const [guessList, setGuessList] = React.useState([
        { id: 123, value: "FIRST" },
        { id: 456, value: "GUESS" },
    ]);

    function handleSubmitGuess(tentativeGuess) {
        if (guessList.length >= NUM_OF_GUESSES_ALLOWED) {
            return;
        }
        console.log(tentativeGuess);
        const nextGuessList = [
            ...guessList,
            { id: crypto.randomUUID(), value: tentativeGuess },
        ];
        setGuessList(nextGuessList);
    }
    return (
        <>
            <GuessList
                guessList={guessList}
                setGuessList={setGuessList}
            />
            <GuessInput handleSubmitGuess={handleSubmitGuess} />
        </>
    );
}

export default Game;
