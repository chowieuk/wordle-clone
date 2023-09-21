import React from "react";
import Banner from "../Banner/Banner";

function LossBanner({ answer, children }) {
    return (
        <Banner status="sad">
            <p>
                Sorry, the correct answer is <strong>{answer}</strong>.
                <br />
                {children}
            </p>
        </Banner>
    );
}

export default LossBanner;
