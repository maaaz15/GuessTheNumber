let randomNum = parseInt(Math.random() * 100 + 1)

const submit = document.querySelector('#submit')
const userInput = document.querySelector('#guessField')
const guessSlot = document.querySelector('.guesses')
const remaning = document.querySelector('.lastResult')
const lowHigh = document.querySelector('.lowHi')
const startOver = document.querySelector('.result')

const p = document.createElement('p')

let prevGuess = [];
let numGuesses = 1;
let playGame = true

if (playGame) {
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        const guess = parseInt(userInput.value)
        validateGuess(guess)
    })
}

const validateGuess = (guess) => {
    if (isNaN(guess)) {
        const error = document.querySelector('.error')
        error.innerHTML = 'Please enter a valid number'
    } 
    else if (guess < 1 || guess > 100) {
        const error = document.querySelector('.error')
        error.innerHTML = 'Please enter a number between 1 and 100'
    }
    else {
        prevGuess.push(guess)
        if (numGuesses === 10) {
            displayGuess(guess)
            displayMsg(`Game Over. You Lost. Random number was ${randomNum}`)
            endGame();
        }
        else {
            const error = document.querySelector('.error')
            error.innerHTML = ''
            displayGuess(guess)
            checkGuess(guess)
        }
    }
}
const checkGuess = (guess) => {
    if (guess === randomNum) {
        displayMsg(`You guessed it right. You won!!`)
        endGame()
    }
    else if (guess < randomNum) {
        displayMsg(`Number is too low`)
    }
    else if (guess > randomNum) {
        displayMsg(`Number is too high`)
    }
}
const displayGuess = (guess) => {
    userInput.value = ''
    guessSlot.innerHTML += `${guess}, `
    numGuesses++;
    remaning.innerHTML = `${11 - numGuesses}`
}
const displayMsg = (message) => {
    lowHigh.innerHTML = `<h2>${message}</h2>`
}
const endGame = () => {
    userInput.value = ''
    userInput.setAttribute('disabled', '')
    p.classList.add('button')
    p.innerHTML = `<h2 id="newGame">Start new game</h2>`
    startOver.appendChild(p)
    playGame = false
    newGame()
}
const newGame = () => {
    const newGameButton = document.querySelector('#newGame')
    newGameButton.addEventListener('click', () => {
        randomNum = parseInt(Math.random() * 100 + 1)
        prevGuess= []
        numGuesses = 1
        guessSlot.innerHTML = ''
        remaning.innerHTML = `${11 - numGuesses}`
        lowHigh.innerHTML = ''
        userInput.removeAttribute('disabled')
        startOver.removeChild(p)
        playGame = true;
    });
}