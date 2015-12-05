//(function(){

var game = new Phaser.Game(1280, 720, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var frontTrees;

function preload() {
	game.load.image('background_light', 'assets/graphics/background_light.png');
	game.load.image('tree01', 'assets/graphics/tree01.png');
}

function create() {
	game.add.sprite(0, 0, 'background_light');

	points = {
	'x': [ 0, 200, 600, 1300 ],
	'y': [ 440, 210, 250, 100 ]
	};
 
	bmd = game.add.bitmapData(game.world.width, game.world.height);
	bmd.addToWorld();

	bmd.ctx.fillStyle = '#f4f4f4';
	bmd.ctx.beginPath();
	bmd.ctx.moveTo(0, game.world.height);
	for(var i=0; i<game.world.width; i++){
		var index = i/game.world.width;
		var x = game.math.catmullRomInterpolation(points.x, index);
		var y = game.world.height - game.math.catmullRomInterpolation(points.y, index);
		bmd.ctx.lineTo(x,y);
	}

	bmd.ctx.lineTo(game.world.width, game.world.height);
	bmd.ctx.closePath();
	bmd.ctx.fill();


	frontTrees = game.add.group();
	for(var i=0; i<10; i++){
		frontTrees.create(i*512, game.world.height - 256, 'tree01');
	}
	 
}

function update() {
}



//})();