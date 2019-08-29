//notes from haley :)
//each drink has an assinged number based on the added value of its ingredients
//the drink glop chocolate has an asssinged number of 3 because the ingredients	

//ingredient chart
	//glop = 1
	//chocolate = 2
	//whipped screm = 100

//drink chart
	//glop chocolate = 3
	//glop chocolate with whipped scream = 103
	
"use strict"

var Day1 = function(game){
	this.cafe, this.counter, this.mug, this.serveB, this.text;
	this.script, this.cursors, this.display; 
	this.cake, this.croiss, this.cookie, this.brownie, this.pudding, this.pastry;
	this.gameMusic, this.x;
	
	this.ingredient1Text, this.ingredient2Text; this.paycheckText;
	
	this.drinkNumber = 0; //keep track of which drink we're serving
	this.ingredientCounter = 0; //keep track of how many ingredients we've used
	this.drinkCounter = 0; //keep track of how many drinks we've served
	this.paycheck = 0; //keep track of money earned for the day
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

		//sound effects
		this.drinkServe = new Phaser.Sound(game, 'sliding', 1, false);
		this.profit = new Phaser.Sound(game, 'chaChing', 1, false);
		this.pouring = new Phaser.Sound(game, 'pour', 1, false);

		//add cafe background
		this.cafe = game.add.sprite(0, 0, 'background');

		//adds manager
		this.manager = game.add.sprite(800, 550, 'manager');
		this.manager.anchor = new Phaser.Point(0.5, 0.5);

		//add counter & displaycase
		this.counter = game.add.sprite(0, 600, 'counter');
		this.display = game.add.sprite(1600, 400, 'case');

		//add serveButton
		this.serveB = game.add.button(250, 800, 'serveButton', this.serveCoffee, this);
		this.serveB.anchor = new Phaser.Point(0.5, 1);

		//adds textbox
		this.textBox = game.add.sprite(50, 150, 'textBox');

		//adds coffee machine
		this.machine = game.add.sprite(1350, 700, 'coffeeMachine');
		this.machine.anchor = new Phaser.Point(0.5, 1);
		
		//add go button on coffee machine
		this.machineButton = game.add.button(1425, 150, 'goMachine', this.brewCoffee, this);
		this.machineButton.inputEnabled = true; //enable input for hand on mouseover
		this.machineButton.input.useHandCursor = true;
		
		//add text interface
		this.ingredient1Text = this.add.text(1120, 580, 'Ingredient 1 = ', {fontSize: '32px', fill: '#f5f5f5'});
		this.ingredient2Text = this.add.text(1120, 620, 'Ingredient 2 = ', {fontSize: '32px', fill: '#f5f5f5'});
		this.paycheckText = this.add.text(16, 16, 'Today\'s Earnings = ' + this.paycheck, {fontSize: '32px', fill: '#000000'});

		//adds desserts
		this.cake = game.add.sprite(1750, 450, 'cheesecake');
		this.croiss = game.add.sprite(2275, 450, 'croissant');
		this.cookie = game.add.sprite(2875, 425, 'cookie');
		this.brownie = game.add.sprite(1750, 675, 'brownie');
		this.pudding = game.add.sprite(2275, 650, 'pudding');
		this.pastry = game.add.sprite(2875, 650, 'pastry');
		
		//add mug
		this.mug = game.add.sprite(1380, 460, 'mug');
		this.mug.enableBody = true;
		this.mug.immovable = true;
		this.physics.arcade.enable(this.mug);
		this.mug.anchor = new Phaser.Point(0.5, 0.5);
		
		//add glop and allow drag
		this.glop = game.add.sprite(400, 500, 'glop');
		this.glop.enableBody = true;
		this.glop.inputEnabled = true;
		this.glop.input.enableDrag(true);
		this.glop.input.useHandCursor = true;
		this.physics.arcade.enable(this.glop);
		this.glop.scale.setTo(0.5, 0.5);
		
		//add chocosyrup and allow drag
		this.chocoSyrup = game.add.sprite(500, 500, 'chocoSyrup')
		this.chocoSyrup.enableBody = true;
		this.chocoSyrup.inputEnabled = true;
		this.chocoSyrup.input.enableDrag(true);
		this.chocoSyrup.input.useHandCursor = true;
		this.physics.arcade.enable(this.chocoSyrup);
		this.chocoSyrup.scale.setTo(0.5, 0.5);
		
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
		
		//capture mouse input for crafting
		game.input.mouse.capture = true;
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
		
		//----------------------------- crafting hopefully
		//check for collide between ingredient and mug
		
		if(this.ingredientCounter < 2){
			this.physics.arcade.overlap(this.glop, this.mug, addGlop, null, this);
			this.physics.arcade.overlap(this.chocoSyrup, this.mug, addChocoSyrup, null, this);
		}
		
		console.log(this.paycheck);
		this.paycheckText.text = 'Today\'s Earnings = ' + this.paycheck;
		
		//addGlop function
		function addGlop(glop, mug){	
			if(!game.input.activePointer.leftButton.isDown){	
				this.pouring.play();
				glop.x = 400;
				glop.y = 500;
				this.drinkNumber += 1;
				if(this.ingredientCounter == 0){
					this.ingredient1Text.text = 'Ingredient 1 = Glop'
					this.ingredientCounter += 1;
				}
				else{
					this.ingredient2Text.text = 'Ingredient 2 = Glop'
					this.ingredientCounter += 1;
				}
			}
		}
		
		//chocosyrup function
		function addChocoSyrup(chocoSyrup, mug){	
			if(!game.input.activePointer.leftButton.isDown){	
				chocoSyrup.x = 500;
				chocoSyrup.y = 500;	
				this.drinkNumber += 2;
				if(this.ingredientCounter == 0){
					this.ingredient1Text.text = 'Ingredient 1 = Choco Syrup'
					this.ingredientCounter += 1;
				}
				else{
					this.ingredient2Text.text = 'Ingredient 2 = Choco Syrup'
					this.ingredientCounter += 1;
				}
			}
		}
	},
	
	//brew coffee function
	brewCoffee: function(){
		if(this.ingredientCounter == 2){
			this.mug.frame = 2;
		}
	},
	
	serveCoffee: function(){ //each order is inputted manually
		//first order
		if(this.drinkCounter == 0){
			if(this.drinkNumber == 3 && this.mug.frame == 2){ //if serving glop chocolate w/o whipped cream and go has been pressed
				this.drinkServe.play();
				this.profit.play();
				this.mug.frame = 0;
				money += 15;
				this.paycheck += 15;
				this.drinkNumber = 0; //reset drink and ingredients
				this.ingredientCounter = 0;
				this.drinkCounter += 1;
				this.ingredient1Text.text = 'Ingredient 1 = '
				this.ingredient2Text.text = 'Ingredient 2 = '
			}
			else if(this.drinkNumber != 3 && this.mug.frame == 2){ //if serving anything else
				this.drinkServe.play();
				this.profit.play();
				this.mug.frame = 0;
				money += 10;
				this.paycheck += 10;
				this.drinkNumber = 0;
				this.ingredientCounter = 0;
				this.drinkCounter += 1;
				this.ingredient1Text.text = 'Ingredient 1 = '
				this.ingredient2Text.text = 'Ingredient 2 = '
			}
		}
		
		//second order
		
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