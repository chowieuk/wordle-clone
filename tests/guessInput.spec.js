// @ts-check
import { test, expect } from "@playwright/experimental-ct-react";
import { NUM_OF_GUESSES_ALLOWED } from "../src/constants";
import { generateTestGuess } from "./utils/helpers";

test.use({ viewport: { width: 700, height: 1200 } });

test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    // TODO: replace with ENV variable?
    await page.goto("http://localhost:1234");
    // added because waitForLoadState was intermitentently missing the first one or two characters
    await page.getByTestId("input-ready").waitFor();
});

test("can input alphabetical characters, and they are formatted in uppercase", async ({
    page,
}) => {
    const guessInput = page.getByLabel("Enter guess:");
    await page.keyboard.type("guess");
    const inputValue = await guessInput.inputValue();
    expect(inputValue).toBe("GUESS");
});

test("can successfully submit a five alphabetical character guess", async ({
    page,
}) => {
    await page.keyboard.type("guess");
    await page.keyboard.press("Enter");
    const guess = page.locator(".guess").first();
    const guessTextContents = await guess.allTextContents();

    const strippedOfAccessibilityText = guessTextContents[0]
        .replace(/(misplaced|incorrect|correct)/g, "")
        .replace(/\s+/g, "");
    expect(strippedOfAccessibilityText).toBe("GUESS");
});

test("cannot submit a non five character guess", async ({ page }) => {
    const guessInput = page.getByLabel("Enter guess:");
    await page.keyboard.type("four");
    await page.keyboard.press("Enter");
    const inputValue = await guessInput.inputValue();
    expect(inputValue).toBe("FOUR");

    const guess = page.locator(".guess").first();
    const guessTextContents = await guess.allTextContents();
    expect(guessTextContents[0].replace(/\s+/g, "")).toBe("FOUR");
});

test("cannot enter more than five characters", async ({ page }) => {
    const guessInput = page.getByLabel("Enter guess:");
    await page.keyboard.type("sixsixsix");
    const inputValue = await guessInput.inputValue();
    expect(inputValue).toBe("SIXSI");
});

test("cannot enter non-alphabetical characters", async ({ page }) => {
    const guessInput = page.getByLabel("Enter guess:");
    await page.keyboard.type("12345");
    const inputValue = await guessInput.inputValue();
    expect(inputValue).toBe("");
});

test("guess input field is reset on submission", async ({ page }) => {
    const guessInput = page.getByLabel("Enter guess:");
    await page.keyboard.type("reset");
    await page.keyboard.press("Enter");
    const inputValue = await guessInput.inputValue();
    expect(inputValue).toBe("");
});
