'use strict';
//selecting elements
const score0El = document.querySelector('#score--0');
const score1El= document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
let scores, currentScore, activePlayer, playing;

//starting conditions
const init = function() {
    diceEl.classList.add('hidden');
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');


};
init();

const switchPlayer = function() {
     //end and move to the next player
     document.getElementById(`current--${activePlayer}`).textContent = 0;
     //switching the active player
     activePlayer = activePlayer === 0 ? 1 : 0;
     currentScore = 0;
     //activating the lighter background for the active player
     player0.classList.toggle('player--active');
     player1.classList.toggle('player--active');
}

//rolling dice functionality
btnRoll.addEventListener('click', function() {
    if (playing) {
    //generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //check for the rolled 1
    if(dice !== 1) {
        //add dice to current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        

    }else {
        // //end and move to the next player
       
        switchPlayer();
     
    }
}
 

});
btnHold.addEventListener('click', function() {
   if (playing) {
    //add current score to active players score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`). textContent = scores[activePlayer];
    //check score is at least 100
   if(scores[activePlayer] >= 100) {
    playing = false;
   
    //finish the game
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    //switch to the next player
    // one way of disabling buttons
    // btnHold.disabled = true;
    // btnRoll.disabled = true;
    diceEl.classList.add('hidden');
    //another method of ending the game 
    
    
   } else {
    switchPlayer();
   }
}
});
btnNew.addEventListener('click', init);
