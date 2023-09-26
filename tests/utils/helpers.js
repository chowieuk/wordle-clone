//@ts-check

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Generates a test string which is guaranteed to return a guess with letters
// of the form: incorrect - incorrect - misplaced - correct - correct
export const generateTestGuess = (answer) => {
    // Get a character not present in the answer
    let absentChar = "";
    for (let char of alphabet) {
        if (!answer.includes(char)) {
            absentChar = char;
            break;
        }
    }

    // Get a misplaced character using the first two answer characters
    // (we're assuming the first three letters aren't the same)
    let potentialMisplacedChars = [answer[0], answer[1]];

    let misplacedChar;
    do {
        const randomIndex = Math.floor(
            Math.random() * potentialMisplacedChars.length
        );
        misplacedChar = potentialMisplacedChars[randomIndex];
    } while (misplacedChar === answer[2]);

    // Construct the test string
    let testGuessString = absentChar + absentChar; // start with the absent characters twice
    testGuessString += misplacedChar; // add the misplaced character we took from our first two

    // Add the remaining correct characters to complete the 5-char length
    testGuessString += answer.slice(testGuessString.length);
    return testGuessString;
};
