var myGamePiece;

function startGame() {
    myGamePiece = new player(35, 35, "red", 225, 225);
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1200;
        this.canvas.height = 580;
        this.context = this.canvas.getContext("2d");
		document.getElementById("app-contain").append(this.canvas);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            e.preventDefault();
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function player(width, height, color, x, y, type) {

    this.type = type;
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.angle = 0;
    this.moveAngle = 0;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();    
		if (15 >= this.x) {
			this.x = 16;
		}
		if (15 >= this.y) {
			this.y = 16;
		}
		if (this.x >= 1181) {
			this.x = 1180
		}
		if (this.y >= 560) {
			this.y = 560
		}
    }
    this.newPos = function() {
        this.angle += this.moveAngle * Math.PI / 180;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.moveAngle = 0;
    myGamePiece.speed = 0;
    if (myGameArea.keys && myGameArea.keys[37]) {
		myGamePiece.moveAngle = -2;
	}
    if (myGameArea.keys && myGameArea.keys[39]) {
		myGamePiece.moveAngle = 2;
	}
    if (myGameArea.keys && myGameArea.keys[38]) {
		myGamePiece.speed = 3;
	}
    if (myGameArea.keys && myGameArea.keys[40]) {
		myGamePiece.speed = -3;
	}
	if (myGameArea.keys && myGameArea.keys[65]) {
		myGamePiece.moveAngle = -2;
	}
    if (myGameArea.keys && myGameArea.keys[68]) {
		myGamePiece.moveAngle = 2;
	}
    if (myGameArea.keys && myGameArea.keys[87]) {
		myGamePiece.speed = 3;
	}
    if (myGameArea.keys && myGameArea.keys[83]) {
		myGamePiece.speed = -3;
	}
    myGamePiece.newPos();
    myGamePiece.update();
}