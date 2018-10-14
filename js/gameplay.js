let gameplayState = function(){
	this.score = 0;
};
var map;
var layer;
var towers;
var cur_over;
var on_swipe;
gameplayState.prototype.create = function(){
    game.input.onUp.add(this.mouseUp, this);
    game.input.onDown.add(this.mouseDown, this);
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
                var tow = game.add.sprite(obj.x, obj.y, 'red_t',0);
                tow.inputEnabled = true;
                //tow.events.onInputDown.add(this.over,tow);
                tow.events.onInputOver.add(this.over,tow);
                tow.events.onInputOut.add(this.out,tow);
                tow.t_type = 'tower';
                tow.col = 1;
                tow.dir = 0;
                tow.animations.add('spin', [0,1,2,3,4,5,6,7],13,true);
                tow.animations.play('spin');
                r_towers.add(tow);
            }
            else if(map.objects[ol][o].type === 'yellow_tower'){
                var tow = game.add.sprite(obj.x,obj.y, 'yellow_t',0);
                tow.inputEnabled = true;
                //tow.events.onInputDown.add(this.over,tow);
                tow.events.onInputOver.add(this.over,tow);
                tow.events.onInputOut.add(this.out,tow);
                tow.t_type = 'tower';
                tow.dir = 2;
                tow.animations.add('spin', [0,1,2,3,4,5,6,7],13,true);
                tow.animations.play('spin');
                y_towers.add(tow);
            }
            else if(map.objects[ol][o].type === 'blue_tower'){
                var tow = game.add.sprite(obj.x,obj.y, 'blue_t',0);
                tow.inputEnabled = true;
                //tow.events.onInputDown.add(this.over,tow);
                tow.events.onInputOver.add(this.over,tow);
                tow.events.onInputOut.add(this.out,tow);
                tow.t_type = 'tower';
                tow.dir = 3;
                tow.animations.add('spin', [0,1,2,3,4,5,6,7],13,true);
                tow.animations.play('spin');
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
                tow.events.onInputOver.add(this.over,tow);
                tow.events.onInputOut.add(this.out,tow);
                tow.dir = 0;
                tow.col = 0;
                tow.t_type = 'tower';
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
            else if(map.objects[ol][o].type === 'mountain'){
                var mountain = game.add.sprite(obj.x,obj.y);
                mountain.inputEnabled = true;
                mountain.events.onInputDown.add(this.over,mountain);
                mountain.t_type = 'mountain';
            }
            
            // Do something with the object data here; game.add.sprite(object.name)
            // for example, or even game.add[object.type](object.name)
        }
    }

    //  This resizes the game world to match the layer dimensions
    layer.resizeWorld();
};
gameplayState.prototype.mouseDown = function() {
    //set the mouseIsDown to true
    this.mouseIsDown = true;
    //
    //
    //record the place the mouse started
    //
    //
    this.startX = game.input.x;
    this.startY = game.input.y;
}
gameplayState.prototype.mouseUp = function() {
    this.mouseIsDown = false;
}
gameplayState.prototype.swipeDone = function(cur_over) {
    //get the ending point
    var endX = game.input.x;
    var endY = game.input.y;
    var diffx = Math.abs(this.startX - endX);
    var diffy = Math.abs(this.startY - endY);
    var dirx = endX - this.startX;
    var diry = endY - this.startY;
    
    //check the start point against the end point
    if(cur_over.t_type === 'tower'){
        if(cur_over.col < 1){
            if(dirx > 0){
                if(diry > 0){
                    console.log('Bottom right swipe detected');
                    cur_over.loadTexture('UL');
                    cur_over.dir = 3;
                    cur_over.update();
                }
                else{
                    console.log('Top right swipe detected');
                    cur_over.loadTexture('LL');
                    cur_over.dir = 0;
                    cur_over.update();
                }
            }
            else{
                if(diry > 0){
                    console.log('Bottom left swipe detected');
                    cur_over.loadTexture('UR');
                    cur_over.dir = 3;
                    cur_over.update();
                }
                else{
                    console.log('Top left swipe detected');
                    cur_over.loadTexture('LR');
                    cur_over.dir = 0;
                    cur_over.update();
                }
            }
        }
        else{
            if(diffx > diffy){
                if(dirx > 0){
                    console.log('Swiped right');
                }
                else{
                    console.log('Swiped Left');
                }
            }
            else{
                if(diry > 0){
                    console.log('Swiped down');
                }
                else{
                    console.log('Swiped up');
                }
            }
        }
    }
}
/*gameplayState.prototype.over = function(tower){
    if(tower.t_type === 'refection_tower'){
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
    else if(tower.t_type === 'mountain'){
        tower.tint = 0xff00ff;
    }
}*/

gameplayState.prototype.over = function(tower){
    cur_over = tower;
    on_swipe = true;
    console.log(cur_over);
}
gameplayState.prototype.out = function(tower){
    on_swipe = false;
    console.log(on_swipe);
}
gameplayState.prototype.update = function(){
    if (this.mouseIsDown == true) {
        //get the distance between the start and end point
        var distX = Math.abs(game.input.x - this.startX);
        var distY = Math.abs(game.input.y - this.startY);
        //if the distance is greater than 50 pixels then a swipe has happened
        if (distX > 50) {
            this.swipeDone(cur_over);
        }
    }
};
