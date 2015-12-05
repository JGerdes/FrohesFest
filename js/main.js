//(function(){

var game = new Phaser.Game(1280, 720, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var frontTrees, sledge;

function preload() {
	game.load.image('background_light', 'assets/graphics/background_light.png');
	game.load.image('tree01', 'assets/graphics/tree01.png');
	game.load.image('sledge', 'assets/graphics/sledge.png');
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


	sledge = game.add.sprite(10, 100, 'sledge');


	frontTrees = game.add.group();
	for(var i=0; i<10; i++){
		frontTrees.create(i*512, game.world.height - 256, 'tree01');
	}



	
	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.p2.gravity.y = 100;
    game.physics.p2.restitution = 0.1;
    game.physics.p2.friction = 0.1;

	game.physics.p2.enable(sledge, true);
	sledge.body.clearShapes();
	sledge.body.addPolygon( {} ,   [[0,0]  ,  [185/1.5, 0]  ,  [185/1.5, 90/1.5] , [175/1.5, 100/1.5], [142/1.5, 118/1.5]  ,  [0, 118/1.5]]  );

	floor = game.add.sprite(0, 0);
	game.physics.p2.enable(floor, true);
	floor.body.clearShapes();
	var data = [];
	data.push([0, game.world.height]);

	steps = 20;
	for(var i=0; i<steps; i++){
		var index = i/steps;
		var x = game.math.catmullRomInterpolation(points.x, index);
		var y = game.world.height - game.math.catmullRomInterpolation(points.y, index);
		data.push([x, y]);
	}
	data.push([game.world.width, game.world.height]);
	floor.body.addPolygon( {} ,   data  );
	floor.body.static = true;


	 
}

function update() {
}



//})();