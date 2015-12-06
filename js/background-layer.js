function BackgroundLayer(group, images, minMargin, maxMargin, y, scrollSpeed){
	this.images = images;
	this.minMargin = minMargin;
	this.randMargin = maxMargin - minMargin;
	this.y = y;
	this.group = group;
	this.game = group.game;
	this.camera = this.game.camera;
	this.scrollSpeed = scrollSpeed;
	this.scrollSpeedInv = 1 - scrollSpeed;
	this.sprites = [];
	this.lastGenerated = -512;
	
}

BackgroundLayer.prototype.create = function(){
	while(this.camera.view.x * this.scrollSpeedInv + this.camera.view.width - this.minMargin > this.lastGenerated){
		this.generateSprite();
	}
}
	

BackgroundLayer.prototype.update = function(){
	this.group.x = this.game.camera.x * this.scrollSpeed;

	if(this.camera.view.x * this.scrollSpeedInv + this.camera.view.width - this.minMargin > this.lastGenerated){
		this.generateSprite();
	}
	if(this.sprites[0].x + this.sprites[0].width < this.camera.view.x * this.scrollSpeedInv){
		this.group.remove(this.sprites.shift(), true);
	}
}

BackgroundLayer.prototype.generateSprite = function(){
	var image = this.images[Math.floor(Math.random()*this.images.length)];
	this.lastGenerated += this.minMargin + Math.random()*this.randMargin;
	var temp = this.group.create(this.lastGenerated, this.y, image);
	temp.position.y -= temp.height; 
	this.sprites.push(temp);
}

BackgroundLayer.prototype.destroy = function(){
	this.group.removeAll();
	for(var i = 0; i < this.sprites.length; ++i){
		this.sprites[i].destroy();
	}
}

