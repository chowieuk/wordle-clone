// @ts-check
import { test, expect } from "@playwright/experimental-ct-react";
import { range } from "../src/utils";
import { NUM_OF_GUESSES_ALLOWED } from "../src/constants";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

test.use({ viewport: { width: 700, height: 1200 } });

test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    // TODO: replace with ENV variable?
    await page.goto("http://localhost:1234");
});

test("submitted guesses are rendered in the appropriate entry in the guess list", async ({
    page,
}) => {
    const guessInput = page.getByLabel("Enter guess:");
    for (let i = 0; i < NUM_OF_GUESSES_ALLOWED; i++) {
        // Submit the guess
        await guessInput.fill("GUESS");
        await guessInput.press("Enter");

        // Check all the previous guesses up to the current one
        for (let j = 0; j <= i; j++) {
            const guess = page.locator(".guess").nth(j);
            const guessTextContents = await guess.allTextContents();
            expect(guessTextContents[0]).toBe("GUESS");
        }
    }
});

// in this test we build a test string that is two incorrect letters
// followed by a misplaced and then two correct letters
// we then ensure that formatting is as expected  for this test string across all guesses
test("submitted guesses are formatted appropriately when compared to the answer", async ({
    page,
}) => {
    const guessInput = page.getByLabel("Enter guess:");
    const answer = await page.getByTestId("answerForTesting").innerText();

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

    for (let i = 0; i < NUM_OF_GUESSES_ALLOWED; i++) {
        // Submit the guess
        await guessInput.fill(testGuessString);
        await guessInput.press("Enter");

        // Check all the previous guesses up to the current one
        for (let j = 0; j <= i; j++) {
            const guess = page.locator(".guess").nth(j);

            // Check the text contents of the guess is as expected

            const guessTextContents = await guess.allTextContents();
            expect(guessTextContents[0]).toBe(testGuessString);

            // Check the class name contents of the cells is as expected
            const cells = await guess.locator(".cell").all();
            const classNames = await Promise.all(
                cells.map(async (cell) => {
                    return cell.getAttribute("class");
                })
            );

            expect(classNames[0]).toBe("cell incorrect");
            expect(classNames[1]).toBe("cell incorrect");
            expect(classNames[2]).toBe("cell misplaced");
            expect(classNames[3]).toBe("cell correct");
            expect(classNames[4]).toBe("cell correct");
        }
    }
});
