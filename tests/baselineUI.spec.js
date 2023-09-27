// @ts-check
import { test, expect } from "@playwright/experimental-ct-react";
import { NUM_OF_GUESSES_ALLOWED, UNUSED_KEYBOARD } from "../src/constants";

test.use({ viewport: { width: 700, height: 1200 } });

test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    // TODO: replace with ENV variable?
    await page.goto("http://localhost:1234");
});

test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Word Game");
});

test("header visible", async ({ page }) => {
    const header = page.locator("h1");
    await expect(header).toBeVisible();
    await expect(header).toContainText("Word Game");
});

test("all guess list is visible", async ({ page }) => {
    const guessList = page.locator(".guess-results");
    await expect(guessList).toBeVisible();
});

test("all guesses are visible", async ({ page }) => {
    const guesses = await page.locator(".guess").all();
    for (let guess of guesses) {
        await expect(guess).toBeVisible();
    }
});

test("appropriate number of guesses", async ({ page }) => {
    const guessCount = await page.locator(".guess").count();
    await expect(guessCount).toEqual(NUM_OF_GUESSES_ALLOWED);
});

test("all guess cells are visible", async ({ page }) => {
    const cells = await page.locator(".cell").all();
    for (let cell of cells) {
        await expect(cell).toBeVisible();
    }
});

test("appropriate number of guess cells", async ({ page }) => {
    // Note: test assumes that the guess word length is always five
    const cells = await page.locator(".cell").all();
    expect(cells.length).toEqual(NUM_OF_GUESSES_ALLOWED * 5);
});

test("guess input visible", async ({ page }) => {
    const input = page.getByLabel("Enter guess:");
    await expect(input).toBeVisible();
});

test("guess input editable", async ({ page }) => {
    const input = page.getByLabel("Enter guess:");
    await expect(input).toBeEditable();
});

test("guess input empty on mount", async ({ page }) => {
    const input = page.getByLabel("Enter guess:");
    await expect(input).toBeEmpty();
});

test("keyboard visible", async ({ page }) => {
    const keyboard = page.locator(".keyboard-wrapper");
    await expect(keyboard).toBeVisible();
});

test("keyboard contains three keyboard rows", async ({ page }) => {
    const keyboardRows = await page.locator(".keyboard-row").all();
    expect(keyboardRows.length).toEqual(3);
});

test("there is a visible keyCell for each entry in UNUSED_KEYBOARD", async ({
    page,
}) => {
    const cells = await page.locator(".keyCell").all();

    expect(cells.length).toEqual(Object.keys(UNUSED_KEYBOARD).length);

    for (let cell of cells) {
        await expect(cell).toBeVisible();
    }
});

test("there is a keyCell with the appropriate letter for each entry in UNUSED_KEYBOARD", async ({
    page,
}) => {
    for (const key in Object.keys(UNUSED_KEYBOARD)) {
        expect(page.locator(".keyCell", { hasText: key }));
    }
});

test("the keyCells are rendered in the same order as they are entered within UNUSED_KEYBOARD", async ({
    page,
}) => {
    const cells = await page.locator(".keyCell").all();

    // Fetch the inner text from each cell using map and Promise.all
    const cellTexts = await Promise.all(
        cells.map(async (cell) => {
            return cell.textContent();
        })
    );

    // Compare with UNUSED_KEYBOARD keys
    const keyboardKeys = Object.keys(UNUSED_KEYBOARD);
    expect(cellTexts).toEqual(keyboardKeys);
});

test("the keyCells begin without status formatting", async ({ page }) => {
    const keyCells = await page.locator(".keyCell").all();
    const classNames = await Promise.all(
        keyCells.map(async (cell) => {
            return cell.getAttribute("class");
        })
    );

    classNames.forEach((className) => {
        expect(className).toEqual(" keyCell");
    });
});
