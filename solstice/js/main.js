//this will be the main
//notes on bugs and things to add can be added here or in the readme file, but should be edited as things change
//------------

//keep code tidy with strict
"use strict";

//initialize game object; 1600w x 900h
var game = new Phaser.Game(1600, 900, Phaser.AUTO, 'phaser');

//test state for gameplay
var gamePlay = function(game){};
gamePlay.prototype = {
	
}

//game states
game.state.add('gamePlay', gamePlay);