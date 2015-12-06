//(function(){

var game = new Phaser.Game(1280, 720, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

var layers = {},
	background1,
	background2,
	tiledBackground,
	middleground,
	foreground,

	sledge,
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
	game.physics.p2.gravity.y = 400;
    game.physics.p2.restitution = 0.01;
    game.physics.p2.friction = 0.2;


	game.add.image(0, 0, 'background_light').fixedToCamera = true;

	layers.background1 = game.add.group();
	layers.background2 = game.add.group();
	layers.tiledBackground = game.add.group();


	background1 = new BackgroundLayer(layers.background1, ['mountain02', 'mountain03'], 256, 512, 640, 0.95);
	background2 = new BackgroundLayer(layers.background2, ['mountain01'], 256, 512, 640, 0.9);

	tiledBackground = new TiledLayer(layers.tiledBackground, 'forest', game.world.height, 0.85);

	layers.middleground = game.add.group();

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

	middleground = new MiddlegroundLayer(layers.middleground, ['tree02'], 256, 1024, activeSegments, 0);

	segmentGroup = game.add.group();
	for(var i=0; i<3; ++i){
		activeSegments.push(segments.shift().create(segmentGroup));
	}

	sledge = new Sledge(game);
	sledge.create();

	layers.foreground = game.add.group();
	foreground = new ForegroundLayer(layers.foreground, ['tree01'], 512, 2048, game.world.height, -0.9);
	
	 
}

function update() {
	
	sledge.update();
	background1.update();
	background2.update();
	tiledBackground.update();
	middleground.update();
	foreground.update();

	if(activeSegments.length > 0 && !activeSegments[0].isVisible()){
		activeSegments.shift().destroy();
		if(segments.length > 0){
			activeSegments.push(segments.shift().create(segmentGroup));
		}
	}

	
}






//})();