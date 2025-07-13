/*-------------- Constants -------------*/
const MAX_GUESSES = 6;

/*---------- Variables (state) ---------*/
const word = [
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
let wordToGuess = [];
let currentProgress = [];

//let board = [];
//let guess = [];
let wrong = [];
//let right = [];

/*----- Cached Element References  -----*/
const wrongLettersElement = document.querySelector("#wrongLetters");
const correctLettersElement = document.querySelector("#correctLetters");
const letterInputElement = document.querySelector("#letterInput");
const guessElement = document.querySelector("#guess");

/*-------------- Functions -------------*/
function startTheGame() {
  //i need it to pick a random string from the array
  const wordToGuessIndex = Math.floor(Math.random() * word.length);
  wordToGuess = word[wordToGuessIndex].split("");
  currentProgress = Array(wordToGuess.length).fill("_");
  correctLettersElement.innerText = currentProgress.join("");
  document.querySelector("#test").innerText = wordToGuess.join("");
}
function checkLetterInput(letter) {
  //first we can check whether letter is even present;
  const isPresent = wordToGuess.findIndex(
    (correctLetter) => correctLetter.toLowerCase() === letter.toLowerCase()
  );
  if (isPresent !== -1) {
    for (let i = 0; i < wordToGuess.length; i++) {
      let correctLetter = wordToGuess[i];
      //we need to make case insensitive comparison
      if (correctLetter.toLowerCase() === letter.toLowerCase()) {
        //show the letter and display it
        // update my currentProgress state
        currentProgress[i] = letter;
        correctLettersElement.innerText = currentProgress.join("");
      }
    }
  } else {
    //show in the wrong board;
    if (!wrong.includes(letter)) {
      wrong.push(letter);
      wrongLettersElement.innerText = wrong.join("");
    }
  }
}
/*----------- Event Listeners ----------*/
guessElement.addEventListener("click", function () {
  const letter = letterInputElement.value;
  letterInputElement.value = "";
  checkLetterInput(letter);
});

startTheGame();
