import React from "react";
import { sample } from "../../utils";
import { WORDS } from "../../data";
import { UNUSED_KEYBOARD } from "../../constants";

function ResetGameButton({
    pastAnswers,
    setAnswer,
    setGuessList,
    setGameStatus,
    setKeyboardKeys,
}) {
    const getNextAnswer = (pastAnswers) => {
        let candidate = sample(WORDS);
        while (pastAnswers.includes(candidate)) {
            candidate = sample(WORDS);
        }
        return candidate;
    };
    const reset = () => {
        const currentAnswer = getNextAnswer(pastAnswers);
        console.info({ currentAnswer, pastAnswers });
        setAnswer(currentAnswer);
        setGuessList([]);
        setGameStatus("running");
        setKeyboardKeys({ ...UNUSED_KEYBOARD });
    };
    return (
        <button
            className="reset-button"
            onClick={reset}
        >
            {" "}
            NEW GAME{" "}
        </button>
    );
}

export default ResetGameButton;
