function MusicManager(parts){ 
	this.nextPart = null;
	this.nextQueue = [];
	this.currentPart = null;
	this.current = null;
	this.parts = {};
	for(var i=0; i<parts.length; i++){
		this.parts[parts[i]] = game.add.audio(parts[i]);
	}
}

MusicManager.prototype.setNext = function(part){
	this.nextQueue.push(part);
	if(this.current === null){
		this.nextPart = this.nextQueue.shift();
		this.onCurrentStop();
	}
}

MusicManager.prototype.instant = function(part){
	this.nextQueue = [];
	this.nextPart = null;
	var pos = this.current.currentTime;
	this.current.stop();
	this.current = this.parts[part];
	this.current.loopFull();	
	this.current.currentTime = pos % 5640;
	this.currentPart = part;
}

MusicManager.prototype.onCurrentStop = function(){
	if(this.nextPart != null){
		var pos = 0;
		if(this.currentPart != null){
			pos = this.current.currentTime;
			this.current.stop();
		}
		this.current = this.parts[this.nextPart]
		this.current.loopFull();	
		this.current.currentTime = pos % 5640;
		this.currentPart = this.nextPart;
	}
}

MusicManager.prototype.update = function(){
	if(this.nextPart != this.currentPart && this.current != null && this.nextPart != null){
		if(this.current.durationMS - this.current.currentTime < 80 || this.current.currentTime >= this.current.durationMS){
			this.onCurrentStop();
		}
	}else{
		if(this.nextQueue.length > 0){
			this.nextPart = this.nextQueue.shift();
		}
	}
}



