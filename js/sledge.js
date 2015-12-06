function Sledge(game) {
	this.game = game;
	this.input = game.input;
	this.sprite = null;
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

}

Sledge.prototype.update = function() {
	if(this.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)
		|| this.input.pointer1.isDown){
		this.sprite.body.moveRight(500);
	}
};