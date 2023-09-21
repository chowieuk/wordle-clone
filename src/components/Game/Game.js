import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import GuessInput from "../GuessInput/GuessInput";
import GuessList from "../GuessList/GuessList";
import { checkGuess } from "../../game-helpers";
import LossBanner from "../LossBanner";
import WonBanner from "../WonBanner/WonBanner";
import Keyboard from "../Keyboard/Keyboard";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });
function Game() {
    const [guessList, setGuessList] = React.useState([]);
    const [gameStatus, setGameStatus] = React.useState("running");
    const [keyboardKeys, setKeyboardKeys] = React.useState({
        Q: "",
        W: "",
        E: "",
        R: "",
        T: "",
        Y: "",
        U: "",
        I: "",
        O: "",
        P: "",
        A: "",
        S: "",
        D: "",
        F: "",
        G: "",
        H: "",
        J: "",
        K: "",
        L: "",
        Z: "",
        X: "",
        C: "",
        V: "",
        B: "",
        N: "",
        M: "",
    });
    console.log(gameStatus);

    function handleSubmitGuess(tentativeGuess) {
        if (guessList.length >= NUM_OF_GUESSES_ALLOWED) {
            return;
        }
        const checkedGuessResult = checkGuess(tentativeGuess, answer);

        for (let { letter, status } of checkedGuessResult) {
            if (keyboardKeys[letter] === "correct") {
                continue;
            } else if (
                keyboardKeys[letter] === "misplaced" &&
                status !== "correct"
            ) {
                continue;
            } else {
                const nextKeyboard = keyboardKeys;
                nextKeyboard[letter] = status;
                setKeyboardKeys(nextKeyboard);
            }
        }

        const nextGuessList = [
            ...guessList,
            {
                id: crypto.randomUUID(),
                value: checkedGuessResult,
            },
        ];
        setGuessList(nextGuessList);

        if (nextGuessList.length === NUM_OF_GUESSES_ALLOWED) {
            setGameStatus("lost");
        } else if (tentativeGuess === answer) {
            setGameStatus("won");
        }
    }
    return (
        <>
            <GuessList
                guessList={guessList}
                setGuessList={setGuessList}
            />
            <GuessInput
                handleSubmitGuess={handleSubmitGuess}
                gameStatus={gameStatus}
            />
            <Keyboard
                topKeyRow={Object.entries(keyboardKeys).slice(0, 10)}
                midKeyRow={Object.entries(keyboardKeys).slice(10, 19)}
                botKeyRow={Object.entries(keyboardKeys).slice(19, 25)}
            ></Keyboard>
            {gameStatus === "lost" && <LossBanner answer={answer}></LossBanner>}
            {gameStatus === "won" && (
                <WonBanner noOfGuesses={guessList.length}></WonBanner>
            )}
        </>
    );
}

export default Game;
