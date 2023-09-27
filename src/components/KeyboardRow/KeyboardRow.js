import React from "react";

function KeyboardKeyCell({ letter, status, onKeyPress }) {
    return (
        <div
            className={`${status} keyCell`}
            onClick={() => onKeyPress(letter)}
        >
            {letter}
        </div>
    );
}

function EnterKeyCell({
    tentativeGuess,
    handleSubmitGuess,
    setTentativeGuess,
}) {
    return (
        <div
            className={" keyCell"}
            onClick={() => {
                // For the Enter key

                if (
                    tentativeGuess.length === 5 &&
                    /^[a-zA-Z]{5}$/.test(tentativeGuess)
                ) {
                    handleSubmitGuess(tentativeGuess);
                    setTentativeGuess("");
                } else {
                    console.error(
                        ` '${tentativeGuess}' is an invalid input! Please enter a 5-letter word.`
                    );
                }
            }}
        >
            Enter
        </div>
    );
}

function BackspaceKeyCell({ onKeyPress }) {
    return (
        <div
            className={" keyCell"}
            onClick={onKeyPress}
        >
            &lt;
        </div>
    );
}

function KeyboardRow({
    rowKeys,
    botRow,
    tentativeGuess,
    setTentativeGuess,
    handleSubmitGuess,
}) {
    const handleKeyPress = (keyLetter) => {
        const nextTentativeGuess = (tentativeGuess += keyLetter);
        setTentativeGuess(nextTentativeGuess);
        console.log(`user pressed ${keyLetter}, giving ${nextTentativeGuess}`);
    };

    const handleBackspace = () => {
        const nextTentativeGuess = tentativeGuess.slice(0, -1);
        setTentativeGuess(nextTentativeGuess);
        console.log(`user pressed Backspace, giving ${nextTentativeGuess}`);
    };

    return (
        <div className="keyboard-row">
            {!!botRow === true && (
                <EnterKeyCell
                    tentativeGuess={tentativeGuess}
                    handleSubmitGuess={handleSubmitGuess}
                    setTentativeGuess={setTentativeGuess}
                />
            )}
            {rowKeys.map((entry) => {
                const [letter, status] = entry;
                return (
                    <KeyboardKeyCell
                        key={letter}
                        letter={letter}
                        status={status}
                        onKeyPress={handleKeyPress}
                        tentativeGuess={tentativeGuess}
                        setTentativeGuess={setTentativeGuess}
                    />
                );
            })}
            {!!botRow === true && (
                <BackspaceKeyCell
                    onKeyPress={handleBackspace}
                    tentativeGuess={tentativeGuess}
                    setTentativeGuess={setTentativeGuess}
                />
            )}
        </div>
    );
}

export default KeyboardRow;
