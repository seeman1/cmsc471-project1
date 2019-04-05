// Computer makes a move with algorithm choice and skill/depth level
var makeMove = function(algo, skill=3) {
  // exit if the game is over
  if (game.game_over() === true) {
    return;
  }

  // Calculate the best move, using chosen algorithm
  if (algo === 1) {
    var move = randomMove();
  } else if (algo === 2) {
    var move = calcBestMoveOne(game.turn());
  } else if (algo === 3) {
    var move = calcBestMoveNoAB(skill, game, game.turn())[1];
  } else if (algo ==4) {
    var move = calcBestMove(skill, game, game.turn())[1];
  } else {
  	var move = calcBestMoveEval3(skill, game, game.turn())[1];
  }
  // Make the calculated move
  game.move(move);
  // Update board positions
  board.position(game.fen());
}

// Computer vs Computer
var playGame = function(algoW=5, algoB = 1, skillW=2, skillB=2) {
	 //If we are done running all the trials, stop playing
  if(numGames == 0)
		return;

  //Once the game is over, increment the appropriate variable and begin a new game
  if (game.game_over() === true) {
  	if(game.in_draw()) {
  		console.log('Game ', 11 - numGames, ': Draw');
  		++draws;
  	} else if (game.in_checkmate() && game.turn() == 'b') {
  		console.log('Game ', 11 - numGames, ': White wins!');
  		++wins;
  	} else {
  		console.log('Game ', 11 - numGames, ': White loses');
  		++losses;
  	}

  	console.log('Wins: ', wins);
  	console.log('Losses: ', losses);
  	console.log('Draws: ', draws);

  	--numGames;

  	game.reset();
  	board.clear();
  	board.start();
  	playGame(algoW, algoB, skillW, skillB);

  }

  var skill = game.turn() === 'w' ? skillW : skillB;
  var algo = game.turn() === 'w' ? algoW : algoB;
  makeMove(algo, skill);
 	playGame(algoW, algoB, skillW, skillB);
};

// Handles what to do after human makes move.
// Computer automatically makes next move
var onDrop = function(source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // If illegal move, snapback
  if (move === null) return 'snapback';

  // Log the move
  console.log(move)

  // make move for black
  window.setTimeout(function() {
    makeMove(4, 3);
  }, 250);
};

var numGames = 10;  //the number of games left
var draws = 0;      //a running count of the results of the games
var wins = 0;
var losses = 0;

$(document).ready(function() {
	playGame(3, 3, 3, 3);  //Start the first game
});