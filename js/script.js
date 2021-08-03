const guessedLetters = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordAppear = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia  ";

// Function to update paragraph's innerText element with circle symbols

const addCircles = function (word) {
  const eachLetter = [];
  for (const letter of word) {
    console.log(letter);
    eachLetter.push("●");
  }

  wordAppear.innerText = eachLetter.join("");

};

addCircles(word);


button.addEventListener("click", function (e) {
  e.preventDefault();
  const inputValue = letter.value;
  console.log(inputValue);
  letter.value = "";
});
