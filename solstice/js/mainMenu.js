"use strict"

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
		//game.load.image('mug', 'assets/images/mug.png');
		game.load.spritesheet('mug', 'assets/images/mugs.png', 200, 220, 3);
		game.load.image('mugWCream', 'assets/images/mugCream.png');
		game.load.image('mugFill','assets/images/mugFilled.png');
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
		game.load.image('goMachine', 'assets/images/coffeGoButton.png');

		//load audio
		game.load.audio('cafeMusic', 'assets/music/cafeTutorial.mp3');
		game.load.audio('apMusic','assets/music/apartmentTheme.mp3');
		game.load.audio('doorBell', 'assets/audio/DoorBellRings.mp3');
		game.load.audio('doorOpen', 'assets/audio/DoorOpen.mp3');
		game.load.audio('chaChing', 'assets/audio/Money.mp3');
		game.load.audio('clink', 'assets/audio/MugClink.mp3');
		game.load.audio('sliding', 'assets/audio/MugSliding.mp3');

		//load script
		game.load.json('script', 'assets/script/textDialogue.json');
	},
	
	create: function(){
		this.game.stage.backgroundColor = "#b8eff6";
		this.scoreText = this.add.text(16, 16, 'Press [SPACE] to start and to go through the dialogue.', {fontSize: '32px', fill: '#000000'});
		this.titleThing = this.add.sprite(250, 50, 'title');
	},
	
	update: function(){
		if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start('Home');
		}
	}
}