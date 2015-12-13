var sections = [
	{
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
				"y": [100, 200, 100, 200, 100, 200]
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
				"scrollSpeed": 0
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
				"x": [18000, 18500, 20000, 25000],
				"y": [100, 200, 400]
			},
			{
				"x": [25000, 26000, 30000],
				"y": [400, 10, 600]
			},
			{
				"x": [30000, 30500, 31000, 31500, 32000, 32500, 33000, 33500, 34000, 34500, 35000],
				"y": [600, 500, 550, 400, 450, 300, 350, 200, 250, 100, 250]
			},
			{
				"x": [35000, 40000, 41000],
				"y": [250, 20, 15]
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
				"images": ["tree02"],
				"minDistance": 256,
				"maxDistance": 1024,
				"scrollSpeed": 0
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