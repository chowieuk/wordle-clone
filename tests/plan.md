Let's think about this from the top down

-   App
    -   Header
    -   Game
        -   GuessList
        -   GuessInput
        -   LossBanner
        -   WonBanner
        -   ResetGameButton

While interesting, I'm not sure I strictly need tests on the component level.

What consistent interface should the user see?

-   a Header
-   a guess results page (guess list), comprising of:
    -   `NUM_OF_GUESSES_ALLOWED` guesses (rows)
    -   each guess will have five cells
-   a guess input box
-   an onscreen keyboard

What actions can a user take, and what outcomes can they expect?

-   enter a guess

    -   can input alphabetical characters
    -   cannot submit a non five character guess
    -   cannot enter more than five characters
    -   cannot enter non-alphabetical characters
    -   guess input field is reset on submission

-   submit a guess

    -   submitted guesses appears in the guess list
        -   the letters of these guesses are appropriately formatted
    -   the letters of the submited guesses are appropriately formatted in the onscreen keyboard
    -   a submission matching the answer triggers the win banner
        -   the win banner contains an accurate number of guesses taken
        -   the win banner contains a reset button
            -   the win banner contains no reset button if the user has cycled through all of the `WORDS`
            -   `feature suggestion: ability to fully reset the game state at this point`
    -   the user has up to `NUM_OF_GUESSES_ALLOWED` tries, after which they are presented with the loss banner if they have not entered a matching guess
        -   the loss banner contains the `answer` that the user failed to guess
        -   the loss banner contains a reset button
        -   the loss banner contains no reset button if the user has cycled through all of the `WORDS`

-   reset the game

    -   the guess list an all its guesses are reset to its original state
    -   a new target answer is chosen
        -   this target answer should not be from one previouly guessed during this session
    -   the formatting on the onscreen keyboard is reset

Potential file structure

```
tests/
|-- baselineUI.spec.js <-- For static/foundational UI tests
|-- header.spec.js
|-- guessList.spec.js
|-- guessInput.spec.js
|-- banners.spec.js
|-- onscreenKeyboard.spec.js
|-- utils/
    |-- helpers.js
```
