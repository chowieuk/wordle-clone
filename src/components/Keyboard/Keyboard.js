import React from "react";
import KeyboardRow from "../KeyboardRow/KeyboardRow";

function Keyboard({
    topKeyRow,
    midKeyRow,
    botKeyRow,
    tentativeGuess,
    setTentativeGuess,
    handleSubmitGuess,
}) {
    return (
        <div className="keyboard-wrapper">
            <KeyboardRow
                rowKeys={topKeyRow}
                tentativeGuess={tentativeGuess}
                setTentativeGuess={setTentativeGuess}
            />
            <KeyboardRow
                rowKeys={midKeyRow}
                tentativeGuess={tentativeGuess}
                setTentativeGuess={setTentativeGuess}
            />
            <KeyboardRow
                botRow={true}
                rowKeys={botKeyRow}
                tentativeGuess={tentativeGuess}
                setTentativeGuess={setTentativeGuess}
                handleSubmitGuess={handleSubmitGuess}
            />
        </div>
    );
}

export default Keyboard;
