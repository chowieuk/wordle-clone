// @ts-check
import { test, expect } from "@playwright/experimental-ct-react";
import { generateTestGuess } from "./utils/helpers";
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

test.use({ viewport: { width: 700, height: 1200 } });

test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    // TODO: replace with ENV variable?
    await page.goto("http://localhost:1234");
});

test("the letters of a guess are appropriately formatted in the onscreen keyboard", async ({
    page,
}) => {
    const guessInput = page.getByLabel("Enter guess:");
    const answer = await page.getByTestId("answerForTesting").innerText();
    const testGuessString = generateTestGuess(answer);

    await guessInput.fill(testGuessString);
    await guessInput.press("Enter");

    await expect(page.locator(".incorrect.keyCell")).toHaveText(
        testGuessString[0]
    );
    await expect(page.locator(".incorrect.keyCell")).toHaveText(
        testGuessString[1]
    );
    await expect(page.locator(".misplaced.keyCell")).toHaveText(
        testGuessString[2]
    );

    await expect(
        page.locator(".correct.keyCell", { hasText: testGuessString[3] })
    ).toBeVisible();
    await expect(
        page.locator(".correct.keyCell", { hasText: testGuessString[4] })
    ).toBeVisible();
});

test("correct letters are not reformatted upon subsequent guesses", async ({
    page,
}) => {
    const guessInput = page.getByLabel("Enter guess:");
    const answer = await page.getByTestId("answerForTesting").innerText();
    const testGuessString = generateTestGuess(answer);

    // Get a character not present in the answer
    let absentChar = "";
    for (let char of alphabet) {
        if (!answer.includes(char)) {
            absentChar = char;
            break;
        }
    }

    await guessInput.fill(testGuessString);
    await guessInput.press("Enter");

    // at this point we have a guess up in the form incorrect - incorrect - misplaced - correct - correct
    // we want to resubmit one of those two correct characters in one of the first three places
    // so long as those places aren't also correct

    let resubmissionString = "";

    for (let i = 0; i < 3; i++) {
        if (answer[i] === testGuessString[3]) {
            if (answer[i] === testGuessString[4]) {
                resubmissionString += absentChar;
            } else {
                resubmissionString += testGuessString[4];
            }
        } else {
            resubmissionString += testGuessString[3];
        }
    }
    resubmissionString += absentChar + absentChar;
    await guessInput.fill(resubmissionString);
    await guessInput.press("Enter");

    await expect(
        page.locator(".correct.keyCell", { hasText: answer[3] })
    ).toBeVisible();
    await expect(
        page.locator(".correct.keyCell", { hasText: answer[4] })
    ).toBeVisible();
});

test("misplaced letters cannot be reformatted as incorrect upon subsequent guess", async ({
    page,
}) => {
    const guessInput = page.getByLabel("Enter guess:");
    const answer = await page.getByTestId("answerForTesting").innerText();
    const testGuessString = generateTestGuess(answer);

    // Get a character not present in the answer
    let absentChar = "";
    for (let char of alphabet) {
        if (!answer.includes(char)) {
            absentChar = char;
            break;
        }
    }

    await guessInput.fill(testGuessString);
    await guessInput.press("Enter");

    // at this point we have a guess up in the form incorrect - incorrect - misplaced - correct - correct
    // we want to resubmit the misplaced char as incorrect

    const misplacedChar = testGuessString[2];
    let resubmissionString = "";

    for (let i = 0; i < 5; i++) {
        if (answer[i] === misplacedChar) {
            resubmissionString += absentChar;
        } else {
            resubmissionString += misplacedChar;
        }
    }

    await guessInput.fill(resubmissionString);
    await guessInput.press("Enter");

    await expect(
        page.locator(".misplaced.keyCell", { hasText: misplacedChar })
    ).toBeVisible();
});

test("misplaced letters can be reformatted as correct upon subsequent guess", async ({
    page,
}) => {
    const guessInput = page.getByLabel("Enter guess:");
    const answer = await page.getByTestId("answerForTesting").innerText();
    const testGuessString = generateTestGuess(answer);

    // Get a character not present in the answer
    let absentChar = "";
    for (let char of alphabet) {
        if (!answer.includes(char)) {
            absentChar = char;
            break;
        }
    }

    await guessInput.fill(testGuessString);
    await guessInput.press("Enter");

    // at this point we have a guess up in the form incorrect - incorrect - misplaced - correct - correct
    // we want to resubmit the misplaced char as correct

    const misplacedChar = testGuessString[2];
    let resubmissionString = "";

    for (let i = 0; i < 5; i++) {
        if (answer[i] === misplacedChar) {
            resubmissionString += misplacedChar;
        } else {
            resubmissionString += absentChar;
        }
    }

    await guessInput.fill(resubmissionString);
    await guessInput.press("Enter");

    await expect(
        page.locator(".keyCell", { hasText: misplacedChar })
    ).toHaveClass("correct keyCell");

    await expect(
        page.locator(".correct.keyCell", { hasText: misplacedChar })
    ).toBeVisible();
});
