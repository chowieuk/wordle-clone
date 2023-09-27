import React from "react";
import { range } from "../../utils";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";

function Cell({ letter, status }) {
    const className = status ? `cell ${status}` : "cell";
    return (
        <span className={className}>
            {letter} <VisuallyHidden>{status && `${status}`}</VisuallyHidden>
        </span>
    );
}

function Guess({ value }) {
    return (
        <p className="guess">
            {range(5).map((num) => (
                <Cell
                    key={num}
                    letter={value && value[num] ? value[num].letter : ""}
                    status={value && value[num] ? value[num].status : undefined}
                />
            ))}
        </p>
    );
}
export default Guess;
