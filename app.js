/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

Some rules added later on:
- The player can set the winning score by entering a number in a textbox.
- A new dice added to the game. Now, a player looses their current score when one of the dices is =0.
*/

var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;


//Start a game by rolling the dices
document.querySelector('.btn-roll').addEventListener('click', function(){
	if(gamePlaying){
		//Generates random numberr for each dice
		var dice1 = Math.floor(Math.random() *6) + 1;
		var dice2 = Math.floor(Math.random() *6) + 1;
	
		//Display the resutlt
		//var diceDOM = document.querySelector('.dice');
		document.getElementById('dice-1').style.display = 'block';
		document.getElementById('dice-2').style.display = 'block';
		//diceDOM.style.display='block';
		document.getElementById('dice-1').src = 'dice-' +dice1+ '.png';
		document.getElementById('dice-2').src = 'dice-' +dice2+ '.png';
	
		//Update the round score if the rolled number was not 1
		if(dice1 !== 1 && dice2 !== 1){
			//Add score
			roundScore += dice1 + dice2;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		}
		else{
			//Next player
			nextPlayer();
		}
		/*if(dice === 6 && lastDice === 6){
			//Playes loses whole score
			scores[activePlayer] = 0;
			document.querySelector('#score-' +activePlayer).textContent = '0';
			nextPlayer();
			
		}
		else if(dice !== 1){
			//Add score
			roundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		}
		else{
			//Next player
			nextPlayer();
		
		}
		
		lastDice = dice;
		*/
	}
	
});

document.querySelector('.btn-hold').addEventListener('click', function(){
	if(gamePlaying){
		//Add current score to global score
		scores[activePlayer] += roundScore;
	
		//update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		var input = document.querySelector('.final-score').value;
		//console.log(input);
		
		//Undefined, 0, null, or '' are coerced to false
		//Anything else is coerced to true
		var winningScore
		if(input){
			winningScore = input;
		}
		else{
			winningScore = 100;
		}
		//Check if the player won the game
		if(scores[activePlayer]>=winningScore){
			document.querySelector('#name-' + activePlayer).textContent = 'Winner';
			document.querySelector('#dice-1').style.display = 'none';
			document.querySelector('#dice-2').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		}
		else{
			//Next player
			nextPlayer();
		}
	}
});

function nextPlayer(){
	//Next player
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		roundScore = 0;
		
		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';
		
		//document.querySelector('.player-0-panel').classList.remove('active');
		//document.querySelector('.player-0-panel').classList.add('active');
		
		//toggle: adds the class if it's not there or remove it is it's not there
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
		
		document.querySelector('#dice-1').style.display = 'none';
		document.querySelector('#dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
	scores = [0,0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;
	
	/*document.querySelector('#current-' + activePlayer).textContent = dice;
	var x = document.querySelector('#score-0').textContent;
	console.log(x);*/

	document.querySelector('#dice-1').style.display = 'none';
	document.querySelector('#dice-2').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');

}
