//(function(){

var game = new Phaser.Game(1280, 720, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

var layers = {},
	background1,
	background2;

var mountainRow2, frontTrees, backTrees,
	sledge,
	forest1,
	forest2,
	segments,
	segmentGroup,
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
	game.world.setBounds(0, 0, 18500, 720);

	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.p2.setBoundsToWorld(true, true, false, true);
	game.physics.p2.gravity.y = 200;
    game.physics.p2.restitution = 0.01;
    game.physics.p2.friction = 0.2;


	game.add.image(0, 0, 'background_light').fixedToCamera = true;


	layers.background1 = game.add.group();
	layers.background2 = game.add.group();
	background1 = new BackgroundLayer(layers.background1, ['mountain02', 'mountain03'], 256, 512, 640, 0.95);
	background2 = new BackgroundLayer(layers.background2, ['mountain01'], 256, 512, 640, 0.9);

	

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
	segments.push(new Segment(game, {
			'x': [ 8000, 9500, 10500, 12500],
			'y': [ 300, 500, 600, 10]
		})
	);
	segments.push(new Segment(game, {
			'x': [ 12500, 15000],
			'y': [ 10, 100]
		})
	);
	segments.push(new Segment(game, {
			'x': [ 15000, 15500, 16000, 16500, 17000, 17500, 18000, 18500],
			'y': [ 100, 200, 100, 200, 100, 200, 100, 200]
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


	segmentGroup = game.add.group();
	for(var i=0; i<3; ++i){
		activeSegments.push(segments.shift().create(segmentGroup));
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
	background1.update();
	background2.update();

	forest1.x = game.camera.x * 0.85 + forest1.offset;
	forest2.x = game.camera.x * 0.85 + forest2.offset;

	if(activeSegments.length > 0 && !activeSegments[0].isVisible()){
		activeSegments.shift().destroy();
		console.log("removed section. left:", activeSegments.length);
		if(segments.length > 0){
			activeSegments.push(segments.shift().create(segmentGroup));
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