import React from "react";

function GuessInput({
    handleSubmitGuess,
    gameStatus,
    tentativeGuess,
    setTentativeGuess,
}) {
    const [listenerReady, setListenerReady] = React.useState(false);

    const handleKeyDown = React.useCallback(
        (event) => {
            // For alphabetical characters
            if (/^[a-zA-Z]$/i.test(event.key) && tentativeGuess.length < 5) {
                setTentativeGuess((prev) => prev + event.key.toUpperCase());
            }
            // For the backspace key
            else if (event.key === "Backspace" && tentativeGuess.length > 0) {
                setTentativeGuess((prev) => prev.substring(0, prev.length - 1));
            }
            // For the Enter key
            else if (event.key === "Enter") {
                if (
                    tentativeGuess.length === 5 &&
                    /^[a-zA-Z]{5}$/.test(tentativeGuess)
                ) {
                    event.preventDefault();
                    handleSubmitGuess(tentativeGuess);
                    setTentativeGuess("");
                } else {
                    console.error(
                        ` '${tentativeGuess}' is an invalid input! Please enter a 5-letter word.`
                    );
                }
            }
        },
        [tentativeGuess, setTentativeGuess, handleSubmitGuess]
    );

    React.useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        // Added for testing purposes
        setListenerReady(true);

        // Cleanup: remove the listeners when the component is unmounted.
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <>
            <form
                autoComplete="off"
                className="guess-input-wrapper"
                data-testid={listenerReady ? "input-ready" : undefined}
                onSubmit={(event) => {
                    event.preventDefault();
                    handleSubmitGuess(tentativeGuess);
                    setTentativeGuess("");
                }}
            >
                <label htmlFor="guess-input">Enter guess:</label>
                <input
                    // ref={inputRef}
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
