// gameplayState constructor

let gameplayState = function(){
	this.score = 0;
};
var map;
var layer;
var towers;
gameplayState.prototype.create = function(){
    map = game.add.tilemap('map');
    map.addTilesetImage('maplayouts', 'tiles', 120, 120);
    
    layer = map.createLayer('ground');
    f_towers = game.add.group();
    r_towers = game.add.group();
    houses = game.add.group();
    trees = game.add.group();
    scrapers = game.add.group();
    for (var ol in map.objects) {
        // Loop over each object in the object layer
        for (var o in map.objects[ol]) {
            var obj = map.objects[ol][o];
            if(map.objects[ol][o].type === 'm_tower'){
                var tow = game.add.sprite(obj.x, obj.y, '4way',0);
                tow.inputEnabled = true;
                tow.events.onInputDown.add(this.over,tow);
                tow.t_type = 'm_tower';
                f_towers.add(tow);
            }
            else if(map.objects[ol][o].type === 'c_tower'){
                var tow = game.add.sprite(obj.x,obj.y, 'LL');
                tow.inputEnabled = true;
                tow.events.onInputDown.add(this.over,tow);
                tow.dir = 0;
                tow.t_type = 'c_tower';
                r_towers.add(tow);
            }
            else if(map.objects[ol][o].type === 'skyscraper'){
                var scraper = game.add.sprite(obj.x,obj.y, 'skyscraper');
                scraper.t_type = 'skyscraper';
                r_towers.add(tow);
            }
            else if(map.objects[ol][o].type === 'tree'){
                var tree = game.add.sprite(obj.x,obj.y, 'tree');
                tree.t_type = 'tree';
                trees.add(tow);
            }
            else if(map.objects[ol][o].type === 'y_house'){
                var house = game.add.sprite(obj.x,obj.y, 'y_house');
                house.t_type = 'y_house';
                houses.add(house);
            }
            
            // Do something with the object data here; game.add.sprite(object.name)
            // for example, or even game.add[object.type](object.name)
        }
    }

    f_towers.callAll('animations.add','animations','spin', [0,1,2,3,4,5,6,7],20,true);
    f_towers.callAll('animations.play','animations','spin');
    //  This resizes the game world to match the layer dimensions
    layer.resizeWorld();
};
gameplayState.prototype.over = function(tower){
    if(tower.t_type === 'm_tower'){
        game.state.start("Win");
    }
    else if(tower.t_type === 'c_tower'){
        if(tower.dir === 0){
            tower.dir++;
            tower.loadTexture('LR');
            tower.update();
        }
        else if(tower.dir === 1){
            tower.dir++;
            tower.loadTexture('UL');
            tower.update();
        }
        else if(tower.dir === 2){
            tower.dir++;
            tower.loadTexture('UR');
            tower.update();
        }
        else if(tower.dir === 3){
            tower.dir = 0;
            tower.loadTexture('LL');
            tower.update();
        }
    }
}
gameplayState.prototype.update = function(){
};
