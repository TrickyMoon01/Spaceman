/*-------------- Constants -------------*/
const MAX_GUESSES = 6;
const words = [
  "Lebron James",
  "Michael Jordan",
  "Luka Doncic",
  "Cooper Flagg",
  "Kobe Bryant",
  "Anthony Davis",
  "Anthony Edwards",
  "Ben Simmons",
  "Ja Morant",
  "Kyrie Irving",
];

/*---------- Variables (state) ---------*/
let wordToGuessLetters = [];
let currentProgressLetters = [];
let wrongLetters = [];

/*----- Cached Element References  -----*/
const wrongLettersElement = document.querySelector("#wrongLetters");
const correctLettersElement = document.querySelector("#correctLetters");
const letterInputElement = document.querySelector("#letterInput");

const playSection = document.querySelector("#play");
const guessButton = document.querySelector("#guess");

const overSection = document.querySelector("#over");
const resetButton = document.querySelector("#reset");

const winnerSection = document.querySelector("#winner");
const againButton = document.querySelector("#again");

/*-------------- Functions -------------*/
function startTheGame() {
  //i need it to pick a random string from the array

  //first we need to find random index
  const wordToGuessIndex = Math.floor(Math.random() * words.length);
  //set wordToGuessLetters into my global state
  wordToGuessLetters = words[wordToGuessIndex].split("");
  //then fill in currentProgressLetters state with default values
  currentProgressLetters = Array(wordToGuessLetters.length).fill("_");
  //we want to make space visible, and it is no need to guess it
  const spaceIndex = wordToGuessLetters.findIndex((l) => l === " "); //so find index of space
  //amd replace default _ with space
  currentProgressLetters[spaceIndex] = " ";
  //we need to set DOM elements value
  correctLettersElement.innerText = currentProgressLetters.join("");
  wrongLettersElement.innerText = wrongLetters.join("");

  //code to show correct answer for comparison
  // document.querySelector("#test").innerText = wordToGuessLetters.join(""); //delete in production
}
function checkLetterInput(letter) {
  //first we can check whether letter is even present;
  const isPresent = wordToGuessLetters.findIndex(
    (correctLetter) => correctLetter.toLowerCase() === letter.toLowerCase()
  );
  //do all the logic if present
  if (isPresent !== -1) {
    for (let i = 0; i < wordToGuessLetters.length; i++) {
      let correctLetter = wordToGuessLetters[i];
      //we need to make case insensitive comparison
      if (correctLetter.toLowerCase() === letter.toLowerCase()) {
        //show the letter and display it
        // update my currentProgressLetters state and keep case sensitive
        currentProgressLetters[i] = wordToGuessLetters[i];
        correctLettersElement.innerText = currentProgressLetters.join("");
      }
    }
  } else {
    //otherwise we fill wrongLetters state only if letter is not already inside
    if (!wrongLetters.includes(letter)) {
      wrongLetters.push(letter);
      //show in the wrong board;
      wrongLettersElement.innerText = wrongLetters.join("");
    }
  }
  //every time this function is invoked we check whether we can proceed to play;
  //so win or lose logic
  if (wrongLetters.length >= MAX_GUESSES) {
    //if out wrongLetters state array is longer then MAX_GUESSES
    //start gameover logic
    gameOver();
    //['_','g'].join('') === ['O','g'].join('') => '_g' === 'Og'
  } else if (currentProgressLetters.join("") === wordToGuessLetters.join("")) {
    // if currentProgressLetters array converted to string is the same
    // as wordToGuessLetters array converted to string
    //start win logic
    winner();
  }
}
function gameOver() {
  //render some end of game message
  //show overSection by removing
  overSection.classList.remove("hidden");
  //hide playSection by adding
  playSection.classList.add("hidden");
  //we show correct answer
  correctLettersElement.innerText = wordToGuessLetters.join("");
}
function winner() {
  //render some winner of game message
  //show winnerSection by removing hidden classname
  winnerSection.classList.remove("hidden");
  //hide playSection by adding hidden classname
  playSection.classList.add("hidden");
  //show nice animation by adding win classname
  document.body.classList.add("win");
}
function reset() {
  //we need to erase all state variables to prevent some bugs in further function invocations
  wordToGuessLetters = [];
  currentProgressLetters = [];
  wrongLetters = [];
  //hide overSection
  overSection.classList.add("hidden");
  //hide winnerSection
  winnerSection.classList.add("hidden");
  //show playSection
  playSection.classList.remove("hidden");
  startTheGame();
  //hide animation by removing win classname
  document.body.classList.remove("win");
}
/*----------- Event Listeners ----------*/
guessButton.addEventListener("click", function () {
  //on button click we get input value
  const letter = letterInputElement.value;
  //once value is get we can erase our input DOM state
  letterInputElement.value = "";
  //we invoke game logic fucntion
  checkLetterInput(letter);
  //everytime we click on button, input lose focus
  //so we need to put it back
  letterInputElement.focus();
});

//reset or start game buttons have same reused logic
resetButton.addEventListener("click", function () {
  reset();
});
againButton.addEventListener("click", function () {
  reset();
});

document.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  //we simulate click event what already has proper event listener
  if (event.key === "Enter") {
    if (wrongLetters.length >= MAX_GUESSES) {
      //if you exceeded guesses gameover function has already been invoked, so
      //enter button clicks could have only one possible impact as reset button
      resetButton.click();
    } else if (
      currentProgressLetters.join("") === wordToGuessLetters.join("")
    ) {
      //once you won, only play again logic is possible
      againButton.click();
    } else {
      //in all other cases guess normal guess button clicks are possible
      guessButton.click();
    }
  }
});

//once the page is loaded we can just start the game logic
//no need to invoke reset, since all state variables or DOM elements are already in a default state
startTheGame();
