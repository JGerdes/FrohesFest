function SectionController(worldData, game){
	this.game = game;
}

SectionController.prototype.getNextSection = function(layers){
	return new Section(
		[
			new Segment(this.game, {
				'x': [ 0, 200, 600, 900],
				'y': [ 440, 210, 250, 90]
			}),
			new Segment(this.game, {
				'x': [ 900, 1200, 1400],
				'y': [ 90, 10, 100]
			}),

			new Segment(this.game, {
				'x': [ 1400, 2000, 2500, 3000],
				'y': [ 100, 500, 250, 100]
			}),

			new Segment(this.game, {
				'x': [ 3000, 3500, 4000, 4500, 5000, 5500],
				'y': [ 100, 200, 100, 200, 100, 200]
			}),

			new Segment(this.game, {
				'x': [ 5500, 6000, 7500, 8000],
				'y': [ 200, 300, 50, 300]
			}),

			new Segment(this.game, {
				'x': [ 8000, 9500, 10500, 12500],
				'y': [ 300, 500, 600, 10]
			}),

			new Segment(this.game, {
				'x': [ 12500, 15000],
				'y': [ 10, 100]
			}),

			new Segment(this.game, {
				'x': [ 15000, 15500, 16000, 16500, 17000, 17500, 18000, 18500],
				'y': [ 100, 200, 100, 200, 100, 200, 100, 200]
			}),
		],
		new BackgroundLayer(layers.background1, ['mountain02', 'mountain03'], 256, 512, 640, 0.95),
		new BackgroundLayer(layers.background2, ['mountain01'], 256, 512, 640, 0.9),
		new TiledLayer(layers.tiledBackground, 'forest', game.world.height, 0.85),
		new MiddlegroundLayer(layers.middleground, ['tree02'], 256, 1024, activeSegments, 0),
		new ForegroundLayer(layers.foreground, ['tree01'], 512, 2048, game.world.height, -0.9, 128)
	);
};