import React from "react";

function KeyboardKeyCell({ letter, status }) {
    return <div className={`${status} keyCell`}>{letter}</div>;
}

function KeyboardRow({ rowKeys }) {
    // console.log(Object.entries(rowKeys));
    return (
        <div className="keyboard-row">
            {rowKeys.map((entry) => {
                const [letter, status] = entry;
                return (
                    <KeyboardKeyCell
                        key={letter}
                        letter={letter}
                        status={status}
                    />
                );
            })}
        </div>
    );
}

export default KeyboardRow;
