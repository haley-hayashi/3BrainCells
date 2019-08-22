/* Solstice
Team: Last 3 Brain Cells
Haley, Tovi, Isaiah */

//issues

//strict mode
"use strict";

//game initalization
var game = new Phaser.Game(1600,900, Phaser.AUTO);

//Menu state
var MainMenu = function(game){
	this.startText, this.titleText;
};
MainMenu.prototype = {
	preload: function(){
		//load images 
		game.load.image('background', 'assets/images/background.png');
		game.load.image('cheesecake', 'assets/images/dessert1.png');
		game.load.image('croissant', 'assets/images/dessert2.png');
		game.load.image('cookie', 'assets/images/dessert3.png');
		game.load.image('brownie', 'assets/images/dessert4.png');
		game.load.image('pudding', 'assets/images/dessert5.png');
		game.load.image('pastry', 'assets/images/dessert6.png');
		game.load.image('mug', 'assets/images/mug.png');
		game.load.image('counter', 'assets/images/counter.png');
		game.load.image('serveButton', 'assets/images/serveButton.png');
		game.load.image('coffeeMachine', 'assets/images/coffeeMachine.png');
		game.load.image('case', 'assets/images/displayCase.png');
		game.load.image('manager', 'assets/images/manager.png');
		game.load.image('textBox', 'assets/images/textBox.png');

		//load audio
		game.load.audio('cafeMusic', 'assets/music/cafeTutorial.mp3');

		//load script
		game.load.json('script', 'assets/script/textDialogue.json');
	},
	
	create: function(){
		this.scoreText = this.add.text(16, 16, 'Press [SPACE] to start and to go through the dialogue.', {fontSize: '32px', fill: '#f5f5f5'});
		this.titleText = this.add.text(750, 400, 'Solstice', {fontSize: '40px', fill: '#f5f5f5'})
	},
	
	update: function(){
		if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start('Tutorial');
		}
	}
}

//---------------------------------------------------------------------------------------------------------------

//Prologue state
var Prologue = function(game){};
Prologue.prototype = {}

//---------------------------------------------------------------------------------------------------------------

//Home state
var Home = function(game){};
Home.prototype = {};

//---------------------------------------------------------------------------------------------------------------

//Night state
var Night = function(game){};
Night.prototype = {};

//---------------------------------------------------------------------------------------------------------------

//Paytime state
var PayTime = function(game){};
PayTime.prototype = {};

//---------------------------------------------------------------------------------------------------------------

//Tutorial state
var Tutorial = function(game){
	this.cafe, this.counter, this.mug, this.serveB, this.text;
	this.script, this.cursors, this.display; 
	this.cake, this.croiss, this.cookie, this.brownie, this.pudding, this.pastry;
	this.gameMusic, this.x;
};
Tutorial.prototype = {
	preload: function(){
	},
	create: function(){
		//game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		//makes our bigger world
		game.world.setBounds(0, 0, 3195, 900);
		this.cursors = game.input.keyboard.createCursorKeys();

		//plays music
		this.gameMusic = new Phaser.Sound(game, 'cafeMusic', 1, true);
		this.gameMusic.play();

		//add cafe background
		this.cafe = game.add.sprite(0, 0, 'background');

		//adds manager
		this.manager = game.add.sprite(800, 550, 'manager');
		this.manager.anchor = new Phaser.Point(0.5, 0.5);

		//add counter & displaycase
		this.counter = game.add.sprite(0, 600, 'counter');
		this.display = game.add.sprite(1600, 400, 'case');

		//add serveButton
		this.serveB = game.add.button(250, 800, 'serveButton');
		this.serveB.anchor = new Phaser.Point(0.5, 1);

		//adds textbox
		this.textBox = game.add.sprite(50, 150, 'textBox');

		//adds coffee machine
		this.machine = game.add.sprite(1350, 700, 'coffeeMachine');
		this.machine.anchor = new Phaser.Point(0.5, 1);

		//adds desserts
		this.cake = game.add.sprite(1750, 450, 'cheesecake');
		this.croiss = game.add.sprite(2275, 450, 'croissant');
		this.cookie = game.add.sprite(2875, 425, 'cookie');
		this.brownie = game.add.sprite(1750, 675, 'brownie');
		this.pudding = game.add.sprite(2275, 650, 'pudding');
		this.pastry = game.add.sprite(2875, 650, 'pastry');
		

		//add mug
		this.mug = game.add.sprite(1350, 750, 'mug');
		this.mug.anchor = new Phaser.Point(0.5, 0.5);

		//allows mug to be dragged
		this.mug.inputEnabled = true;
		this.mug.input.enableDrag(true);
		
		//script 
		this.tutorialMode = game.cache.getJSON('script');
		this.inkTutorial = new inkjs.Story(this.tutorialMode);

		this.textStyleMain = {
			fill: '#000000';
			align: 'left';
			wordWrap: true;
			wordWrapWidth: this.textBox.width;
		}
		this.textStyleChoices = {
			fill: '#000000';
			align: 'left';
			wordWrap: true;
			wordWrapWidth: this.textBox.width;
			fontWeight: 'bold';
		}
		//text thing
		this.displayText = this.add.text(this.textBox.x + 15, this.textBox.y + 15, "", this.textStyleMain);
		this.choices = [];
	},
	update: function(){
		//moves dialogue along
		if()
		this.continueStory();

		//movement control of screen
		if (this.cursors.left.isDown){
        	game.camera.x -= 10;
    	}
   		if (this.cursors.right.isDown){
        	game.camera.x += 10;
    	}
	},

	display_Text: function(text){
		this.displayText.destroy();
		this.displayText = game.add.text(this.textBox.x + 15, this.textBox.y + 15, "", this.textStyleMain);
		
		text = this.parseText(text, this.displayText);
		this.displayText.setText(text);
	}

};

};

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
game.state.add('Night', Night);
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