// preloadState constructor

let preloadState = function(){

};

preloadState.prototype.preload = function(){
	game.load.image('tower', 'assets/Reflect Tower LL.png');

};

preloadState.prototype.create = function(){
	game.add.sprite(0,0,'tower');

	tower.scale.set(3,3);
	game.state.start("Game");
	
};

preloadState.prototype.update = function(){
	
};