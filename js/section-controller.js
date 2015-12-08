function SectionController(sections, game){
	this.game = game;
	this.sections = sections;
	this.currentSectionIndex = 0;
}

SectionController.prototype.getNextSection = function(layers){
	var sec = this.sections[this.currentSectionIndex];
	this.currentSectionIndex++;
	var segments = [];
	for(var i=0; i < sec.segments.length; i++){
		segments.push(new Segment(this.game, sec.segments[i]));
	}

	function parseY(value) {
		if(value === "bottom") {
			return this.game.world.height;
		}else{
			return value;
		}
	}

	return new Section(
		segments,
		new BackgroundLayer(
				layers.background1,
				sec.layer.background1.images,
				sec.layer.background1.minDistance,
				sec.layer.background1.maxDistance,
				parseY(sec.layer.background1.y),
				sec.layer.background1.scrollSpeed
			),
		new BackgroundLayer(
				layers.background2,
				sec.layer.background2.images,
				sec.layer.background2.minDistance,
				sec.layer.background2.maxDistance,
				parseY(sec.layer.background2.y),
				sec.layer.background2.scrollSpeed
			),
		new TiledLayer(
				layers.tiledBackground,
				sec.layer.tiledLayer.image,
				parseY(sec.layer.tiledLayer.y),
				sec.layer.tiledLayer.scrollSpeed
			),
		new MiddlegroundLayer(
				layers.middleground,
				sec.layer.middleground.images,
				sec.layer.middleground.minDistance,
				sec.layer.middleground.maxDistance, 
				activeSegments, 
				sec.layer.middleground.scrollSpeed
			),
		new ForegroundLayer(
				layers.foreground,
				sec.layer.foreground.images,
				sec.layer.foreground.minDistance,
				sec.layer.foreground.maxDistance,
				parseY(sec.layer.foreground.y),
				sec.layer.foreground.scrollSpeed,
				sec.layer.foreground.yVariation
			)
	);
};