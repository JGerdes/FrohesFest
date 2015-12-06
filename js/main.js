//(function(){

var game = new Phaser.Game(1280, 720, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

var mountainRow1, mountainRow2, frontTrees, backTrees,
	sledge,
	forest1,
	forest2,
	segments,
	activeSegments;

function preload() {
	game.load.image('background_light', 'assets/graphics/background_light.png');
	game.load.image('forest', 'assets/graphics/forest.png');
	game.load.image('tree01', 'assets/graphics/tree01.png');
	game.load.image('tree02', 'assets/graphics/tree02.png');
	game.load.image('mountain01', 'assets/graphics/mountain01.png');
	game.load.image('mountain02', 'assets/graphics/mountain02.png');
	game.load.image('mountain03', 'assets/graphics/mountain03.png');
	game.load.image('sledge', 'assets/graphics/sledge.png');
}

function create() {
	game.world.setBounds(0, 0, 10000, 720);

	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.p2.setBoundsToWorld(true, true, false, true);
	game.physics.p2.gravity.y = 200;
    game.physics.p2.restitution = 0.01;
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

	forest1 = game.add.tileSprite(0, 720 - game.cache.getImage('forest').height, 1280, game.cache.getImage('forest').height, 'forest');
	forest2 = game.add.tileSprite(1280, 720 - game.cache.getImage('forest').height, 1280, game.cache.getImage('forest').height, 'forest');
	forest1.offset = 0;
	forest2.offset = 1280;


	segments = [];
	activeSegments = [];

	segments.push(new Segment(game, {
			'x': [ 0, 200, 600, 900],
			'y': [ 440, 210, 250, 90]
		})
	);
	segments.push(new Segment(game, {
			'x': [ 900, 1200, 1400],
			'y': [ 90, 10, 100]
		})
	);
	segments.push(new Segment(game, {
			'x': [ 1400, 2000, 2500, 3000],
			'y': [ 100, 500, 250, 100]
		})
	);
	segments.push(new Segment(game, {
			'x': [ 3000, 3500, 4000, 4500, 5000, 5500],
			'y': [ 100, 200, 100, 200, 100, 200]
		})
	);
	segments.push(new Segment(game, {
			'x': [ 5500, 6000, 7500, 8000],
			'y': [ 200, 300, 50, 300]
		})
	);

	backTrees = game.add.group();
	start = 0;
	for(var i=0; i<40; i++){
		start += 256 + Math.random()*512;
		var y = game.world.height;
		for(var j=0; j<segments.length; ++j){
			if(segments[j].containsX(start)){
				y = segments[j].getYFor(start) + 64;
				break;
			}
		}
		backTrees.create(start, y, 'tree02').anchor.setTo(0.5, 1);
	}


	for(var i=0; i<5; ++i){
		activeSegments.push(segments.shift().create());
	}


	sledge = game.add.sprite(10, 100, 'sledge');

	frontTrees = game.add.group();
	start = 0;
	for(var i=0; i<20; i++){
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
	frontTrees.x = game.camera.x * - 0.9;
	//backTrees.x = game.camera.x * 0.2;
	mountainRow1.x = game.camera.x * 0.95;
	mountainRow2.x = game.camera.x * 0.9;

	forest1.x = game.camera.x * 0.85 + forest1.offset;
	forest2.x = game.camera.x * 0.85 + forest2.offset;

	if(activeSegments.length > 0 && !activeSegments[0].isVisible()){
		activeSegments.shift().destroy();
		console.log("removed section. left:", activeSegments.length);
		if(segments.length > 0){
			activeSegments.push(segments.shift().create());
			console.log("added new section. now:", activeSegments.length, "left to create:",segments.length);
		}
	}

	updateScrollBackground(forest1);
	updateScrollBackground(forest2);
}


function updateScrollBackground(background) {
	if (game.camera.x - background.x > 1280){
		background.offset += 1280 * 2;
	}
}



//})();