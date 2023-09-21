import React from "react";
import KeyboardRow from "../KeyboardRow/KeyboardRow";

function Keyboard({ topKeyRow, midKeyRow, botKeyRow }) {
    return (
        <div className="keyboard-wrapper">
            <KeyboardRow rowKeys={topKeyRow} />
            <KeyboardRow rowKeys={midKeyRow} />
            <KeyboardRow rowKeys={botKeyRow} />
        </div>
    );
}

export default Keyboard;
