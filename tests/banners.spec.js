// @ts-check
import { test, expect } from "@playwright/experimental-ct-react";
import { range } from "../src/utils";
import { NUM_OF_GUESSES_ALLOWED } from "../src/constants";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

test.use({ viewport: { width: 700, height: 1200 } });

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
