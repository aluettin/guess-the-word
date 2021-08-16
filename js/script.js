// Global variables
const button = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordAppear = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
// Array will contain all of the letters users guess
const guessedLetters = [];

// Function to add placeholders for each letter
const addCircles = function (word) {
  // Creates empty array to push placeholders to
  const eachLetter = [];
  for (const letter of word) {
    console.log(letter);
    eachLetter.push("●");
  }
  wordAppear.innerText = eachLetter.join("");
};
// Calls the function
addCircles(word);

// Event listener for when player clicks the Guess button
button.addEventListener("click", function (e) {
  // Prevents default behavior of clicking button, form submitting, and then reloading page
  e.preventDefault();
  // Empties element text
  message.innerText = "";
  // Grabs what was entered in the input
  const guess = letter.value;

  // console.log(guess);

  // Makes sure that it is a single letter
  const goodGuess = validateGuess(guess);

  //console.log(goodGuess);

  if (goodGuess) {
    makeGuess(guess);
  }

  // Empties the value of input
  letter.value = "";
});

// Function to check player's input
const validateGuess = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  // Is the input empty?
  if (input.length === 0) {
    message.innerText = "You must enter a letter. Try again!";
  // Did you type more than one letter?
} else if (input.length > 1) {
    message.innerText = "You can only enter one letter. Try again!";
  // Did you type a number, a special character, or some other non-letter thing?
} else if (!input.match(acceptedLetter)) {
    message.innerText = "Please enter a letter from a - z.";
} else {
  // Finally, a single letter!
  return input;
  }
};

// Function that accepts letters as the parameter...guess parameter represents letters entered
const makeGuess = function (guess) {
  // Makes all letters uppercase
  guess = guess.toUpperCase();
  // Checks to see if guessedLetters array already contains the letter
  if (guessedLetters.includes(guess)) {
    message.innerText = "You've already guessed that letter! Try again."
  } else {
    //If letter is not in array, will push to array
    guessedLetters.push(guess);
    console.log(guessedLetters);
  }
};
