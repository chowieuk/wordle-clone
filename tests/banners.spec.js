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

test("a submission matching the answer triggers the win banner", async ({
    page,
}) => {
    const guessInput = page.getByLabel("Enter guess:");
    const answer = await page.getByTestId("answerForTesting").innerText();

    await guessInput.fill(answer);
    await guessInput.press("Enter");

    await expect(page.locator(".happy.banner")).toBeVisible();
});

test("the win banner contains the reset button", async ({ page }) => {
    const guessInput = page.getByLabel("Enter guess:");
    const answer = await page.getByTestId("answerForTesting").innerText();

    await guessInput.fill(answer);
    await guessInput.press("Enter");

    await expect(page.getByRole("button", { name: "NEW GAME" })).toBeVisible();
});

test("the win banner contains an accurate number of guesses taken", async ({
    page,
}) => {
    for (let i = 0; i < NUM_OF_GUESSES_ALLOWED; i++) {
        const guessInput = page.getByLabel("Enter guess:");
        const answer = await page.getByTestId("answerForTesting").innerText();
        const expectedNumOfAnswers =
            i === 0 ? "a single guess" : `${i + 1} guesses`;

        for (let j = 0; j < i; j++) {
            await guessInput.fill("XXXXX");
            await guessInput.press("Enter");
        }

        await guessInput.fill(answer);
        await guessInput.press("Enter");

        await expect(page.locator(".happy.banner")).toContainText(
            expectedNumOfAnswers
        );
        await page.getByRole("button", { name: "NEW GAME" }).click();
    }
});

test("user has up to NUM_OF_GUESSES_ALLOWED incorrect attempts before triggering the loss banner", async ({
    page,
}) => {
    const guessInput = page.getByLabel("Enter guess:");

    for (let i = 0; i < NUM_OF_GUESSES_ALLOWED; i++) {
        await guessInput.fill("XXXXX");
        await guessInput.press("Enter");
    }

    await expect(page.locator(".sad.banner")).toBeVisible();
});

test("the loss banner contains the reset button", async ({ page }) => {
    const guessInput = page.getByLabel("Enter guess:");

    for (let i = 0; i < NUM_OF_GUESSES_ALLOWED; i++) {
        await guessInput.fill("XXXXX");
        await guessInput.press("Enter");
    }

    await expect(page.getByRole("button", { name: "NEW GAME" })).toBeVisible();
});
test("the loss banner contains the answer", async ({ page }) => {
    const guessInput = page.getByLabel("Enter guess:");
    const answer = await page.getByTestId("answerForTesting").innerText();

    for (let i = 0; i < NUM_OF_GUESSES_ALLOWED; i++) {
        await guessInput.fill("XXXXX");
        await guessInput.press("Enter");
    }

    await expect(page.locator(".sad.banner")).toContainText(answer);
});
