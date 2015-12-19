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
	this.text = new Phaser.Text(group.game, this.x + 58	, this.y + 30, this.dist);
	this.text.anchor.setTo(0.5, 0.5);
	this.text.rotation = 0.15;
	this.text.fill = '#ddd';
	group.add(this.text);
}

Checkpoint.prototype.check = function(x){
	if(!this.reached){
		if(x >= this.x){
			this.reached = true;
		}
	}
}
