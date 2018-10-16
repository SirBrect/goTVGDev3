let WinState = function(){
	
};

WinState.prototype.create = function(){
	game.add.sprite(0, 0, "win screen");
	let exitButton = game.add.button(game.world.centerX, game.world.centerY + 100, "buttons", exitButtonClick, this, 3, 3, 3, 3);
	exitButton.scale.setTo(2,2);
};

let exitButtonClick = function(){
	game.state.start("Main Menu");
}