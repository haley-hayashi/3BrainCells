"use strict"

//Home state
var Home = function(game){
	this.moneyText;
};
Home.prototype = {
	create: function(){
		//load background
		this.apartment = game.add.sprite(0, 0, 'apartment');

		//music play
		this.homeMusic = new Phaser.Sound(game, 'apMusic', 1, true);
		this.homeMusic.play();

		//gotoWork button
		this.workButton = game.add.button(370, 370, 'goWork', this.goToWork, this);

		//money text
		this.moneyText = this.add.text(1100, 250, 'Total savings: ' + money, {fontSize: '32px', fill: '#00000'});
		
	},

	goToWork: function(){
		this.homeMusic.stop();
		game.state.start('Day1');
	}
};