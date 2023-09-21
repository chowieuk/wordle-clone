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
    const [topKeyRow, setTopKeyRow] = React.useState([
        { Q: "correct" },
        { W: "incorrect" },
        { E: "misplaced" },
        { R: "incorrect" },
        { T: "" },
        { Y: "" },
        { U: "" },
        { I: "" },
        { O: "" },
        { P: "" },
    ]);
    const [midKeyRow, setMidKeyRow] = React.useState([
        { A: "correct" },
        { S: "incorrect" },
        { D: "misplaced" },
        { F: "incorrect" },
        { G: "" },
        { H: "" },
        { J: "" },
        { K: "" },
        { L: "" },
    ]);
    const [botKeyRow, setBotKeyRow] = React.useState([
        { Z: "correct" },
        { X: "incorrect" },
        { C: "misplaced" },
        { V: "incorrect" },
        { B: "" },
        { N: "" },
        { M: "" },
    ]);
    console.log(gameStatus);

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
            {gameStatus === "lost" && <LossBanner answer={answer}></LossBanner>}
            {gameStatus === "won" && (
                <WonBanner noOfGuesses={guessList.length}></WonBanner>
            )}
            <GuessInput
                handleSubmitGuess={handleSubmitGuess}
                gameStatus={gameStatus}
            />
            <Keyboard
                topKeyRow={topKeyRow}
                midKeyRow={midKeyRow}
                botKeyRow={botKeyRow}
            ></Keyboard>
        </>
    );
}

export default Game;
