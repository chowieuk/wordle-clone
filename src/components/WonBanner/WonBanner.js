import React from "react";
import Banner from "../Banner/Banner";

function WonBanner({ noOfGuesses }) {
    return (
        <Banner status="happy">
            <p>
                <strong>Congratulations!</strong> Got it in{" "}
                <strong>
                    {noOfGuesses === 1
                        ? "a single guess!!! 🎉"
                        : `${noOfGuesses} guesses.`}
                </strong>
            </p>
        </Banner>
    );
}

export default WonBanner;
