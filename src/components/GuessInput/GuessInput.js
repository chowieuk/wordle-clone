import React from "react";

function GuessInput({ handleSubmitGuess }) {
    const [tentativeGuess, setTentativeGuess] = React.useState("");

    return (
        <>
            <form
                className="guess-input-wrapper"
                onSubmit={(event) => {
                    event.preventDefault();
                    handleSubmitGuess(tentativeGuess);
                    setTentativeGuess("");
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
                    value={tentativeGuess}
                    onChange={(event) => {
                        setTentativeGuess(
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
