function Section(segments, loadNext, background1, background2, tiledBackground, middleground, foreground){
	this.loadNext = loadNext;
	this.background1 = background1;
	this.background2 = background2;
	this.tiledBackground = tiledBackground;
	this.middleground = middleground;
	this.foreground = foreground;

	this.segments = segments;

	this.layer = [
		background1,
		background2,
		tiledBackground,
		middleground,
		foreground
	];
	this.layerCount = this.layer.length;
};

Section.prototype.create = function(){
	for(var i = 0; i < this.layerCount; ++i){
		this.layer[i].create();
	}
};

Section.prototype.update = function(){
	for(var i = 0; i < this.layerCount; ++i){
		this.layer[i].update();
	}
};