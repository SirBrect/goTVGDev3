let MainMenuState = function(){
	
};

MainMenuState.prototype.create = function(){
	button = game.add.button(game.world.centerX - 200, game.world.centerY -150, "play button", actionOnClick, this);
}

actionOnClick = function(){
	game.state.start("Win");
}