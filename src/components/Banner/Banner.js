import React from "react";

function Banner({ status, children }) {
    console.log(status);
    return <div className={`${status} banner`}>{children}</div>;
}

export default Banner;
