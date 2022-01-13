'use strict';
const diceRoll = document.querySelector('.btn--roll')

const p0 = document.querySelector('.player--0')
const p1 = document.querySelector('.player--1')

const p0current = document.querySelector("#current--0")
const p1current = document.querySelector("#current--1")

const dicehold = document.querySelector('.btn--hold')
const newGame = document.querySelector('.btn--new')

let currentScore, activePlayer, scores, isPlaying

const init = () => {
    currentScore = 0
    activePlayer = 0
    scores = [0, 0]

    // state of playing is true in inital
    isPlaying = true

    // reset scores
    document.querySelector('#score--0').textContent = 0
    document.querySelector('#score--1').textContent = 0
    p0current.textContent = 0
    p1current.textContent = 0

    p0.classList.remove('player--winner')
    p1.classList.remove('player--winner')

}

init() // self invoking the function to reset the value 

const switchPlayer = () => {
    // setting the current score to 0 so, new player will start will zero
    currentScore = 0
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore

    // switching the player
    activePlayer = activePlayer === 0 ? 1 : 0


    // toggling the player class to look like when the player switch
    p0.classList.toggle('player--active')
    p1.classList.toggle('player--active')

}

diceRoll.addEventListener('click', () => {
    if (isPlaying) { // checking if state is true or not for play
        // 1 .Generate random dice number
        const diceScore = Math.trunc(Math.random() * 6) + 1

        // 2. Get the dice image and display it
        document.querySelector('.dice').setAttribute('src', `dice-${diceScore}.png`)

        // 3. Set the current score to dom
        if (diceScore !== 1) {
            // 4. Add the current score of active player
            currentScore += diceScore
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore
        } else {
            // 5. if diceScore 0 then change the player
            switchPlayer()
        }
    }
})


// setting up the score of the player's if the player hold the value
dicehold.addEventListener('click', () => {
    if (isPlaying) {
        scores[activePlayer] += currentScore
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer]
        if (scores[activePlayer] > 20) {
            isPlaying = false
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            return
        }
        switchPlayer()
    }
})

// resetting the values if the player go for new game
newGame.addEventListener('click', init)