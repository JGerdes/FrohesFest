function Sledge(game, collisionGroups) {
	this.game = game;
	this.input = game.input;
	this.sprite = null;
	this.collisionGroups= collisionGroups;
	this.acceleration = 0;
	this.maxAcceleration = 50;
	this.velocity = 0;
	this.maxVelo = 600;
	this.naturalVelo = 0;


}

Sledge.prototype.create = function(){
	this.sprite = game.add.sprite(100, -200, 'sledge');
	this.game.camera.follow(this.sprite);
	this.game.physics.p2.enable(this.sprite, false);
	this.sprite.body.clearShapes();
	this.sprite.body.addPolygon( {} ,
		[
	   		[0,0],
	   		[160/1.5, 0],  
	   		[185/1.5, 90/1.5],
	   		[175/1.5, 100/1.5],
	   		[142/1.5, 118/1.5],  
	   		[0, 118/1.5]
   		]  
	);

	this.sprite.body.setCollisionGroup(this.collisionGroups.player)
	this.sprite.body.collides([this.collisionGroups.segments]);

	this.head = game.add.sprite(this.sprite.x + 10, this.sprite.y - 20, 'santa_head');
	this.game.physics.p2.enable(this.head, false);
	this.head.body.clearShapes();
	this.head.body.addPolygon( {} ,
		[
	   		[0,0],
	   		[39, 0],  
	   		[39,27],  
	   		[0, 27]
   		]  
	);
	this.head.body.mass = 0.2;
	this.head.body.setCollisionGroup(this.collisionGroups.player)
	this.head.body.collides([this.collisionGroups.segments]);
	this.head.body.createGroupCallback(this.collisionGroups.segments, this.die, this);


	var constraint = this.game.physics.p2.createRevoluteConstraint(this.sprite, [ -30, -50 ], this.head, [ 0, 0 ]);
	constraint.setLimits(-0.2, 0.2);
	constraint.setStiffness(80);



	this.hat = game.add.sprite(this.head.x - 10, this.head.y - 5, 'santa_hat');
	this.game.physics.p2.enable(this.hat, false);
	this.hat.body.clearShapes();
	this.hat.body.addPolygon( {} ,
		[
	   		[0,0],
	   		[10, 0],  
	   		[10,13],  
	   		[0, 13]
   		]  
	);
	this.hat.body.mass = 0.05;
	this.hat.body.setCollisionGroup(this.collisionGroups.player)
	this.hat.body.collides([this.collisionGroups.segments]);
	this.hat.body.createGroupCallback(this.collisionGroups.segments, this.die, this);

	constraint = this.game.physics.p2.createRevoluteConstraint(this.head, [ -15, -5 ], this.hat, [ 5, 2 ]);
	constraint.setStiffness(50);
	constraint.setLimits(-0.2, 0.2);

	/*this.snowEmitter = this.game.add.emitter(this.sprite.x, this.sprite.y, 200);
	this.snowEmitter.makeParticles('particle_snow');
    this.snowEmitter.start(false, 2000, 20);*/
};

Sledge.prototype.die = function(){
	game.canvas.id = "game";
	stackBlurCanvasRGB(game.canvas.id, 0, 0, game.width, game.height, 12);
	game.state.states['gameOver'].dataURI = game.canvas.toDataURL();
	game.state.start('gameOver');
}

Sledge.prototype.update = function() {
	if((this.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)
		|| this.input.pointer1.isDown) && this.sprite.body.y > 0){
		if(this.acceleration < this.maxAcceleration){
			this.acceleration += 2;	
		}else{
			this.acceleration = this.maxAcceleration;
		}
		if(this.sprite.body.x < 42000){
			this.sprite.body.velocity.x -= this.velocity;
			this.sprite.body.velocity.x += (this.naturalVelo - this.sprite.body.velocity.x);
			this.velocity = Math.min(this.maxVelo,  this.velocity + this.acceleration);
			this.naturalVelo = this.sprite.body.velocity.x;
			this.sprite.body.velocity.x += this.velocity;
		}

	}else{
		if(this.acceleration > 0){
			this.acceleration -= 1;
		}else{
			this.acceleration = 0;
		}
	}

	if(this.sprite.body.x >= 42000){
		this.sprite.body.x += (43000 - this.sprite.body.x) / 100;
	}

	/*this.snowEmitter.x = this.sprite.x - 64;
	this.snowEmitter.y = this.sprite.y + 32;*/

	
};