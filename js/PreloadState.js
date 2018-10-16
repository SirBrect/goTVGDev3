// preloadState constructor

let preloadState = function(){

};

preloadState.prototype.preload = function(){
	game.load.image("play button", "assets/PlayButton.png");
	game.load.image("win screen", "assets/WinScreen.png");
    game.load.image("main menu screen", "assets/main_menu_art.png");
    game.load.spritesheet("buttons", "assets/buttons.png", 18, 9);

	game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap("level one map", 'assets/tileset/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap("level two map", 'assets/tileset/level2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap("level three map", 'assets/tileset/level3.json', null, Phaser.Tilemap.TILED_JSON);

    //  Next we load the tileset. This is just an image, loaded in via the normal way we load images:

    game.load.image('tiles', 'assets/maplayouts.png');
    game.load.spritesheet('yellow_t','assets/4-way_cell_tower_yellow.png',120,120,8);
    game.load.spritesheet('blue_t','assets/4-way_cell_tower_blue.png',120,120,8);
    game.load.spritesheet('red_t','assets/4-way_cell_tower_pink.png',120,120,8);

    game.load.image('LL', 'assets/Reflect Tower LL.png');
    game.load.image('LR', 'assets/Reflect Tower LR.png');
    game.load.image('UL', 'assets/Reflect Tower UL.png');
    game.load.image('UR', 'assets/Reflect Tower UR.png');
    game.load.image('tree', 'assets/tree.png');
    game.load.image('skyscraper', 'assets/Skyscraper.png');
    game.load.image('y_house', 'assets/yellow_house.png');

    //Need to be replaced in time
    game.load.image('r_house','assets/houseright.png');
    game.load.image('b_house','assets/colorful_building.png');

    game.load.spritesheet('beam', 'assets/signalsprite.png',120,120,15);
};

preloadState.prototype.create = function(){
	game.state.start("Main Menu");
	
};

preloadState.prototype.update = function(){
	
};