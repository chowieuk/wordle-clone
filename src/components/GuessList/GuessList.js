import React from "react";
import Guess from "../Guess/Guess";
import { range } from "../../utils";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

function GuessList({ guessList }) {
    return (
        <>
            <div className="guess-results">
                {/* 
                {
                  How would I achieve this using a single loop?
                  we would loop over the range from 0 to the limit
                  but then we need to only include a Guess with a value
                  if a value exists?
                  Seems very inefficent and confusing.
                }
                */}
                {range(0, NUM_OF_GUESSES_ALLOWED).map((num) => (
                    <Guess
                        key={
                            guessList[num]
                                ? guessList[num].id
                                : crypto.randomUUID()
                        }
                        value={guessList[num] ? guessList[num].value : "     "}
                    ></Guess>
                ))}
                {/* {guessList.map(({ id, value }) => (
                    <Guess
                        key={id}
                        value={value}
                    ></Guess>
                ))}
                {range(guessList.length, NUM_OF_GUESSES_ALLOWED).map(() => (
                    <Guess
                        key={crypto.randomUUID()}
                        value={"     "}
                    ></Guess>
                ))} */}
            </div>
        </>
    );
}

export default GuessList;
