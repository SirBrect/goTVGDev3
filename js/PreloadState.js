// preloadState constructor

let preloadState = function(){

};

preloadState.prototype.preload = function(){
	game.load.image("play button", "assets/PlayButton.png");
	game.load.image("win screen", "assets/WinScreen.png");

	game.load.tilemap('level1', 'assets/tileset/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('level2','assets/tileset/level2.json',null,Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('level3', 'assets/tileset/level3.json',null,Phaser.Tilemap.TILED_JSON);

    game.load.audio('pop', 'sound/poppixel.mp3');
    game.load.audio('rap', 'sound/rappixel.mp3');
    game.load.audio('rock', 'sound/rockpixel.mp3');
    game.load.audio('statictrans', 'sound/statictrans.mp3');


    //  Next we load the tileset. This is just an image, loaded in via the normal way we load images:

    game.load.image('tiles', 'assets/maplayouts.png');
    game.load.spritesheet('obj','assets/objects.png',120,120,45);

    game.load.spritesheet('buttons','assets/buttons.png', 90, 45, 4)
    game.load.spritesheet('yellow_t','assets/4-way_cell_tower_yellow.png',120,120,8);
    game.load.spritesheet('blue_t','assets/4-way_cell_tower_blue.png',120,120,8);
    game.load.spritesheet('red_t','assets/4-way_cell_tower_pink.png',120,120,8);

    game.load.image('LL', 'assets/Reflect Tower LL.png');
    game.load.image('LR', 'assets/Reflect Tower LR.png');
    game.load.image('UL', 'assets/Reflect Tower UL.png');
    game.load.image('UR', 'assets/Reflect Tower UR.png');
    game.load.image('tree', 'assets/tree.png');
    game.load.image('skyscraper', 'assets/Skyscraper.png');
    game.load.image('main menu screen','assets/main_menu_w_padding.png');

    //Need to be replaced in time

    game.load.spritesheet('beam', 'assets/signalsprite.png',60,60,24);
    game.load.spritesheet('sidebeam', 'assets/signalspritesideways.png',60,60,12);
};

preloadState.prototype.create = function(){
	game.state.start("Main Menu");
	
};

preloadState.prototype.update = function(){
	
};