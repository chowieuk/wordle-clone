// @ts-check
import { test, expect } from "@playwright/test";
import { NUM_OF_GUESSES_ALLOWED } from "../src/constants";
import { generateTestGuess } from "./utils/helpers";

test.use({ viewport: { width: 700, height: 1200 } });

test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    // TODO: replace with ENV variable?
    await page.goto("/");
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

            const strippedOfAccessibilityText = guessTextContents[0]
                .replace(/(misplaced|incorrect|correct)/g, "")
                .replace(/\s+/g, "");

            expect(strippedOfAccessibilityText).toBe("GUESS");
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
    const testGuessString = generateTestGuess(answer);

    for (let i = 0; i < NUM_OF_GUESSES_ALLOWED; i++) {
        // Submit the guess
        await guessInput.fill(testGuessString);
        await guessInput.press("Enter");

        // Check all the previous guesses up to the current one
        for (let j = 0; j <= i; j++) {
            const guess = page.locator(".guess").nth(j);

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

test("submitted guesses contain the expected accessibility text compared to the answer", async ({
    page,
}) => {
    const guessInput = page.getByLabel("Enter guess:");
    const answer = await page.getByTestId("answerForTesting").innerText();
    const testGuessString = generateTestGuess(answer);

    // using this function as test fails on webkit
    function normalizeWhitespace(str) {
        return str.replace(/\s+/g, " ").trim();
    }

    for (let i = 0; i < NUM_OF_GUESSES_ALLOWED; i++) {
        // Submit the guess
        await guessInput.fill(testGuessString);
        await guessInput.press("Enter");

        // Check all the previous guesses up to the current one
        for (let j = 0; j <= i; j++) {
            const guess = page.locator(".guess").nth(j);

            // Check the entire text contents of the guess including accessibility text is as expected

            // Check the class name contents of the cells is as expected
            const cellTexts = await guess.locator(".cell").allInnerTexts();

            expect(normalizeWhitespace(cellTexts[0])).toBe(
                normalizeWhitespace(`${testGuessString[0]} incorrect`)
            );
            expect(normalizeWhitespace(cellTexts[1])).toBe(
                normalizeWhitespace(`${testGuessString[1]} incorrect`)
            );
            expect(normalizeWhitespace(cellTexts[2])).toBe(
                normalizeWhitespace(`${testGuessString[2]} misplaced`)
            );
            expect(normalizeWhitespace(cellTexts[3])).toBe(
                normalizeWhitespace(`${testGuessString[3]} correct`)
            );
            expect(normalizeWhitespace(cellTexts[4])).toBe(
                normalizeWhitespace(`${testGuessString[4]} correct`)
            );
        }
    }
});
