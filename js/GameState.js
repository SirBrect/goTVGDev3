//Constant to stand in for tile size
let TILESIZE = 128;

//Enums for basic properties of game objects
let directions = {
	UP:0;
	RIGHT:1;
	DOWN:2;
	LEFT:3;
};

let powerLevels = {
	LOW:5;
	MED:10;
	HIGH:15;
	GOKU:9001;
};

let colors = {
	RED:0;
	GREEN:1;
	BLUE:2;
};

let nextPosition = function(dir, distance){
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

class Tower{
	constructor(x, y, direction, color, power){
		this.x = x;
		this.y = y;
		this.direction = direction;
		this.color = color;
		this.power = power;
		this.beam = [];
		this.createBeam(x, y, direction, color, power);
	}

	function getDirection(){
		return this.direction;
	}

	function changeDirection(){
		this.direction += 1;
		if(this.direction > 3) this.direction = directions.UP;
	}

	function getPower(){
		return this.power;
	}

	function changePower(){
		this.power += 5;
		if(this.power > powerLevels.HIGH) this.power = powerLevels.LOW;
	}

	function getColor(){
		return this.color;
	}

	function changeColor(){
		this.color += 1;
		if(this.color > 2) this.color = colors.RED;
	}

	function createBeam(direction, color, power){
		//Erase the old beam
		for(entry in this.beam){
			delete entry;
		}
		this.beam = [];

		currentX = this.x;
		currentY = this.y;
		nextPos = nextPosition(this.direction, TILESIZE);

		for(i = 0; i < this.power; i++){
			currentX = currentX + nextPos[0];
			currentY = currentY + nextPos[1];
			this.createBeam.push(new Beam(currentX, currentY, this.direction, this.color));
			//add it to the game
		}
	}

}

class House{
	constructor(x, y, color, powered){
		this.x = x;
		this.y = y;
		this.color = color;
		this.powered = powered;
	}

	function getColor(){
		return this.color;
	}

	function getPowered(){
		return this.powered;
	}

	function changePower(){
		this.powered = !(this.powered);
	}
}

class Beam{
	constructor(x, y, direction, color){
		this.x = x;
		this.y = y;
		this.direction = direction;
		this.color = color;
	}

	function getDirection(){
		return this.direction;
	}

	function getColor(){
		return this.color;
	}

	function changeColor(color){
		this.color = color;
	}
}

let GameState = function(){

}

GameState.prototype.create = function(){
	//Load sprite info from the map

}

GameState.prototype.update = function(){
	
}