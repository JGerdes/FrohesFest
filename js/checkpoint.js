function Checkpoint(image, x, y, dist){
	this.x = x;
	this.y = y;
	this.image = image;
	this.dist = dist;
	this.reached = false;
	this.sprite = null;
}

Checkpoint.prototype.create = function(group) {
	this.sprite = group.create(this.x, this.y, this.image);
}

Checkpoint.prototype.check = function(x){
	if(!this.reached){
		if(x >= this.x){
			this.reached = true;
		}
	}
}
