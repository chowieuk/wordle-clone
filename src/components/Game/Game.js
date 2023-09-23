import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED, UNUSED_KEYBOARD } from "../../constants";
import { checkGuess } from "../../game-helpers";

import GuessList from "../GuessList/GuessList";
import GuessInput from "../GuessInput/GuessInput";
import Keyboard from "../Keyboard/Keyboard";
import LossBanner from "../LossBanner/LossBanner";
import WonBanner from "../WonBanner/WonBanner";
import ResetGameButton from "../ResetGameButton/ResetGameButton";

function Game() {
    //set our wordlist in stone

    // Pick a random word on mount
    const [answer, setAnswer] = React.useState(() => {
        const currentAnswer = sample(WORDS);
        // To make debugging easier, we'll log the solution in the console.
        console.info({ currentAnswer });
        return currentAnswer;
    });
    const [pastAnswers, setPastAnswers] = React.useState([]);
    const [guessList, setGuessList] = React.useState([]);
    const [gameStatus, setGameStatus] = React.useState("running");
    const [keyboardKeys, setKeyboardKeys] = React.useState({
        ...UNUSED_KEYBOARD,
    });

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

        if (
            (tentativeGuess !== answer && nextGuessList.length) ===
            NUM_OF_GUESSES_ALLOWED
        ) {
            const nextPastAnswers = [...pastAnswers, answer];
            setPastAnswers(nextPastAnswers);
            setGameStatus("lost");
        } else if (tentativeGuess === answer) {
            const nextPastAnswers = [...pastAnswers, answer];
            setPastAnswers(nextPastAnswers);
            setGameStatus("won");
        }
    }
    return (
        <>
            <div
                data-testid="answerForTesting"
                style={{ display: "none" }}
            >
                {answer}
            </div>
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
                botKeyRow={Object.entries(keyboardKeys).slice(19)}
            ></Keyboard>
            {gameStatus === "lost" && (
                <LossBanner answer={answer}>
                    {pastAnswers.length < WORDS.length ? (
                        <ResetGameButton
                            pastAnswers={pastAnswers}
                            setAnswer={setAnswer}
                            setGuessList={setGuessList}
                            setGameStatus={setGameStatus}
                            setKeyboardKeys={setKeyboardKeys}
                        />
                    ) : (
                        "Woah you completed all the answers, good job!"
                    )}
                </LossBanner>
            )}
            {gameStatus === "won" && (
                <WonBanner noOfGuesses={guessList.length}>
                    {pastAnswers.length < WORDS.length ? (
                        <ResetGameButton
                            pastAnswers={pastAnswers}
                            setAnswer={setAnswer}
                            setGuessList={setGuessList}
                            setGameStatus={setGameStatus}
                            setKeyboardKeys={setKeyboardKeys}
                        />
                    ) : (
                        "Woah you completed all the answers, good job!"
                    )}
                </WonBanner>
            )}
        </>
    );
}

export default Game;
