import React from "react";

function GuessInput({ handleSubmitGuess, gameStatus }) {
    const [tentativeGuess, setTentativeGuess] = React.useState("");
    // Focus input on mount
    const inputRef = React.useRef(null);
    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []); // Empty dependency array to ensure useEffect runs only once

    return (
        <>
            <form
                autoComplete="off"
                className="guess-input-wrapper"
                onSubmit={(event) => {
                    event.preventDefault();
                    handleSubmitGuess(tentativeGuess);
                    setTentativeGuess("");
                }}
            >
                <label htmlFor="guess-input">Enter guess:</label>
                <input
                    ref={inputRef}
                    id="guess-input"
                    type="text"
                    disabled={gameStatus !== "running"}
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
