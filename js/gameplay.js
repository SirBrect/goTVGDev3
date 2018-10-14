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
    b_towers = game.add.group();
    r_towers = game.add.group();
    y_towers = game.add.group();
    rf_towers = game.add.group();

    y_houses = game.add.group();
    r_houses = game.add.group();
    b_houses = game.add.group();

    trees = game.add.group();
    scrapers = game.add.group();
    for (var ol in map.objects) {
        // Loop over each object in the object layer
        for (var o in map.objects[ol]) {
            var obj = map.objects[ol][o];
            if(map.objects[ol][o].type === 'red_tower'){
                var tow = game.add.sprite(obj.x, obj.y, '4way_red',0);
                //tow.inputEnabled = true;
                //tow.events.onInputDown.add(this.over,tow);
                tow.t_type = 'red_tower';
                r_towers.add(tow);
            }
            else if(map.objects[ol][o].type === 'yellow_tower'){
                var tow = game.add.sprite(obj.x,obj.y, '4way_yellow',0);
                //tow.inputEnabled = true;
                //tow.events.onInputDown.add(this.over,tow);
                tow.t_type = 'yellow_tower';
                y_towers.add(tow);
            }
            else if(map.objects[ol][o].type === 'blue_tower'){
                var tow = game.add.sprite(obj.x,obj.y, '4way_blue',0);
                //tow.inputEnabled = true;
                //tow.events.onInputDown.add(this.over,tow);
                tow.t_type = 'blue_tower';
                b_towers.add(tow);
            }
            else if(map.objects[ol][o].type === 'red_house'){
                var house = game.add.sprite(obj.x, obj.y, 'r_house');
                house.t_type = 'red_house';
                r_houses.add(house);
            }
            else if(map.objects[ol][o].type === 'yellow_house'){
                var house = game.add.sprite(obj.x,obj.y, 'y_house');
                house.t_type = 'yellow_house';
                y_houses.add(house);
            }
            else if(map.objects[ol][o].type === 'blue_house'){
                var house = game.add.sprite(obj.x,obj.y, 'b_house');
                house.t_type = 'blue_house';
                b_houses.add(house);
            }
            else if(map.objects[ol][o].type === 'refection_tower'){
                var tow = game.add.sprite(obj.x,obj.y, 'LL');
                tow.inputEnabled = true;
                tow.events.onInputDown.add(this.over,tow);
                tow.dir = 0;
                tow.t_type = 'refection_tower';
                rf_towers.add(tow);
            }
            else if(map.objects[ol][o].type === 'sky'){
                var scraper = game.add.sprite(obj.x,obj.y, 'skyscraper');
                scraper.t_type = 'sky';
                scrapers.add(tow);
            }
            else if(map.objects[ol][o].type === 'tree'){
                var tree = game.add.sprite(obj.x,obj.y, 'tree');
                tree.t_type = 'tree';
                trees.add(tow);
            }
            
            // Do something with the object data here; game.add.sprite(object.name)
            // for example, or even game.add[object.type](object.name)
        }
    }

    r_towers.callAll('animations.add','animations','spin_r', [0,1,2,3,4,5,6,7],20,true);
    r_towers.callAll('animations.play','animations','spin_r');

    b_towers.callAll('animations.add','animations','spin_b', [0,1,2,3,4,5,6,7],20,true);
    b_towers.callAll('animations.play','animations','spin_b');

    y_towers.callAll('animations.add','animations','spin_y', [0,1,2,3,4,5,6,7],20,true);
    y_towers.callAll('animations.play','animations','spin_y');

    //  This resizes the game world to match the layer dimensions
    layer.resizeWorld();
};
gameplayState.prototype.over = function(tower){
    if(tower.t_type === 'm_tower'){
        game.state.start("Win");
    }
    else if(tower.t_type === 'refection_tower'){
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
