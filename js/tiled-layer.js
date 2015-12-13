function TiledLayer(group, image, y, scrollSpeed){
	this.group = group;
	this.game = group.game;
	this.image = image;
	this.y = y;
	this.scrollSpeed = scrollSpeed;
	this.imageWidth = this.game.cache.getImage(this.image).width;
	this.width = this.imageWidth; //this.game.camera.view.width; //this.image.width;
	while(this.width < this.game.camera.view.width){
		this.width += this.imageWidth;
	}
	this.part1 = null;
	this.part2 = null;
}

TiledLayer.prototype.create = function(){
	this.part1 = new Phaser.TileSprite(this.game, 0, this.y, this.width, this.game.cache.getImage(this.image).height, this.image);
	this.part2 = new Phaser.TileSprite(this.game, this.width, this.y, this.width, this.game.cache.getImage(this.image).height, this.image);
	this.group.add(this.part1);
	this.group.add(this.part2);
	this.part1.offset = 0;
	this.part2.offset = this.width;
	this.part1.anchor.setTo(0, 1);
	this.part2.anchor.setTo(0, 1);
}


TiledLayer.prototype.update = function(){
	
	this.updatePart(this.part1);
	this.updatePart(this.part2);

	this.part1.x = this.game.camera.x * this.scrollSpeed + this.part1.offset;
	this.part2.x = this.game.camera.x * this.scrollSpeed + this.part2.offset;

}

TiledLayer.prototype.updatePart = function(part) {
	if (this.game.camera.x - part.x > this.width){
		part.offset += this.width * 2 -1;
	}
}

TiledLayer.prototype.destroy = function(){
	this.group.removeAll();
	this.part1.destroy();
	this.part2.destroy();

}