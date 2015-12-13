//(function(){

var game = new Phaser.Game(1280, 720, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

var layers = {},
	sledge,
	segments = [],
	activeSegments = [],
	collisionGroups = {},
	currentSection,
	sectionController,
	darkerOverlays = [];

function preload() {
	game.load.image('background_light', 'assets/graphics/background_light.png');
	game.load.image('background_dark', 'assets/graphics/background_dark.png');
	game.load.image('foreground_dark', 'assets/graphics/foreground_dark.png');
	game.load.image('forest', 'assets/graphics/forest.png');
	game.load.image('village', 'assets/graphics/village.png');
	game.load.image('house01', 'assets/graphics/house01.png');
	game.load.image('tree01', 'assets/graphics/tree01.png');
	game.load.image('tree02', 'assets/graphics/tree02.png');
	game.load.image('tree03', 'assets/graphics/tree03.png');
	game.load.image('tree04', 'assets/graphics/tree04.png');
	game.load.image('mountain01', 'assets/graphics/mountain01.png');
	game.load.image('mountain02', 'assets/graphics/mountain02.png');
	game.load.image('mountain03', 'assets/graphics/mountain03.png');
	game.load.image('sledge', 'assets/graphics/sledge.png');
	game.load.image('santa_head', 'assets/graphics/santa_head.png');
	game.load.image('santa_hat', 'assets/graphics/santa_hat.png');
	game.load.image('particle_snow', 'assets/graphics/particle_snow.png');
}

function create() {


	game.world.setBounds(0, 0, 44000, 720);

	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.p2.setBoundsToWorld(true, true, false, true);
	game.physics.p2.gravity.y = 400;
    game.physics.p2.restitution = 0.01;
    game.physics.p2.friction = 0.2;
    game.physics.p2.setImpactEvents(true);

    collisionGroups.segments = game.physics.p2.createCollisionGroup();
    collisionGroups.player = game.physics.p2.createCollisionGroup();


	game.add.image(0, 0, 'background_light').fixedToCamera = true;
	var bgdark = game.add.image(0, 0, 'background_dark');
	bgdark.fixedToCamera = true;
	darkerOverlays.push(bgdark);

	layers.background1 = game.add.group();
	layers.background2 = game.add.group();
	layers.tiledBackground = game.add.group();
	layers.middleground = game.add.group();

	segments = [];
	activeSegments = [];

	layers.track = game.add.group();

	
	sledge = new Sledge(game, collisionGroups);
	sledge.create();

	layers.foreground = game.add.group();	

	sectionController = new SectionController(sections, game);

	currentSection = sectionController.getNextSection(layers);
	currentSection.create();
	segments = segments.concat(currentSection.segments);
	for(var i=0; i<10; ++i){
		activeSegments.push(segments.shift().create(layers.track, collisionGroups));
	}


	var fg = game.add.image(0, 0, 'foreground_dark');
	fg.fixedToCamera = true;
	fg.blendMode = Phaser.blendModes.MULTIPLY;
	fg.alpha = 0;
	darkerOverlays.push(fg);


	layers.middleground.create(40500, game.world.bounds.height - 512, "house01");
	layers.middleground.create(41000, game.world.bounds.height - 512, "house01");
	layers.middleground.create(41512, game.world.bounds.height - 512, "house01");
	layers.middleground.create(42256, game.world.bounds.height - 512, "house01");
	game.add.image(43000, game.world.bounds.height - 505, 'tree04');
	 
}

function debug(debug){
	if(debug){
		layers.background1.alpha = 0.5;
		layers.background2.alpha = 0.5;
		layers.track.alpha = 0.2;
	}else{
		layers.background1.alpha = 1;
		layers.background2.alpha = 1;
		layers.track.alpha = 1;
	}
}

function update() {
	
	sledge.update();
	currentSection.update();
	darkerOverlays[0].alpha = game.camera.x / game.world.bounds.width;
	darkerOverlays[1].alpha = 0.6 * game.camera.x / game.world.bounds.width;

	if(activeSegments.length > 0 && !activeSegments[0].isVisible()){
		activeSegments.shift().destroy();
		if(activeSegments.length < 3 && segments.length > 0){
			activeSegments.push(segments.shift().create(layers.track, collisionGroups));
		}
	}

	if(currentSection.loadNext != undefined){
		if(sledge.sprite.body.x > currentSection.loadNext ){
			var nextSection = sectionController.getNextSection(layers);
			layers.background1.removeAll();
			layers.background2.removeAll();
			layers.tiledBackground.removeAll();

			nextSection.middleground.lastGenerated = currentSection.middleground.lastGenerated;
			nextSection.create();
			nextSection.tiledBackground.part1.x = currentSection.tiledBackground.part1.x;
			nextSection.tiledBackground.part2.x = currentSection.tiledBackground.part2.x;
			segments = segments.concat(nextSection.segments);
			currentSection = nextSection;
		}
	}

	
}






//})();