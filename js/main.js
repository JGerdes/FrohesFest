//(function(){

var game = new Phaser.Game(1280, 720, Phaser.CANVAS, '');
var musicManager;

//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Pacifico']
    }

};
var bootState = {
	preload: function(){
		game.stage.backgroundColor = '#00695c';
		game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
		game.load.image('box', 'assets/graphics/box.png');
		game.load.image('progress', 'assets/graphics/progress.png');
	},
	create: function(){
		setTimeout(function(){
			game.state.start('load');
		}, 100);
	}
}

var loadState = {
	preload: function() {
		game.add.image(game.width/2 - 128, game.height/2 - 128, 'box');
		loadState.bar = game.add.tileSprite(0, game.height - 64, 128, 64, 'progress');
		text = game.add.text(game.world.centerX, 100, "Laden...");
	    text.anchor.setTo(0.5);

	    text.font = 'Pacifico';
	    text.fontSize = 90;
	    text.fill = '#ffffff';

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
		game.load.image('checkpoint', 'assets/graphics/checkpoint.png');
		game.load.image('particle_snow', 'assets/graphics/particle_snow.png');
		game.load.image('game_over', 'assets/graphics/game_over.png');
		game.load.image('santa_head_large', 'assets/graphics/santa_head_large.png');
		game.load.image('controls', 'assets/graphics/controls.png');
		game.load.image('frohes_fest', 'assets/graphics/frohes_fest.png');
		game.load.image('danke', 'assets/graphics/danke.png');
		game.load.spritesheet('button', 'assets/graphics/button.png', 203, 57);

		game.load.audio('intro', ['assets/audio/intro.mp3', 'assets/audio/intro.ogg']);
		game.load.audio('part1', ['assets/audio/part1.mp3', 'assets/audio/part1.ogg']);
		game.load.audio('part2', ['assets/audio/part2.mp3', 'assets/audio/part2.ogg']);
		game.load.audio('outro', ['assets/audio/outro.mp3', 'assets/audio/outro.ogg']);

	},
	loadUpdate: function(){
		loadState.bar.width += ((game.load.progress/100) * game.width - loadState.bar.width) / 10;
		loadState.bar.tilePosition.x += 2;
	},
	create: function(){
		var checkpoints = [];
		game.state.states['game'].checkpoints = checkpoints;
		checkpoints.push(new Checkpoint('checkpoint', 6900, 500, '5km'));
		checkpoints.push(new Checkpoint('checkpoint', 14000, 540, '4km'));
		checkpoints.push(new Checkpoint('checkpoint', 20000, 500, '3km'));
		checkpoints.push(new Checkpoint('checkpoint', 25000, 320, '2km'));
		checkpoints.push(new Checkpoint('checkpoint', 30200, 100, '1km'));

		if(window.location.hash.length > 0){
			var checkpointId = parseInt(window.location.hash.substring(1));
			if(!isNaN(checkpointId) && checkpointId > 0 && checkpointId <= checkpoints.length){
				for(var i=0; i<checkpointId; i++){
					checkpoints[i].reached = true;
				}
			}
		}

		game.state.start('splash');
	}
}

var splashState = {
	create: function(){
		game.add.image(game.width/2 - 150, 128, 'santa_head_large');
		game.add.image(game.width/2 - 128, 600, 'controls');
		text = game.add.text(game.world.centerX, 420, "Frohes Fest!");
	    text.anchor.setTo(0.5);

	    text.font = 'Pacifico';
	    text.fontSize = 60;
	    text.fill = '#ffffff';

	    musicManager = new MusicManager(['intro', 'part1', 'part2', 'outro']);
	    musicManager.setNext('intro');
	    musicManager.setNext('part1');

	    game.input.onDown.add(this.startGame);
	},
	startGame: function(){
		game.input.onDown.removeAll();
		game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		
		if (!game.device.desktop) {
			var hint = document.querySelector('#orientation-hint');
			var fullscreenHandler = function(){
				if(game.scale.isLandscape){
					game.scale.startFullScreen(false);
					game.paused = false;
				}
			};
			document.addEventListener('click', fullscreenHandler);
			game.input.onDown.add(fullscreenHandler);
			var orientationHandler = function(){
				if(game.scale.isPortrait){
					game.paused = true;
					hint.style.display = 'block';
					game.scale.stopFullScreen();
				}else{
					hint.style.display = 'none';
				}
			};
			game.scale.onOrientationChange.add(orientationHandler);
			orientationHandler();
		}
		game.state.start('game');
	}
}

var gameState = {
	preload: function(){
		this.layers = {};
		this.sledge;
		this.segments = [];
		this.activeSegments = [];
		this.collisionGroups = {};
		this.currentSection;
		this.sectionController;
		this.darkerOverlays = [];
		this.finalOverlays = {};
	},
	create: function() {
		if(!game.device.desktop){
			game.input.onDown.add(function(){
				if(game.scale.isLandscape){
					game.scale.startFullScreen(false);
					game.paused = false;
				}
			});
		}

		game.world.setBounds(0, 0, 44000, 720);

		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setBoundsToWorld(true, true, false, true);
		game.physics.p2.gravity.y = 400;
	    game.physics.p2.restitution = 0.01;
	    game.physics.p2.friction = 0.2;
	    game.physics.p2.setImpactEvents(true);

	    this.collisionGroups.segments = game.physics.p2.createCollisionGroup();
	    this.collisionGroups.player = game.physics.p2.createCollisionGroup();


		game.add.image(0, 0, 'background_light').fixedToCamera = true;
		var bgdark = game.add.image(0, 0, 'background_dark');
		bgdark.fixedToCamera = true;
		this.darkerOverlays.push(bgdark);

		this.layers.background1 = game.add.group();
		this.layers.background2 = game.add.group();
		this.layers.tiledBackground = game.add.group();
		this.layers.middleground = game.add.group();

		this.segments = [];
		this.activeSegments = [];

		this.layers.track = game.add.group();
		
		this.sledge = new Sledge(game, this.collisionGroups);
		var lastCheckpoint = null;
		for(var i=0; i<this.checkpoints.length; i++){
			if(this.checkpoints[i].reached){
				lastCheckpoint = this.checkpoints[i];
			}else{
				break;
			}
		}

		if(lastCheckpoint != null){
			this.sledge.create(lastCheckpoint.x);
		}else{	
			this.sledge.create();	
		}


		this.layers.checkpoints = game.add.group();

		this.layers.foreground = game.add.group();	

		this.sectionController = new SectionController(sections, game);

		this.currentSection = this.sectionController.getNextSection(this.layers, this.activeSegments);
		this.currentSection.create();
		this.segments = this.segments.concat(this.currentSection.segments);
		for(var i=0; i<10; ++i){
			this.activeSegments.push(this.segments.shift().create(this.layers.track, this.collisionGroups));
		}


		var fg = game.add.image(0, 0, 'foreground_dark');
		fg.fixedToCamera = true;
		fg.blendMode = Phaser.blendModes.MULTIPLY;
		fg.alpha = 0;
		this.darkerOverlays.push(fg);


		this.layers.middleground.create(40500, game.world.bounds.height - 512, "house01");
		this.layers.middleground.create(41000, game.world.bounds.height - 512, "house01");
		this.layers.middleground.create(41512, game.world.bounds.height - 512, "house01");
		this.layers.middleground.create(42256, game.world.bounds.height - 512, "house01");
		game.add.image(43200, game.world.bounds.height - 505, 'tree04');


		//pseudo checkpoint
		new Checkpoint('checkpoint', 540, 360, '6km').create(this.layers.checkpoints);
		for(var i=0; i<this.checkpoints.length; i++){
			this.checkpoints[i].create(this.layers.checkpoints);
		}

		 
	},

	update: function() {
		
		this.sledge.update();
		this.currentSection.update();
		this.darkerOverlays[0].alpha = game.camera.x / game.world.bounds.width;
		this.darkerOverlays[1].alpha = 0.6 * game.camera.x / game.world.bounds.width;

		if(this.activeSegments.length > 0 && !this.activeSegments[0].isVisible()){
			this.activeSegments.shift().destroy();
			if(this.activeSegments.length < 3 && this.segments.length > 0){
				this.activeSegments.push(this.segments.shift().create(this.layers.track, this.collisionGroups));
			}
		}

		if(this.currentSection.loadNext != undefined){
			if(this.sledge.sprite.body.x > this.currentSection.loadNext ){
				var nextSection = this.sectionController.getNextSection(this.layers, this.activeSegments);
				this.layers.background1.removeAll();
				this.layers.background2.removeAll();
				this.layers.tiledBackground.removeAll();

				nextSection.middleground.lastGenerated = this.currentSection.middleground.lastGenerated;
				nextSection.create();
				nextSection.tiledBackground.part1.x = this.currentSection.tiledBackground.part1.x;
				nextSection.tiledBackground.part2.x = this.currentSection.tiledBackground.part2.x;
				this.segments = this.segments.concat(nextSection.segments);
				this.currentSection = nextSection;
			}
		}	

		if(this.sledge.sprite.body.x > 42000){
			if(this.finalOverlays.greeting === undefined){
				this.finalOverlays.greeting = game.add.image(640 - 256, 32, 'frohes_fest');
				this.finalOverlays.greeting.fixedToCamera = true;
				this.finalOverlays.greeting.alpha = 0;
			}else{
				this.finalOverlays.greeting.alpha += 0.005;
			}
		}	
		if(this.sledge.sprite.body.x > 43000){
			if(this.finalOverlays.thanks === undefined){
				this.finalOverlays.thanks = game.add.image(640 - 206, 640, 'danke');
				this.finalOverlays.thanks.fixedToCamera = true;
				this.finalOverlays.thanks.alpha = 0;
			}else{
				this.finalOverlays.thanks.alpha += 0.005;
			}
		}

		for(var i=0; i<this.checkpoints.length; i++){
			this.checkpoints[i].check(this.sledge.sprite.body.x);
		}

		this.updateMusic();
		
	},

	updateMusic: function(){
		if(this.sledge.sprite.body.x > 20000 && this.sledge.sprite.body.x < 40000){
			musicManager.setNext('part2');
		}
		if(this.sledge.sprite.body.x >= 40000 && !(musicManager.playedLast)){
			musicManager.playedLast = true;
			musicManager.instant('outro');
		}


		musicManager.update();
	}
}

var gameOverState = {
	preload: function(){
		console.log("Autsch!");
		console.log(this.dataURI);
	 	var data = new Image();
        data.src = this.dataURI;
        game.cache.addImage('bg', this.dataURI, data);
	},
	create: function(){
		if(!game.device.desktop){
			game.input.onDown.add(function(){
				if(game.scale.isLandscape){
					game.scale.startFullScreen(false);
					game.paused = false;
				}
			});
		}

		//game.stage.backgroundColor = '#000000';
		game.add.image(0, 0, 'bg').alpha = 0.8;
		this.container = game.add.group();
		this.bg = new Phaser.Image(game, 0, 0, 'game_over');
		this.container.x = game.width/2 - 256;
		this.container.y = game.height + 100;
		this.container.add(this.bg);

		var text = new Phaser.Text(game, 256, 64, "Autsch!");
	    //text.anchor.setTo(0.5);
	    text.font = 'Pacifico';
	    text.fontSize = 60;
	    text.fill = '#ffffff';
	    this.container.add(text);

	    var buttonTryAgain = new Phaser.Button(game, 280, 300, 'button', function(){
	    	game.state.start('game');
	    }, this, 1, 0, 2);
	    this.container.add(buttonTryAgain);

	    var buttonText = new Phaser.Text(game, buttonTryAgain.x + buttonTryAgain.width / 2, buttonTryAgain.y + buttonTryAgain.height - 24, "nochmal ");
	    buttonText.anchor.setTo(0.5);
	    buttonText.font = 'Pacifico';
	    buttonText.fontSize = 30;
	    buttonText.fill = '#ffffff';
	    this.container.add(buttonText);
	},
	update: function(){
		if(Math.abs(this.container.y - (game.world.height / 2 - 128 - 64)) > 10){
			this.container.y += (game.world.height / 2 - 128 - 64 - this.container.y) / 10;
		}else{
			if(game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)){
				game.state.start('game');
			}
		}
		musicManager.update();
	}
};


game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('splash', splashState);
game.state.add('game', gameState);
game.state.add('gameOver', gameOverState);
game.state.start('boot');





//})();