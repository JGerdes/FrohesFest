var sections = [
	{
		"loadNext": 30500,
		"segments": [
			{
				"x": [0, 200, 600, 900],
				"y": [440, 210, 250, 90]
			},
			{
				"x": [900, 1200, 1400],
				"y": [90, 10, 100]
			},
			{
				"x": [1400, 2000, 2500, 3000],
				"y": [100, 500, 250, 100]
			},
			{
				"x": [3000, 3500, 4000, 4500, 5000, 5500],
				"y": [100, 200, 25, 200, 25, 200]
			},
			{
				"x": [5500, 6000, 7500, 8000],
				"y": [200, 300, 50, 300]
			},
			{
				"x": [8000, 9500, 10500, 12500],
				"y": [300, 500, 600, 10]
			},
			{
				"x": [12500, 15000],
				"y": [10, 100]
			},
			{
				"x": [15000, 15500, 16000, 16500, 17000, 17500, 18000, 18500],
				"y": [100, 200, 100, 200, 100, 200, 100, 200]
			},
			{
				"x": [18500, 19000, 19300, 19600, 19900, 21000, 21300, 21600, 21900, 25000],
				"y": [  100,   200,   100,   200,   100,   200,   100,   200,   100,   300]
			},
			{
				"x": [25000, 26000, 26500, 27000, 27500, 28000, 28500, 29000, 30000],
				"y": [300, 200, 400, 200 , 400, 200, 400, 200, 550]
			},
			{
				"x": [30000, 30500, 31000, 31500, 32000, 32500, 33000, 33500, 34000, 34500, 35000],
				"y": [550, 500, 550, 400, 450, 300, 350, 200, 250, 100, 80]
			},
			{
				"x": [35000, 35500, 35800],
				"y": [80, 20, 30]
			}
		],
		"layer": {
			"background1": {
				"images": ["mountain02", "mountain03"],
				"minDistance": 256,
				"maxDistance": 512,
				"y": 640,
				"scrollSpeed": 0.95
			},
			"background2": {
				"images": ["mountain01"],
				"minDistance": 256,
				"maxDistance": 512,
				"y": 640,
				"scrollSpeed": 0.9
			},
			"tiledLayer": {
				"image": "forest",
				"y": "bottom",
				"scrollSpeed": 0.85
			},
			"middleground": {
				"images": ["tree02"],
				"minDistance": 256,
				"maxDistance": 1024,
				"scrollSpeed": 0,
				"yExtra": 192
			},
			"foreground": {
				"images": ["tree01"],
				"minDistance": 512,
				"maxDistance": 2048,
				"y": "bottom",
				"scrollSpeed": -0.9,
				"yVariation": 128
			}
		}
	},
	{
		"segments": [
			{
				"x": [35800, 36000, 36500, 37000, 37500, 38000, 38500, 39500],
				"y": [   30,    50,   100,   200,   150,   200,   100,   150]
			},
			{
				"x": [39500, 41000, 42000, 44000],
				"y": [150, 50, 20, 20]
			}
		],
		"layer": {
			"background1": {
				"images": ["mountain02", "mountain03"],
				"minDistance": 256,
				"maxDistance": 512,
				"y": 640,
				"scrollSpeed": 0.95
			},
			"background2": {
				"images": ["mountain01"],
				"minDistance": 256,
				"maxDistance": 512,
				"y": 640,
				"scrollSpeed": 0.9
			},
			"tiledLayer": {
				"image": "village",
				"y": "bottom",
				"scrollSpeed": 0.85
			},
			"middleground": {
				"images": ["tree03"],
				"minDistance": 256,
				"maxDistance": 256,
				"scrollSpeed": 0,
				"yExtra": 64
			},
			"foreground": {
				"images": ["tree01"],
				"minDistance": 512,
				"maxDistance": 2048,
				"y": "bottom",
				"scrollSpeed": -0.9,
				"yVariation": 128
			}
		}
	}
];