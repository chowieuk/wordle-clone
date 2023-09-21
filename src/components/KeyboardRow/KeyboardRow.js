import React from "react";

function KeyboardKeyCell({ value, status }) {
    return <div className={`${status} keyCell`}>{value}</div>;
}

function KeyboardRow({ rowKeys }) {
    // console.log(Object.entries(rowKeys));
    return (
        <div className="keyboard-row">
            {rowKeys.map((obj) => {
                const [key, value] = Object.entries(obj)[0];
                return (
                    <KeyboardKeyCell
                        key={key}
                        value={key}
                        status={value}
                    />
                );
            })}
        </div>
    );
}

export default KeyboardRow;
