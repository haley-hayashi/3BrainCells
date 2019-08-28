/* Solstice
Team: Last 3 Brain Cells
Haley, Tovi, Isaiah */

//strict mode
"use strict";

//game initalization
var game = new Phaser.Game(1600,900, Phaser.AUTO);

//global varaible of money
var money = 0;

//---------------------------------------------------------------------------------------------------------------

//Prologue state
var Prologue = function(game){};
Prologue.prototype = {}

//---------------------------------------------------------------------------------------------------------------

//Paytime state
var PayTime = function(game){};
PayTime.prototype = {
	create: function(){

		//paycheck screen
		this.pay = game.add.sprite(0, 0, 'paycheck');

		//button home
		this.backhome = game.add.sprite(0, 0, 'homeButton');
	}
};

//---------------------------------------------------------------------------------------------------------------


//---------------------------------------------------------------------------------------------------------------

//Day1 state
var Day1 = function(game){};
Day1.prototype = {};

//---------------------------------------------------------------------------------------------------------------

//Day2 state
var Day2 = function(game){};
Day2.prototype = {};

//---------------------------------------------------------------------------------------------------------------

//Day3 state
var Day3 = function(game){};
Day3.prototype = {};

//---------------------------------------------------------------------------------------------------------------

//Day4 state
var Day4 = function(game){};
Day4.prototype = {};

//---------------------------------------------------------------------------------------------------------------

//Day5 state
var Day5 = function(game){};
Day5.prototype = {};

//---------------------------------------------------------------------------------------------------------------

//Day6 state
var Day6 = function(game){};
Day6.prototype = {};

//---------------------------------------------------------------------------------------------------------------

//Day7 state
var Day7 = function(game){};
Day7.prototype = {};

//---------------------------------------------------------------------------------------------------------------

//Ending state
var Ending = function(game){};
Ending.prototype = {};

//---------------------------------------------------------------------------------------------------------------

//game states
game.state.add('MainMenu', MainMenu);
game.state.add('Prologue', Prologue);
game.state.add('Home', Home);
game.state.add('PayTime', PayTime);
game.state.add('Tutorial', Tutorial);
game.state.add('Day1', Day1);
game.state.add('Day2', Day2);
game.state.add('Day3', Day3);
game.state.add('Day4', Day4);
game.state.add('Day5', Day5);
game.state.add('Day6', Day6);
game.state.add('Day7', Day7);
game.state.add('Ending', Ending);


//starting on Tutorial
game.state.start('MainMenu');