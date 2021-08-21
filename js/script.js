// Global variables
const guessButton = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordAppear = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const guessedLettersElement = document.querySelector(".guessed-letters");

let word = "magnolia";
// Array will contain all of the letters users guess
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
  const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const words = await response.text();
  const wordArray = words.split("\n");
  const randomWord = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomWord].trim();

  addCircles(word);
};
getWord();

// Function to add placeholders for each letter
const addCircles = function (word) {
  // Creates empty array to push placeholders to
  const eachLetter = [];
  // For each letter in the word, display a circle placeholder
  for (const letter of word) {
    console.log(letter);
    eachLetter.push("●");
  }
  // Join letters together to make word
  wordAppear.innerText = eachLetter.join("");
};
// Calls the function
addCircles(word);

// Event listener for when player clicks the Guess button
guessButton.addEventListener("click", function (e) {
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
  // Checks to see if 'guessedLetters' array already contains the letter
  if (guessedLetters.includes(guess)) {
    message.innerText = "You've already guessed that letter! Try again."
  } else {
    //If letter is not in array, will push to array
    guessedLetters.push(guess);
    // console.log(guessedLetters);
    showGuessedLetters();
    countGuessesRemaining(guess);
  }
  updateWordInProgress(guessedLetters);
};

// Function to update the page with guessed guessedLetters
const showGuessedLetters = function () {
  // Clear the list first
  guessedLettersElement.innerHTML = "";
  // Create a new list item for each letter of 'guessedLetters' array and add it to the unordered list
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
};

// Function to replace circle symbols with correctly guessed letters
const updateWordInProgress = function (guessedLetters) {
  // Changes 'word' variable to uppercase
  const wordUpper = word.toUpperCase();
  // Splits the 'word' string into an array so letter can appear in the 'guessedLetters' array
  const wordArray = wordUpper.split("");
  // New array for updated characters
  const revealWord = [];
  // Check to see if 'wordArray' contains any letters from 'guessedLetters' array
  for (const letter of wordArray) {
    // If it does contain any of the letters, update circle symbol with the correct letter
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
    // If letter is not in array, display circle
    revealWord.push("●");
  }
}
  // Update 'wordAppear' paragraph with joined letters
  wordAppear.innerText = revealWord.join("");
  checkIfWon();
};

// Function to count remaining guesses
const countGuessesRemaining = function (guess) {
  // Make letters uppercase so that cases match
  const upperWord = word.toUpperCase();
    // Does the word include the guessed letter? If not, let player know and subtract 1 guess
    if (!upperWord.includes(guess)) {
      message.innerText = `Sorry, the word has no ${guess}.`;
      remainingGuesses -= 1;
    // If it does, let player know
    } else {
      message.innerText = `Good guess! The word has the letter ${guess}.`;
    }

    // Update message depending on number of guesses remaining
    if (remainingGuesses === 0) {
      message.innerHTML = `Game over! The word is ${word}.`;
      startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
      } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
      }
  };

// Function to check if player won
const checkIfWon = function () {
  // If the word guessed matches, display message and update message text
  if (word.toUpperCase() === wordAppear.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;

    startOver();
  }
};

// Function to hide and show elements when restarting game
const startOver = function () {
  guessButton.classList.add("hide");
  remainingGuessesElement.classList.add("hide");
  guessedLettersElement.classList.add("hide");
  playAgainButton.classList.remove("hide");
};

// Click event for Play Again button
playAgainButton.addEventListener("click", function () {
  // Reset all original values
  message.classList.remove("win");
  message.innerText = "";
  remainingGuesses = 8;
  guessedLetters = [];
  guessedLettersElement.innerHTML = "";
  remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  // Grab new word
  getWord();

  // Show the right UI elements
  guessButton.classList.remove("hide");
  remainingGuessesElement.classList.remove("hide");
  guessedLettersElement.classList.remove("hide");
  playAgainButton.classList.add("hide");
});
