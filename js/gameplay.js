let gameplayState = function(){
	this.score = 0;
    gameplayState.levelCount = gameplayState.levelCount ? gameplayState.levelCount + 1 : 1;
};

let directions = {
	UP:0,
	RIGHT:1,
	DOWN:2,
    LEFT:3,
    UPRIGHT:4,
    UPLEFT:5,
    DOWNLEFT:6,
    DOWNRIGHT:7 
};

let colors = {
    REF:0,
    RED:1,
    YELLOW:2,
    BLUE:3
}
var map;
var layer;
var towers;
var cur_over;
var on_swipe;

gameplayState.prototype.create = function(){
    game.input.onUp.add(this.mouseUp, this);
    game.input.onDown.add(this.mouseDown, this);
    switch(this.levelCount){
        case 1:
            map = game.add.tilemap("level one map");
            break;
        case 2:
            map = game.add.tilemap("level two map");
            break;
        case 3:
            map = game.add.tilemap("level three map");
            break;
        default:
            map = game.add.tilemap("level one map");
    }
    
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
                tow.col = colors.RED;
                tow.dir = 0;
                tow.animations.add('spin', [0,1,2,3,4,5,6,7],13,true);
                tow.animations.play('spin');
                tow.beam = [];
                r_towers.add(tow);
            }
            else if(map.objects[ol][o].type === 'yellow_tower'){
                var tow = game.add.sprite(obj.x,obj.y, 'yellow_t',0);
                tow.inputEnabled = true;
                //tow.events.onInputDown.add(this.over,tow);
                tow.events.onInputOver.add(this.over,tow);
                tow.events.onInputOut.add(this.out,tow);
                tow.t_type = 'tower';
                tow.col = colors.YELLOW;
                tow.dir = 0;
                tow.animations.add('spin', [0,1,2,3,4,5,6,7],13,true);
                tow.animations.play('spin');
                tow.beam = [];
                y_towers.add(tow);
            }
            else if(map.objects[ol][o].type === 'blue_tower'){
                var tow = game.add.sprite(obj.x,obj.y, 'blue_t',0);
                tow.inputEnabled = true;
                //tow.events.onInputDown.add(this.over,tow);
                tow.events.onInputOver.add(this.over,tow);
                tow.events.onInputOut.add(this.out,tow);
                tow.t_type = 'tower';
                tow.col = colors.BLUE;
                tow.dir = 0;
                tow.animations.add('spin', [0,1,2,3,4,5,6,7],13,true);
                tow.animations.play('spin');
                tow.beam = [];
                b_towers.add(tow);
            }
            else if(map.objects[ol][o].type === 'red_house'){
                var house = game.add.sprite(obj.x, obj.y, 'r_house');
                house.t_type = 'house';
                house.col = colors.RED;
                r_houses.add(house);
            }
            else if(map.objects[ol][o].type === 'yellow_house'){
                var house = game.add.sprite(obj.x,obj.y, 'y_house');
                house.t_type = 'house';
                house.col = colors.YELLOW;
                y_houses.add(house);
            }
            else if(map.objects[ol][o].type === 'blue_house'){
                var house = game.add.sprite(obj.x,obj.y, 'b_house');
                house.t_type = 'house';
                house.col = colors.BLUE;
                b_houses.add(house);
            }
            else if(map.objects[ol][o].type === 'refection_tower'){
                var tow = game.add.sprite(obj.x,obj.y, 'LL');
                tow.inputEnabled = true;
                tow.events.onInputOver.add(this.over,tow);
                tow.events.onInputOut.add(this.out,tow);
                tow.dir = directions.UPRIGHT;
                tow.col = colors.REF;
                tow.t_type = 'tower';
                tow.beam = [];
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
            
        }
    }

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
};
gameplayState.prototype.mouseUp = function() {
    this.mouseIsDown = false;
};
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
                    cur_over.dir = directions.DOWNRIGHT;
                    cur_over.update();
                }
                else{
                    console.log('Top right swipe detected');
                    cur_over.loadTexture('LL');
                    cur_over.dir = directions.UPRIGHT;
                    cur_over.update();
                }
            }
            else{
                if(diry > 0){
                    console.log('Bottom left swipe detected');
                    cur_over.loadTexture('UR');
                    cur_over.dir = directions.DOWNLEFT;
                    cur_over.update();
                }
                else{
                    console.log('Top left swipe detected');
                    cur_over.loadTexture('LR');
                    cur_over.dir = directions.UPLEFT;
                    cur_over.update();
                }
            }
        }
        else{
            if(diffx > diffy){
                if(dirx > 0){
                    console.log('Swiped right');
                    cur_over.dir = directions.RIGHT;
                    this.createBeam(cur_over);
                }
                else{
                    console.log('Swiped Left');
                    cur_over.dir = directions.LEFT;
                    this.createBeam(cur_over);
                }
            }
            else{
                if(diry > 0){
                    console.log('Swiped down');
                    cur_over.dir = directions.DOWN;
                    this.createBeam(cur_over);
                }
                else{
                    console.log('Swiped up');
                    cur_over.dir = directions.UP;
                    this.createBeam(cur_over);
                }
            }
        }
    }
};
gameplayState.prototype.createBeam = function(tower){
    for(var i = 0; i < tower.beam.length; i++){
        tower.beam[i].destroy();
    }
    tower.beam = [];

    currentX = tower.x;
    currentY = tower.y;
    nextPos = this.nextPosition(tower.dir, 120);
    hit = false;
    while(hit === false){
        currentX = currentX + nextPos[0];
        currentY = currentY + nextPos[1];
        if(currentX > 2436 || currentX < 0 || currentY < 0 || currentY > 1125){
            hit = true;
        }
        else{
            var n_beam = game.add.sprite(currentX,currentY,'beam',0);
            n_beam.animations.add('r_blue',[0,1,2,3,4],13, true);
            if(this.checkOverlap(n_beam,trees) || this.checkOverlap(n_beam, scrapers)){
                hit = true;
                n_beam.destroy();
            }
            else{
                n_beam.animations.play('r_blue');
                tower.beam.push(n_beam);
            }
        }
    }
}
gameplayState.prototype.nextPosition = function(dir, distance){
	switch(dir){
		case directions.UP:
			return [0, -1 * distance];
			break;
		case directions.RIGHT:
			return [distance, 0];
			break;
		case directions.DOWN:
			return [0, distance];
			break;
		case directions.LEFT:
			return [-1 * distance, 0];
			break;
		default:
			return[0,0];
	}
}

gameplayState.prototype.OverlapsKill = function(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}
gameplayState.prototype.checkOverlap = function(spriteA, gSpriteB){
    for(var i = 0, len = gSpriteB.children.length; i < len; i++){
        if(this.OverlapsKill(spriteA,gSpriteB.children[i])){
            return true;
        }
    }
    return false;
}
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
