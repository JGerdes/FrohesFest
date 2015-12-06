function TiledLayer(group, image, y, scrollSpeed){
	this.group = group;
	this.game = group.game;
	this.image = image;
	this.y = y;
	this.scrollSpeed = scrollSpeed;
	this.width = this.game.camera.view.width;
	this.part1 = this.game.add.tileSprite(0, this.y, this.width, this.game.cache.getImage(image).height, image);
	this.part2 = this.game.add.tileSprite(this.width, this.y, this.width, this.game.cache.getImage(image).height, image);
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
	if (this.game.camera.x - part.x > 1280){
		part.offset += 1280 * 2;
	}
}

TiledLayer.prototype.destroy = function(){
	this.group.removeAll();
	this.part1.destroy();
	this.part2.destroy();

}