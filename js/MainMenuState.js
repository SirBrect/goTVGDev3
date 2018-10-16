let mainMenuState = function(){
	
};

mainMenuState.prototype.create = function(){
	let background = game.add.sprite(0, 0, "main menu screen");
	background.scale.setTo(2, 2.5);
	let lvlOneButton = game.add.button(game.world.centerX - 400, game.world.centerY + 128, "buttons", buttonClick, this, 0, 0, 0, 0);
	lvlOneButton.scale.setTo(24,24);
	lvlOneButton.name = "Level One";
	let lvlTwoButton = game.add.button(game.world.centerX + 216, game.world.centerY + 128, "buttons", buttonClick, this, 1, 1, 1, 1);
	lvlTwoButton.scale.setTo(24,24);
	lvlOneButton.name = "Level Two";
	let lvlThreeButton = game.add.button(game.world.centerX + 832, game.world.centerY + 128, "buttons", buttonClick, this, 2, 2, 2, 2);
	lvlThreeButton.scale.setTo(24,24);
	lvlOneButton.name = "Level Three";


	//button = game.add.button(game.world.centerX - 200, game.world.centerY -150, "play button", actionOnClick, this);
}

let buttonClick = function(button){
	game.state.start(button.name);
}

