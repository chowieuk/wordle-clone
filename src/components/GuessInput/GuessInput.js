import React from "react";

function GuessInput({ guess, setGuess, handleSubmitGuess }) {
    return (
        <>
            <form
                className="guess-input-wrapper"
                onSubmit={(event) => {
                    event.preventDefault();
                    handleSubmitGuess(guess);
                    setGuess("");
                }}
            >
                <label htmlFor="guess-input">Enter guess:</label>
                <input
                    id="guess-input"
                    type="text"
                    minLength={5}
                    maxLength={5}
                    pattern="[a-zA-Z]{5}"
                    title="5 letter word"
                    value={guess}
                    onChange={(event) => {
                        setGuess(
                            event.target.value
                                .replace(/[^a-z]/gi, "")
                                .toUpperCase()
                        );
                    }}
                />
            </form>
        </>
    );
}

export default GuessInput;
