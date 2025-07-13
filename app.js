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
let wrong = [];

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
  const wordToGuessIndex = Math.floor(Math.random() * word.length);
  wordToGuess = word[wordToGuessIndex].split("");
  currentProgress = Array(wordToGuess.length).fill("_");
  const spaceIndex = wordToGuess.findIndex(l=>l===' ')
  currentProgress[spaceIndex] = ' '
  correctLettersElement.innerText = currentProgress.join("");
  wrongLettersElement.innerText = wrong.join("");
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
        currentProgress[i] = wordToGuess[i];
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
  //every time this function is invoked we check whether we can proceed to play;
  //so won or loose
  if(wrong.length >= MAX_GUESSES){
    gameOver()
  }else if(currentProgress.join('') === wordToGuess.join('')){
    winner()
  }
}
function gameOver(){
    //render some end of game message
    //show overSection
    overSection.classList.remove('hidden')
    //hide playSection
    playSection.classList.add('hidden')
    //we show correct answer
    correctLettersElement.innerText = wordToGuess.join("");
}
function winner(){
    //render some winner of game message
    //show winnerSection
    winnerSection.classList.remove('hidden')
    //hide playSection
    playSection.classList.add('hidden')
}
function reset(){
    wordToGuess=[]
    currentProgress = []
    wrong = [];
    //hide overSection
    overSection.classList.add('hidden')
    //hide winnerSection
    winnerSection.classList.add('hidden')
    //show playSection
    playSection.classList.remove('hidden')
    startTheGame()
}
/*----------- Event Listeners ----------*/
guessButton.addEventListener("click", function () {
  const letter = letterInputElement.value;
  letterInputElement.value = "";
  checkLetterInput(letter);
  //everytime we click on button, out input lose focus
  //so we need to put it back
  letterInputElement.focus()
});

resetButton.addEventListener('click',function(){
    reset()
})
againButton.addEventListener('click',function(){
    reset()
})

document.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    //we simulate click event what already has proper event listener
    if (event.key === "Enter") {
        if(wrong.length >= MAX_GUESSES){
            resetButton.click()
        }else if(currentProgress.join('') === wordToGuess.join('')){
            againButton.click()
        }
        else{
            guessButton.click();
        }
    }
  });

startTheGame();
