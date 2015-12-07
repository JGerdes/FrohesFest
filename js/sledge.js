function Sledge(game) {
	this.game = game;
	this.input = game.input;
	this.sprite = null;
	this.acceleration = 0;
	this.maxAcceleration = 50;
	this.velocity = 0;
	this.maxVelo = 500;
	this.naturalVelo = 0;
}

Sledge.prototype.create = function(){
	this.sprite = game.add.sprite(10, 100, 'sledge');
	this.game.camera.follow(this.sprite);
	this.game.physics.p2.enable(this.sprite, false);
	this.sprite.body.clearShapes();
	this.sprite.body.addPolygon( {} ,
		[
	   		[0,0],
	   		[185/1.5, 0],  
	   		[185/1.5, 90/1.5],
	   		[175/1.5, 100/1.5],
	   		[142/1.5, 118/1.5],  
	   		[0, 118/1.5]
   		]  
	);

};

Sledge.prototype.update = function() {
	if(this.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)
		|| this.input.pointer1.isDown){
		if(this.acceleration < this.maxAcceleration){
			this.acceleration += 2;	
		}else{
			this.acceleration = this.maxAcceleration;
		}
		this.sprite.body.velocity.x -= this.velocity;
		this.sprite.body.velocity.x += (this.naturalVelo - this.sprite.body.velocity.x);
		this.velocity = Math.min(this.maxVelo,  this.velocity + this.acceleration);
		this.naturalVelo = this.sprite.body.velocity.x;
		this.sprite.body.velocity.x += this.velocity;

	}else{
		if(this.acceleration > 0){
			this.acceleration -= 1;
		}else{
			this.acceleration = 0;
		}
	}

	

	
};