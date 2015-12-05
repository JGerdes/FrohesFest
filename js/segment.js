function Segment(game, points){
	this.game = game;
	this.points = points;
	this.pointsCount = points.x.length;
	this.lastPoint = {
		x: points.x[this.pointsCount - 1],
		y: points.y[this.pointsCount - 1]
	};
	this.startX = points.x[0];
	this.bitmapData = null;
	this.sprite = null;
	this.image = null;
	this.size = {
		x: this.lastPoint.x - this.startX,
		y: game.world.height
	};
}

Segment.STEPS_RENDER = 20;
Segment.STEPS_PHYSICS = 4;

Segment.prototype.create = function(){
	console.log(this);
	this.bitmapData = this.game.add.bitmapData(this.size.x, this.size.y);
	this.image = this.bitmapData.addToWorld();

	this.bitmapData.ctx.fillStyle = '#f4f4f4'; //'rgba(0, 128, 128, 0.5)';
	this.bitmapData.ctx.beginPath();
	this.bitmapData.ctx.moveTo(0, this.game.world.height);

	var steps = Segment.STEPS_RENDER * this.pointsCount;
	for(var i = 0; i <= steps; ++i){
		var index = i / steps;
		this.bitmapData.ctx.lineTo(
			this.game.math.catmullRomInterpolation(this.points.x, index) - this.startX,
			this.size.y - game.math.catmullRomInterpolation(this.points.y, index)
		);
	}

	this.bitmapData.ctx.lineTo(this.lastPoint.x - this.startX, this.game.world.height);
	this.bitmapData.ctx.closePath();
	this.bitmapData.ctx.fill();

	this.image.position.x = this.startX;

	this.sprite = game.add.sprite(0, 0, null);
	this.game.physics.p2.enable(this.sprite, false);
	this.sprite.body.clearShapes();

	var physicsShape = [];
	physicsShape.push([this.startX, this.game.world.height]);

	var steps = Segment.STEPS_PHYSICS * this.pointsCount;
	for(var i = 0; i <= steps; ++i){
		var index = i / steps;
		physicsShape.push([
			this.game.math.catmullRomInterpolation(this.points.x, index),
			this.game.world.height - this.game.math.catmullRomInterpolation(this.points.y, index)
		]);
	}
	physicsShape.push([this.lastPoint.x, this.game.world.height]);
	this.sprite.body.addPolygon({}, physicsShape);
	this.sprite.body.static = true;

	return this;
};

Segment.prototype.destroy = function(){
	this.bitmapData.destroy();
	this.game = null;
	this.bitmapData = null;
};

Segment.prototype.isVisible = function(){
	return this.game.camera.view.x < this.lastPoint.x;
}