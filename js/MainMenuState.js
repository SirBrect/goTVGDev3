let mainMenuState = function(){
	
};

mainMenuState.prototype.create = function(){
	game.add.sprite(0, 0, "main menu screen");
	let lvlOneButton = game.add.button(game.world.centerX - 256, game.world.centerY + 128, "buttons", buttonClick, this, 0, 0, 0, 0);
	lvlOneButton.scale.setTo(8,8);
	lvlOneButton.name = "Level One";
	let lvlTwoButton = game.add.button(game.world.centerX - 128, game.world.centerY + 128, "buttons", buttonClick, this, 1, 1, 1, 1);
	lvlTwoButton.scale.setTo(8,8);
	lvlOneButton.name = "Level Two";
	let lvlThreeButton = game.add.button(game.world.centerX, game.world.centerY + 128, "buttons", buttonClick, this, 2, 2, 2, 2);
	lvlThreeButton.scale.setTo(8,8);
	lvlOneButton.name = "Level Three";
	let exitButton = game.add.button(game.world.centerX + 128, game.world.centerY + 128, "buttons", exitButtonClick, this, 3, 3, 3, 3);
	exitButton.scale.setTo(8,8);


	//button = game.add.button(game.world.centerX - 200, game.world.centerY -150, "play button", actionOnClick, this);
}

let buttonClick = function(button){
	game.state.start(button.name);
}

let exitButtonClick = function(){
	game.state.start("Game");
}