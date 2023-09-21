import React from "react";

function EndBanner({ status, noOfGuesses, answer }) {
    return (
        <div className={`${status} banner`}>
            <p>
                {status === "happy" ? (
                    <>
                        <strong>Congratulations!</strong> Got it in{" "}
                        <strong>
                            {noOfGuesses === 1
                                ? "a single guess!!! 🎉"
                                : `${noOfGuesses} guesses.`}
                        </strong>
                    </>
                ) : (
                    <>
                        Sorry, the correct answer is <strong>{answer}</strong>.
                    </>
                )}
            </p>
        </div>
    );
}

export default EndBanner;
