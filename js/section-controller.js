function SectionController(worldData, game, sections){
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
				sec.background1.images,
				sec.background1.minDistance,
				sec.background1.maxDistance,
				parseY(sec.background1.y),
				sec.background1.scrollSpeed
			),
		new BackgroundLayer(
				layers.background2,
				sec.background2.images,
				sec.background2.minDistance,
				sec.background2.maxDistance,
				parseY(sec.background2.y),
				sec.background2.scrollSpeed
			),
		new TiledLayer(
				layers.tiledBackground,
				sec.tiledLayer.image,
				parseY(sec.TiledLayer.y),
				sec.TiledLayer.scrollSpeed
			),
		new MiddlegroundLayer(
				layers.middleground,
				sec.middleground.image,
				sec.middleground.minDistance,
				sec.middleground.maxDistance, 
				activeSegments, 
				sec.middleground.scrollSpeed
			),
		new ForegroundLayer(
				layers.background2,
				sec.background2.images,
				sec.background2.minDistance,
				sec.background2.maxDistance,
				parseY(sec.background2.y),
				sec.background2.scrollSpeed,
				sec.foregroundLayer.yVariation
			)
	);
};