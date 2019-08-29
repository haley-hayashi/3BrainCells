"use strict"

//Load state
var Load = function(game){
};
Load.prototype = {

	preload: function(){
	game.load.image('goMachine', 'assets/images/coffeGoButton.png');	
	},

	create: function() {
	
	//black background
    game.stage.backgroundColor = '#182d3b';

    //load process
    game.load.onLoadStart.add(this.loadStart, this);
    game.load.onFileComplete.add(this.fileComplete, this);
    game.load.onLoadComplete.add(this.loadComplete, this);

    this.button = game.add.button(game.world.centerX - 95, 400, 'goMachine', this.start, this, 2, 1, 0);

    this.text = game.add.text(32, 32, 'Click to start load', { fill: '#ffffff' });
},
	start: function(){
		//load images 
		game.load.image('titleBack', 'assets/images/solsticeBackground.png')
		game.load.image('background', 'assets/images/background.png');
		game.load.image('cheesecake', 'assets/images/dessert1.png');
		game.load.image('croissant', 'assets/images/dessert2.png');
		game.load.image('cookie', 'assets/images/dessert3.png');
		game.load.image('brownie', 'assets/images/dessert4.png');
		game.load.image('pudding', 'assets/images/dessert5.png');
		game.load.image('pastry', 'assets/images/dessert6.png');
		game.load.spritesheet('mug', 'assets/images/mugs.png', 200, 220, 3);
		game.load.image('counter', 'assets/images/counter.png');
		game.load.image('serveButton', 'assets/images/serveButton.png');
		game.load.image('homeButton', 'assets/images/homeButton.png');
		game.load.image('coffeeMachine', 'assets/images/coffeeMachine.png');
		game.load.image('case', 'assets/images/displayCase.png');
		game.load.image('manager', 'assets/images/manager.png');
		game.load.image('textBox', 'assets/images/textBox.png');
		game.load.image('goWork', 'assets/images/leaveButton.png');
		game.load.image('chocoSyrup', 'assets/images/chocoSyrup.png');
		game.load.image('glop', 'assets/images/glop.png');
		game.load.image('henry','assets/images/henry.png');
		game.load.image('teresa', 'assets/images/teresa.png');
		game.load.image('whip', 'assets/images/whippedScream.png');
		game.load.image('apartment', 'assets/images/apartment.png');
		game.load.image('title', 'assets/images/solsticeLogo.png');
		game.load.image('paycheck', 'assets/images/paycheck.png');


		//load audio
		game.load.audio('cafeMusic', 'assets/music/CafeBGM.mp3');
		game.load.audio('apMusic','assets/music/ApartmentBGM.mp3');
		game.load.audio('titleMusic', 'assets/music/LogoScene.mp3');
		game.load.audio('doorBell', 'assets/audio/DoorBellRings.mp3');
		game.load.audio('doorOpen', 'assets/audio/DoorOpen.mp3');
		game.load.audio('chaChing', 'assets/audio/Money.mp3');
		game.load.audio('clink', 'assets/audio/MugClink.mp3');
		game.load.audio('sliding', 'assets/audio/MugSliding.mp3');
		game.load.audio('scream', 'assets/audio/scream.mp3');
		game.load.audio('pour', 'assets/audio/pourLiquid.mp3');

		//load script
		game.load.json('script', 'assets/script/textDialogue.json');

		game.load.start();

    	this.button.visible = false;
	},

	loadStart: function() {

	this.text.setText("Loading ...");

	},

	fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {

	this.text.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);

	},

	loadComplete: function() {

	this.text.setText("Load Complete");
	
	game.state.start('MainMenu');

	}
}