let lvl3 = function(){
	this.score = 0;
};

var cur_over;
var on_swipe;
var n_beam;
var fired;
var win_num;
lvl3.prototype.create = function(){
    win_num = 0;
    fired = false;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.input.onUp.add(this.mouseUp, this);
    game.input.onDown.add(this.mouseDown, this);
    map = game.add.tilemap('level3');
    map.addTilesetImage('maplayouts', 'tiles', 120, 120);

    layer = map.createLayer('ground');

    this.b_towers = game.add.group();
    this.r_towers = game.add.group();
    this.y_towers = game.add.group();
    this.rf_towers = game.add.group();

    this.y_houses = game.add.group();
    this.r_houses = game.add.group();
    this.b_houses = game.add.group();

    this.trees = game.add.group();
    this.scrapers = game.add.group();
    this.mountains = game.add.group();

    for (var ol in map.objects) {
        // Loop over each object in the object layer
        for (var o in map.objects[ol]) {
            var obj = map.objects[ol][o];
            if(map.objects[ol][o].type === 'red_tower'){
                var tow = game.add.sprite(obj.x, obj.y, 'red_t',0);
                tow.inputEnabled = true;
                tow.events.onInputDown.add(this.over,tow);
                //tow.events.onInputOver.add(this.over,tow);
                tow.events.onInputOut.add(this.out,tow);
                tow.t_type = 'tower';
                tow.col = colors.RED;
                tow.dir = 0;
                tow.animations.add('spin', [0,1,2,3,4,5,6,7],13,true);
                tow.animations.play('spin');
                this.r_towers.add(tow);
            }
            else if(map.objects[ol][o].type === 'yellow_tower'){
                var tow = game.add.sprite(obj.x,obj.y, 'yellow_t',0);
                tow.inputEnabled = true;
                tow.events.onInputDown.add(this.over,tow);
                //tow.events.onInputOver.add(this.over,tow);
                tow.events.onInputOut.add(this.out,tow);
                tow.t_type = 'tower';
                tow.col = colors.YELLOW;
                tow.dir = 0;
                tow.animations.add('spin', [0,1,2,3,4,5,6,7],13,true);
                tow.animations.play('spin');
                this.y_towers.add(tow);
            }
            else if(map.objects[ol][o].type === 'blue_tower'){
                var tow = game.add.sprite(obj.x,obj.y, 'blue_t',0);
                tow.inputEnabled = true;
                tow.events.onInputDown.add(this.over,tow);
                //tow.events.onInputOver.add(this.over,tow);
                tow.events.onInputOut.add(this.out,tow);
                tow.t_type = 'tower';
                tow.col = colors.BLUE;
                tow.dir = 0;
                tow.animations.add('spin', [0,1,2,3,4,5,6,7],13,true);
                tow.animations.play('spin');
                this.b_towers.add(tow);
            }
            else if(map.objects[ol][o].type === 'red_house'){
                var house = game.add.sprite(obj.x, obj.y, 'obj',1);
                house.animations.add('on',[1,2],5,false);
                house.t_type = 'house';
                house.col = colors.RED;
                house.on = false;
                house.alpha = 0.25;
                this.r_houses.add(house);
            }
            else if(map.objects[ol][o].type === 'yellow_house'){
                var house = game.add.sprite(obj.x,obj.y, 'obj',5);
                house.animations.add('on',[5,6],5,false);
                house.t_type = 'house';
                house.col = colors.YELLOW;
                house.on = false;
                house.alpha = 0.25;
                this.y_houses.add(house);
            }
            else if(map.objects[ol][o].type === 'blue_house'){
                var house = game.add.sprite(obj.x,obj.y, 'obj', 3);
                house.animations.add('on',[3,4],5,false);
                house.t_type = 'house';
                house.col = colors.BLUE;
                house.on = false;
                house.alpha = 0.25;
                this.b_houses.add(house);
            }
            else if(map.objects[ol][o].type === 'refection_tower'){
                var tow = game.add.sprite(obj.x,obj.y, 'LL');
                tow.inputEnabled = true;
                tow.events.onInputDown.add(this.over,tow);
                //tow.events.onInputOver.add(this.over,tow);
                tow.events.onInputOut.add(this.out,tow);
                tow.dir = directions.UPRIGHT;
                tow.col = colors.REF;
                tow.t_type = 'tower';
                this.rf_towers.add(tow);
            }
            else if(map.objects[ol][o].type === 'sky'){
                var scraper = game.add.sprite(obj.x,obj.y, 'skyscraper');
                scraper.t_type = 'sky';
                this.scrapers.add(scraper);
            }
            else if(map.objects[ol][o].type === 'tree'){
                var tree = game.add.sprite(obj.x,obj.y, 'tree');
                tree.t_type = 'tree';
                game.physics.arcade.enable(tree);
                tree.physicsBodyType = Phaser.Physics.ARCADE;
                tree.enableBody = true;
                tree.body.immovable = true;
                this.trees.add(tree);
            }
            else if(map.objects[ol][o].type === 'mountain'){
                var mountain = game.add.sprite(obj.x,obj.y);
                game.physics.arcade.enable(mountain);
                mountain.physicsBodyType = Phaser.Physics.ARCADE;
                mountain.enableBody = true;
                mountain.body.immovable = true;
                mountain.t_type = 'mountain';
                this.mountains.add(mountain);
            }
            
        }
    }

    game.physics.arcade.enable(this.y_houses);
    this.y_houses.enableBody = true;
    this.y_houses.physicsBodyType = Phaser.Physics.ARCADE;

    game.physics.arcade.enable(this.b_houses);
    this.b_houses.enableBody = true;
    this.b_houses.physicsBodyType = Phaser.Physics.ARCADE;

    game.physics.arcade.enable(this.r_houses);
    this.r_houses.enableBody = true;
    this.r_houses.physicsBodyType = Phaser.Physics.ARCADE;
    
    game.physics.arcade.enable(this.trees);
    this.trees.enableBody = true;
    this.trees.physicsBodyType = Phaser.Physics.ARCADE;

    game.physics.arcade.enable(this.scrapers);
    this.scrapers.enableBody = true;
    this.scrapers.physicsBodyType = Phaser.Physics.ARCADE;

    game.physics.arcade.enable(this.rf_towers);
    this.rf_towers.enableBody = true;
    this.rf_towers.physicsBodyType = Phaser.Physics.ARCADE;

    game.physics.arcade.enable(this.mountains);
    this.mountains.enableBody = true;
    this.mountains.physicsBodyType = Phaser.Physics.ARCADE;

    layer.resizeWorld();
};
lvl3.prototype.mouseDown = function() {
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
lvl3.prototype.mouseUp = function() {
    this.mouseIsDown = false;
};
lvl3.prototype.swipeDone = function(cur_over) {
    //get the ending point
    var endX = game.input.x;
    var endY = game.input.y;
    var diffx = Math.abs(this.startX - endX);
    var diffy = Math.abs(this.startY - endY);
    var dirx = endX - this.startX;
    var diry = endY - this.startY;
    
    //check the start point against the end point
    if(cur_over.t_type === 'tower'){
        if(cur_over.col === colors.REF){
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
lvl3.prototype.createBeam = function(tower){
    if(fired === false){
        currentX = tower.centerX;
        currentY = tower.centerY;
        if(tower.col === colors.RED){
            n_beam = game.add.sprite(tower.x,tower.y,'beam',9);
            n_beam.animations.add('beamer',[9,10,11,12,13,14],13,true);
        }
        else if(tower.col === colors.BLUE){
            n_beam = game.add.sprite(tower.x,tower.y,'beam',0);
            n_beam.animations.add('beamer',[0,1,2,3,4,5],13,true);
        }
        else if(tower.col === colors.YELLOW){
            n_beam = game.add.sprite(tower.x,tower.y,'beam',16);
            n_beam.animations.add('beamer',[16,17,18,19,20,21],13,true);
        }
        n_beam.col = tower.col;
        n_beam.dir = tower.dir;
        game.physics.arcade.enable(n_beam);
        n_beam.enableBody = true;
        n_beam.physicsBodyType = Phaser.Physics.ARCADE;
        n_beam.checkWorldBounds = true;
        n_beam.outOfBoundsKill = true;
        if(n_beam.dir === directions.UP){
            n_beam.body.velocity.y = -360;
        }
        else if(n_beam.dir === directions.LEFT){
            n_beam.body.velocity.x = -360;
        }
        else if(n_beam.dir === directions.RIGHT){
            n_beam.body.velocity.x = 360;
        }
        else if(n_beam.dir === directions.DOWN){
            n_beam.body.velocity.y = 360;
        }
        //game.physics.arcade.moveToXY(n_beam,0,tower.y,240);
        //n_beam.updateTransform();
        n_beam.animations.play('beamer');
        fired = true;
    }
    else{
        if(n_beam.visible === false){
            fired = false;
        }
    }
}

lvl3.prototype.collisionCallback = function(spriteA, spriteB) {
    if(spriteB.t_type === 'tree'){
        spriteA.kill();
        fired = false;
    }
    else if(spriteB.t_type === 'sky'){
        spriteA.kill();
        fired = false;
    }
    else if(spriteB.t_type === 'house'){
        if(spriteA.col === spriteB.col){
            if(spriteB.on === false){
                win_num++;
                spriteB.on = true;
                spriteB.alpha = 1.0;
                spriteB.animations.play('on');
            }
        }
    }
    else if(spriteB.t_type === 'tower'){
        if(spriteB.col === colors.REF){
            if(spriteA.dir === directions.UP){
                if(spriteB.dir === directions.DOWNRIGHT){
                    spriteA.dir = directions.RIGHT;
                    spriteA.body.velocity.y = 0;
                    spriteA.body.velocity.x = 360;
                    spriteA.x = spriteB.x + 120;
                    spriteA.y = spriteB.y;
                }
                else if(spriteB.dir === directions.DOWNLEFT){
                    spriteA.dir = directions.LEFT;
                    spriteA.body.velocity.y = 0;
                    spriteA.body.velocity.x = -360;
                    spriteA.x = spriteB.x - 120;
                    spriteA.y = spriteB.y;
                }
                else{
                    spriteA.kill();
                    fired = false;
                }
            }
            else if(spriteA.dir === directions.DOWN){
                if(spriteB.dir === directions.UPRIGHT){
                    spriteA.dir = directions.RIGHT;
                    spriteA.body.velocity.y = 0;
                    spriteA.body.velocity.x = 360;
                    spriteA.x = spriteB.x + 120;
                    spriteA.y = spriteB.y;
                }
                else if(spriteB.dir === directions.UPLEFT){
                    spriteA.dir = directions.LEFT;
                    spriteA.body.velocity.y = 0;
                    spriteA.body.velocity.x = -360;
                    spriteA.x = spriteB.x - 120;
                    spriteA.y = spriteB.y;
                }
                else{
                    spriteA.kill();
                    fired = false;
                }
            }
            else if(spriteA.dir === directions.LEFT){
                if(spriteB.dir === directions.UPRIGHT){
                    spriteA.dir = directions.UP;
                    spriteA.body.velocity.y = -360;
                    spriteA.body.velocity.x = 0;
                    spriteA.x = spriteB.x;
                    spriteA.y = spriteB.y - 120;
                }
                else if(spriteB.dir === directions.DOWNRIGHT){
                    spriteA.dir = directions.DOWN;
                    spriteA.body.velocity.y = 360;
                    spriteA.body.velocity.x = 0;
                    spriteA.x = spriteB.x;
                    spriteA.y = spriteB.y + 120;
                }
                else{
                    spriteA.kill();
                    fired = false;
                }
            }
            else if(spriteA.dir === directions.RIGHT){
                if(spriteB.dir === directions.UPLEFT){
                    spriteA.dir = directions.UP;
                    spriteA.body.velocity.y = -360;
                    spriteA.body.velocity.x = 0;
                    spriteA.x = spriteB.x;
                    spriteA.y = spriteB.y - 120;
                }
                else if(spriteB.dir === directions.DOWNLEFT){
                    spriteA.dir = directions.DOWN;
                    spriteA.body.velocity.y = 360;
                    spriteA.body.velocity.x = 0;
                    spriteA.x = spriteB.x;
                    spriteA.y = spriteB.y + 120;
                }
                else{
                    spriteA.kill();
                    fired = false;
                }
            }
        }
    }
    else if(spriteB.t_type === 'mountain'){
        spriteA.kill();
        fired = false;
    }
}
lvl3.prototype.over = function(tower){
    cur_over = tower;
    on_swipe = true;
    
}
lvl3.prototype.out = function(tower){
    on_swipe = false;
}
lvl3.prototype.update = function(){
    game.physics.arcade.overlap(n_beam,this.trees,this.collisionCallback,null, this);
    game.physics.arcade.overlap(n_beam,this.scrapers,this.collisionCallback,null, this);
    game.physics.arcade.overlap(n_beam,this.mountains,this.collisionCallback,null, this);

    game.physics.arcade.overlap(n_beam,this.rf_towers,this.collisionCallback,null, this);

    game.physics.arcade.overlap(n_beam,this.r_houses,this.collisionCallback,null, this);
    game.physics.arcade.overlap(n_beam,this.b_houses,this.collisionCallback,null, this);
    game.physics.arcade.overlap(n_beam,this.y_houses,this.collisionCallback,null, this);

    if(win_num === 45){
        game.state.start("Win");
    }
    if (this.mouseIsDown == true) {
        //get the distance between the start and end point
        var distX = Math.abs(game.input.x - this.startX);
        var distY = Math.abs(game.input.y - this.startY);
        //if the distance is greater than 50 pixels then a swipe has happened
        if (distX > 50 || distY > 50) {
            this.swipeDone(cur_over);
        }
    }
};
