import React from "react";

function GuessList({ guessList }) {
    return (
        <>
            <div className="guess-results">
                {guessList.map(({ id, value }) => (
                    <p
                        key={id}
                        className="guess"
                    >
                        {value}
                    </p>
                ))}
            </div>
        </>
    );
}

export default GuessList;
