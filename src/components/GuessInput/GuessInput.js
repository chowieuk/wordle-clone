import React from "react";

function GuessInput({
    handleSubmitGuess,
    gameStatus,
    tentativeGuess,
    setTentativeGuess,
}) {
    const handleKeyDown = (event) => {
        // For alphanumeric characters
        if (/^[a-zA-Z0-9]$/i.test(event.key) && tentativeGuess.length < 5) {
            setTentativeGuess((prev) => prev + event.key.toUpperCase());
        }
        // For the backspace key
        else if (event.key === "Backspace" && tentativeGuess.length > 0) {
            setTentativeGuess((prev) => prev.substring(0, prev.length - 1));
        }
        // For the Enter key
        else if (event.key === "Enter") {
            event.preventDefault();
            handleSubmitGuess(tentativeGuess);
            setTentativeGuess("");
        }
    };

    React.useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        // document.addEventListener("keyup", handleKeyUp);

        // Cleanup: remove the listeners when the component is unmounted.
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            // document.removeEventListener("keyup", handleKeyUp);
        };
    }, [tentativeGuess]); // Dependency array ensures the effect runs whenever inputValue changes

    // // Focus input on mount
    // const inputRef = React.useRef(null);
    // React.useEffect(() => {
    //     if (inputRef.current) {
    //         inputRef.current.focus();
    //     }
    // }, []); // Empty dependency array to ensure useEffect runs only once

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
