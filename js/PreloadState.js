// preloadState constructor

let preloadState = function(){

};

preloadState.prototype.preload = function(){
	game.load.image("play button", "art assets/PlayButton.png");
	game.load.image("win screen", "art assets/WinScreen.png");
};

preloadState.prototype.create = function(){
	game.state.start("Main Menu");
	
};

preloadState.prototype.update = function(){
	
};