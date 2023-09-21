import React from "react";
import Banner from "../Banner/Banner";

function WonBanner({ noOfGuesses, children }) {
    return (
        <Banner status="happy">
            <p>
                <strong>Congratulations!</strong> You got it in{" "}
                <strong>
                    {noOfGuesses === 1
                        ? "a single guess!!! 🎉"
                        : `${noOfGuesses} guesses.`}
                </strong>
                <br />
                {children}
            </p>
        </Banner>
    );
}

export default WonBanner;
