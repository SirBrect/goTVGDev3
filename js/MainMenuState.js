let MainMenuState = function(){
	
};

MainMenuState.prototype.create = function(){\
	let lvlOneButton = game.add.button(game.world.centerX - 256, game.world.centerY + 128, "buttons", lvlOneButtonClick, this, 0, 0, 0);
	let lvlTwoButton = game.add.button(game.world.centerX - 256, game.world.centerY + 128, "buttons", lvlTwoButtonClick, this, 1, 1, 1);
	let lvlThreeButton = game.add.button(game.world.centerX - 256, game.world.centerY + 128, "buttons", lvlThreeButtonClick, this, 2, 2, 2);
	let exitButton = game.add.button(game.world.centerX - 256, game.world.centerY + 128, "buttons", exitButtonClick, this, 3, 3, 3);


	//button = game.add.button(game.world.centerX - 200, game.world.centerY -150, "play button", actionOnClick, this);
}

actionOnClick = function(){
	game.state.start("Game");
}