// preloadState constructor

let preloadState = function(){

};

preloadState.prototype.preload = function(){
	game.load.image("play button", "assets/PlayButton.png");
	game.load.image("win screen", "assets/WinScreen.png");

	game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);

    //  Next we load the tileset. This is just an image, loaded in via the normal way we load images:

    game.load.image('tiles', 'assets/maplayouts.png');
    game.load.spritesheet('4way','assets/4-Way Cell Tower.png',120,120,8);

    game.load.image('LL', 'assets/Reflect Tower LL.png');
    game.load.image('LR', 'assets/Reflect Tower LR.png');
    game.load.image('UL', 'assets/Reflect Tower UL.png');
    game.load.image('UR', 'assets/Reflect Tower UR.png');
    game.load.image('tree', 'assets/tree.png');
    game.load.image('skyscraper', 'assets/Skyscraper.png');
    game.load.image('y_house', 'assets/yellow_house.png');
};

preloadState.prototype.create = function(){
	game.state.start("Main Menu");
	
};

preloadState.prototype.update = function(){
	
};