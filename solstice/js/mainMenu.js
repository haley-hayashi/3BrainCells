"use strict"

var MainMenu = function(game){
	this.startText, this.titleText;
};
MainMenu.prototype = {
	preload: function(){
	},
	
	create: function(){
		this.titleback = this.add.sprite(0, 0, 'titleBack');
		this.scoreText = this.add.text(16, 16, 'Press [SPACE] to start and to go through the dialogue.', {fontSize: '32px', fill: '#000000'});
		this.titleThing = this.add.sprite(550, 200, 'title');
		this.titleThing.scale.setTo(.5, .5);

		//plays theme
		this.titleMusic = new Phaser.Sound(game, 'titleMusic', 1, true);
		this.titleMusic.play();
	},
	
	update: function(){
		if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			this.titleMusic.stop();
			game.state.start('Home');
		}
	}
}