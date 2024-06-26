const wordDisplay = document.querySelector(".word-display");
const hangmanImg = document.querySelector(".hangman-box img");
const guessText = document.querySelector(".guess-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal")
const playAgainBtn = document.querySelector(".play-again");

let currentWord, correctLetters, wrongGuessCount;
const maxGuess = 6;

const resetGame = () =>{
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImg.src = `images/hangman-${wrongGuessCount}.svg`;
    guessText.innerText = `${wrongGuessCount} / ${maxGuess}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => ' <li class="letter"></li>').join("");
    gameModal.classList.remove("show");


}

const getRandomWord = () => {
    const { word, hint } = wordlist[Math.floor(Math.random() * wordlist.length)];
    console.log(word);
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    
    resetGame();

}

const gameOver = (isVictory) => {
    setTimeout(() => {
        const  modalText = isVictory ? `You found the word:` : `The correct word was: `;
        gameModal.querySelector("img").src = `images/${isVictory ? `victory` : `lost`}.gif`;
        gameModal.querySelector("h4").innerText=`${isVictory ? `Congrats!` : `Game Over!`}`;
        gameModal.querySelector("p").innerHTML= `${modalText} <b>${currentWord}<b/>`;

        gameModal.classList.add("show");
    },300)
}



const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
        
    }else{
        wrongGuessCount++;
        hangmanImg.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessText.innerText = `${wrongGuessCount} / ${maxGuess}`;
    if(wrongGuessCount === maxGuess) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

for (let index = 97; index <= 122; index++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(index);            // IMP CHARCODE ??
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(index)));

}   

getRandomWord();

playAgainBtn.addEventListener("click", getRandomWord);