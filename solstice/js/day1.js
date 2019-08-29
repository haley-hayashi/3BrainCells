"use strict"
//Tutorial state
var Day1 = function(game){
	this.cafe, this.counter, this.mug, this.serveB, this.text;
	this.script, this.cursors, this.display; 
	this.cake, this.croiss, this.cookie, this.brownie, this.pudding, this.pastry;
	this.gameMusic, this.x;
};
Day1.prototype = {
	create: function(){
		//game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		this.fill = 0;

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
		this.machineButton = game.add.button(1425, 150, 'goMachine', this.brewCoffee, this);
		this.machineButton.inputEnabled = true; //enable input for hand on mouseover
		this.machineButton.input.useHandCursor = true;

		//adds desserts
		this.cake = game.add.sprite(1750, 450, 'cheesecake');
		this.croiss = game.add.sprite(2275, 450, 'croissant');
		this.cookie = game.add.sprite(2875, 425, 'cookie');
		this.brownie = game.add.sprite(1750, 675, 'brownie');
		this.pudding = game.add.sprite(2275, 650, 'pudding');
		this.pastry = game.add.sprite(2875, 650, 'pastry');
		

		//add mug
		var mug = game.add.sprite(1380, 480, 'mug');
		mug.anchor = new Phaser.Point(0.5, 0.5);

		//allows mug to be dragged
		//mug.inputEnabled = true;
		//mug.input.enableDrag(true);
		
		//add glop and allow drag
		var glop = game.add.sprite(400, 500, 'glop');
		glop.inputEnabled = true;
		glop.input.enableDrag(true);
		glop.input.useHandCursor = true;
		glop.scale.setTo(0.5, 0.5);
		
		//add chocosyrup and allow drag
		var chocoSyrup = game.add.sprite(500, 500, 'chocoSyrup')
		chocoSyrup.inputEnabled = true;
		chocoSyrup.input.enableDrag(true);
		chocoSyrup.input.useHandCursor = true;
		chocoSyrup.scale.setTo(0.5, 0.5);
		
		//script 
		this.tutorialMode = game.cache.getJSON('script');
		this.inkTutorial = new inkjs.Story(this.tutorialMode);
		this.autoContinueStory = true;

		//text style for dialogue
		this.textStyleMain = {
			fill: '#000000',
			align: 'left',
			wordWrap: true,
			wordWrapWidth: this.textBox.width
		}

		//text style for choices
		this.textStyleChoices = {
			fill: '#2153de',
			align: 'left',
			wordWrap: true,
			wordWrapWidth: this.textBox.width,
			fontWeight: 'bold'
		}
		//text thing
		this.displayText = this.add.text(this.textBox.x + 20, this.textBox.y + 25, "(MANAGER waits expectingly)", this.textStyleMain);
		this.choices = [];
	},
	update: function(){
		//moves dialogue along
		if(this.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
			this.continueStory();
		}

		//movement control of screen
		if (this.cursors.left.isDown){
        	game.camera.x -= 10;
    	}
   		if (this.cursors.right.isDown){
        	game.camera.x += 10;
    	}
	},
	
	
	
	
	brewCoffee: function(){
		
	},

//------------------- ink
	continueStory: function(){
		if(!this.autoContinueStory){
			return;
		}
		if(!this.inkTutorial.canContinue){
			this.autoContinueStory = false;
		}
		var paragraphIndex = 0;
		var delay = 0.0;
		var completeText = "";

		//where I need to break paragrpahs
		if(this.inkTutorial.canContinue){
			completeText = this.inkTutorial.Continue();
			//completeText = completeText + '\n' + paragraphText;
		}
		this.display_Text(completeText);
		console.log(completeText);

		for(var i = 0; i < this.choices.length; i++){
			this.choices[i].destroy();
		}
		this.choices = [];

		this.inkTutorial.currentChoices.forEach((choice) =>{
			this.display_Choice(choice.text, choice.index);
		});


		this.currentParagraph = 0;
	},

	display_Text: function(text){
		this.displayText.destroy();
		this.displayText = game.add.text(this.textBox.x + 20, this.textBox.y + 25, text, this.textStyleMain);
		this.displayText.setText(text);
	},

	display_Choice: function(text, target){
		var lastChoice = this.displayText.x - 40;
		var choiceText = "";
		if(this.choices.length > 0){
			lastChoice = this.choices[this.choices.length - 1].x + this.choices[this.choices.length - 1].width;
		}
		var newChoice = game.add.text(this.textBox.x + lastChoice, this.textBox.y + 150, text, this.textStyleChoices);
		newChoice.setStyle(newChoice.style, true);

		newChoice.choiceDestination = target;

		newChoice.inputEnabled = true;
		newChoice.events.onInputDown.add((obj, pointer) =>{
			this.inkTutorial.ChooseChoiceIndex(obj.choiceDestination);
			//this is where im putting choice reading
			this.autoContinueStory = true;
			//choiceText = this.inkTutorial.Continue();
			//console.log(choiceText);
			//this.display_Text(choiceText);
			this.continueStory();

		});

		this.choices.push(newChoice);
	}

//----------------------------- ink ends

};