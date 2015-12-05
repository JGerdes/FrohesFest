//(function(){

var game = new Phaser.Game(1280, 720, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

var mountainRow1, mountainRow2, frontTrees, sledge;

function preload() {
	game.load.image('background_light', 'assets/graphics/background_light.png');
	game.load.image('tree01', 'assets/graphics/tree01.png');
	game.load.image('mountain01', 'assets/graphics/mountain01.png');
	game.load.image('mountain02', 'assets/graphics/mountain02.png');
	game.load.image('mountain03', 'assets/graphics/mountain03.png');
	game.load.image('sledge', 'assets/graphics/sledge.png');
}

function create() {
	game.world.setBounds(-0, 0, 5000, 720);

	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.p2.gravity.y = 100;
    game.physics.p2.restitution = 0.1;
    game.physics.p2.friction = 0.2;


	game.add.image(0, 0, 'background_light').fixedToCamera = true;

	mountainRow1 = game.add.group();
	start = -512;
	for(var i=0; i<30; i++){
		start += 256 + Math.random()*192;
		var mountid = Math.floor(Math.random()* 2) + 2;
		var temp = mountainRow1.create(start, 640, 'mountain0'+ mountid);
		temp.position.y -= temp.height; 
		temp.alpha = 0.6;

	}
	mountainRow2 = game.add.group();
	start = -512;
	for(var i=0; i<30; i++){
		start += 256 + Math.random()*192;
		var temp = mountainRow2.create(start, 640, 'mountain01');
		temp.position.y -= temp.height; 

	}

	var seg = new Segment(game, {
		'x': [ 0, 200, 600],
		'y': [ 440, 210, 250]
	}).create();

	
	sledge = game.add.sprite(10, 100, 'sledge');


	frontTrees = game.add.group();
	start = 0;
	for(var i=0; i<10; i++){
		start += 512 + Math.random()*1024;
		frontTrees.create(start, game.world.height - 256, 'tree01');
	}


	game.camera.follow(sledge);


	

	game.physics.p2.enable(sledge, false);
	sledge.body.clearShapes();
	sledge.body.addPolygon( {} ,   [[0,0]  ,  [185/1.5, 0]  ,  [185/1.5, 90/1.5] , [175/1.5, 100/1.5], [142/1.5, 118/1.5]  ,  [0, 118/1.5]]  );

	

	speed = 0;


	 
}

function update() {
	if(game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)
		|| game.input.pointer1.isDown){
		sledge.body.moveRight(500);
	}
	frontTrees.x = game.camera.x * - 0.8;
	mountainRow1.x = game.camera.x * 0.9;
	mountainRow2.x = game.camera.x * 0.8;
}



//})();