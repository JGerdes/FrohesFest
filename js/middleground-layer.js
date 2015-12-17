function MiddlegroundLayer(group, images, minMargin, maxMargin, activeSegments, scrollSpeed, yExtra){
	this.images = images;
	this.minMargin = minMargin;
	this.randMargin = maxMargin - minMargin;
	this.activeSegments = activeSegments;
	this.group = group;
	this.game = group.game;
	this.camera = this.game.camera;
	this.scrollSpeed = scrollSpeed;
	this.scrollSpeedInv = 1 - scrollSpeed;
	this.sprites = [];
	this.lastGenerated = -512;
	this.yExtra = yExtra | 0;
	
}

MiddlegroundLayer.prototype.create = function(){
	while(this.camera.view.x * this.scrollSpeedInv + this.camera.view.width - this.minMargin > this.lastGenerated){
		this.generateSprite();
	}
}
	

MiddlegroundLayer.prototype.update = function(){
	this.group.x = this.game.camera.x * this.scrollSpeed;

	if(this.camera.view.x * this.scrollSpeedInv + this.camera.view.width - this.minMargin > this.lastGenerated){
		this.generateSprite();
	}
	if(this.sprites.length > 0){
		if(this.sprites[0].x + this.sprites[0].width < this.camera.view.x * this.scrollSpeedInv){
			this.group.remove(this.sprites.shift(), true);
		}
	}
}

MiddlegroundLayer.prototype.generateSprite = function(){
	var image = this.images[Math.floor(Math.random()*this.images.length)];
	this.lastGenerated += this.minMargin + Math.random()*this.randMargin;

	var y = this.game.world.height;
	for(var i=0; i<this.activeSegments.length; ++i){
		if(this.activeSegments[i].containsX(this.lastGenerated)){
			y = this.activeSegments[i].getYFor(this.lastGenerated) + this.yExtra;
			break;
		}
	}

	var temp = this.group.create(this.lastGenerated, y, image);
	temp.position.y -= temp.height; 
	this.sprites.push(temp);
}

MiddlegroundLayer.prototype.destroy = function(){
	this.group.removeAll();
	for(var i = 0; i < this.sprites.length; ++i){
		this.sprites[i].destroy();
	}
}

