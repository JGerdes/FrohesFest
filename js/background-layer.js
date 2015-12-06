function BackgroundLayer(group, images, minMargin, maxMargin, y, scrollSpeed){
	this.images = images;
	this.minMargin = minMargin;
	this.randMargin = maxMargin - minMargin;
	this.y = y;
	this.group = group;
	this.game = group.game;
	this.camera = this.game.camera;
	this.scrollSpeed = scrollSpeed;
	this.sprites = [];
	this.lastGenerated = -512;

	this.lastGenerated += 256 + Math.random()*192;
			var temp = this.group.create(this.lastGenerated, this.y, 'mountain01');
			temp.position.y -= temp.height; 
	
		this.lastGenerated = this.lastGenerated;
	
}
	

BackgroundLayer.prototype.update = function(){
	this.group.x = this.game.camera.x * this.scrollSpeed;

	if(this.camera.view.x * 0.05+ this.camera.view.width - this.minMargin > this.lastGenerated){
		var image = this.images[Math.floor(Math.random()*this.images.length)];
			this.lastGenerated += this.minMargin + Math.random()*this.randMargin;
			var temp = this.group.create(this.lastGenerated, this.y, image);
			temp.position.y -= temp.height; 
	
	}
}

BackgroundLayer.prototype.destroy = function(){
	this.group.removeAll();
	for(var i = 0; i < this.sprites.length; ++i){
		this.sprites[i].destroy();
	}
}

