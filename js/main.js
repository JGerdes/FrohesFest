//(function(){

var game = new Phaser.Game(1280, 720, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var frontTrees;

function preload() {
	game.load.image('background_light', 'assets/graphics/background_light.png');
	game.load.image('tree01', 'assets/graphics/tree01.png');
}

function create() {
	game.add.sprite(0, 0, 'background_light');

	frontTrees = game.add.group();
	for(var i=0; i<10; i++){
		frontTrees.create(i*256, game.world.height - 256, 'tree01');
	}

	
	 
}

function update() {
}



//})();