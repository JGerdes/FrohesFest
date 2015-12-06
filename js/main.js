//(function(){

var game = new Phaser.Game(1280, 720, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

var layers = {},
	sledge,
	segments = [],
	activeSegments = [],
	currentSection,
	sectionController;

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
	layers.middleground = game.add.group();

	segments = [];
	activeSegments = [];

	layers.track = game.add.group();

	
	sledge = new Sledge(game);
	sledge.create();

	layers.foreground = game.add.group();	

	sectionController = new SectionController({}, game);

	currentSection = sectionController.getNextSection(layers);
	currentSection.create();
	segments = segments.concat(currentSection.segments);
	for(var i=0; i<3; ++i){
		activeSegments.push(segments.shift().create(layers.track));
	}
	 
}

function update() {
	
	sledge.update();
	currentSection.update();

	if(activeSegments.length > 0 && !activeSegments[0].isVisible()){
		activeSegments.shift().destroy();
		if(segments.length > 0){
			activeSegments.push(segments.shift().create(layers.track));
		}
	}

	
}






//})();