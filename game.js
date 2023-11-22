let canvas = document.getElementsByTagName("canvas")[0];
let ctx = canvas.getContext("2d");
let input = document.getElementById("angle");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.95;

function resize(event = true) {
	canvas.width = window.innerWidth;
	canvas.height =
		(window.innerHeight * (window.innerHeight - 20)) / window.innerHeight;
	if (event) {
		console.log("event");
	}
}

resize(false);
window.addEventListener("resize", resize);

let bows = [];
let bowsQuality = [
	{
		name: "",
		thread: 5,
	},
];

for (let i = 0; i < 1; i++) {
	bows[i] = {
		img: new Image(),
	};
	bows[i].img.src = `./imgs/bows/${i}.png`;
	bows[i].name = bowsQuality[i].name;
	bows[i].img.addEventListener("load", () => {
		bows[i].width = bows[i].img.naturalWidth;
		bows[i].height = bows[i].img.naturalHeight;
		bows[i].aspectRatio = bows[i].width / bows[i].height;
	});
}

class Player {
	constructor() {
		this.x = canvas.width * 0.1;
		this.y = canvas.height * 0.8;
		this.mode = "archer";
		this.armour = null;
		this.helmet = null;
		this.health = 100;
		this.angle = ((180 - input.value) * Math.PI) / 180;
		this.ratio = [-20, 15, 40, 70, 82, 6, 4, 29.5, 53];
	}

	draw() {
		this.angle = ((180 - input.value) * Math.PI) / 180;
		ctx.translate(this.x, this.y);
		ctx.rotate(0);
		ctx.fillStyle = "#000000";
		ctx.beginPath();
		// face
		ctx.arc(0, -20, 15, 0, 2 * Math.PI);
		// body
		ctx.roundRect(-20, 0, 40, 70, 3);
		ctx.fill();

		ctx.beginPath();
		ctx.fillStyle = "#fe3b36"; //red
		ctx.roundRect(-1.5, 0, 3, -20, 100);
		ctx.fill();

		ctx.beginPath();
		ctx.fillStyle = "#008ced"; //blue
		ctx.roundRect(0, -20 - 1.5, 15, 3, 100);
		ctx.fill();

		ctx.beginPath();
		// ctx.fillStyle = "#7abb4a"; //green
		ctx.fillStyle = "#ffd242"; //yellow
		ctx.roundRect(25, 0, 3, 70, 100);
		ctx.fill();

		ctx.beginPath();
		ctx.fillStyle = "#9724a3"; //purple
		ctx.roundRect(-20, 75, 40, 3, 100);
		ctx.fill();

		ctx.fillStyle = "#fe3b36"; //red
		ctx.fillText("[0]", -20, 90);
		ctx.fillStyle = "#008ced"; //blue
		ctx.fillText("[1]", -5, 90);
		ctx.fillStyle = "#9724a3"; //purple
		ctx.fillText("[2]", 10, 90);
		ctx.fillStyle = "#ffd242"; //yellow
		ctx.fillText("[3]", 25, 90);

		ctx.rotate(0);
		ctx.translate(-this.x, -this.y);
	}

	archer() {
		ctx.translate(this.x, this.y);
		ctx.rotate(0);
		// hands
		ctx.beginPath();
		ctx.fillStyle = "#CDDC39";
		// bow hand
		ctx.fillRect(0, 1, 82, 6);
		ctx.translate(86, 4);
		ctx.rotate((Math.PI * 5) / 4);
		ctx.arc(0, 0, 4, 0, (Math.PI * 3) / 2);
		ctx.rotate((-Math.PI * 5) / 4);
		ctx.fill();
		ctx.translate(-86, -4);

		ctx.drawImage(bows[0].img, 62, -50 + 5, 98 * bows[0].aspectRatio, 98);
		// arrow hand
		ctx.translate(-17.5, 3); // its starting is (-19,0)
		ctx.rotate(this.angle);
		ctx.fillStyle = "#000";
		ctx.fillRect(-3 / 2, -3, 29.5, 6);
		ctx.rotate(-this.angle);
		ctx.translate(17.5, -3);

		ctx.translate(
			-19 + 29.5 * Math.cos(this.angle),
			3 + 29.5 * Math.sin(this.angle)
		); // its starting is (-19,0)
		ctx.rotate(Math.asin((-29.5 * Math.sin(this.angle)) / 53));
		ctx.beginPath();
		ctx.arc(2, 0, 3, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillRect(0, -3, 53, 6);

		ctx.translate(57, 0);
		ctx.rotate((Math.PI * 5) / 4);
		ctx.beginPath();
		ctx.fillStyle = "#f0f";
		ctx.arc(0, 0, 4, 0, (Math.PI * 3) / 2);
		ctx.fill();
		ctx.rotate((-Math.PI * 5) / 4);
		ctx.translate(-57, 0);

		ctx.rotate(-Math.asin((-29.5 * Math.sin(this.angle)) / 53));
		ctx.translate(
			19 - 29.5 * Math.cos(this.angle),
			-3 - 29.5 * Math.sin(this.angle)
		);
		// ctx.fillStyle = "#f00";
		// ctx.fillRect(-this.x, -50, canvas.width, 1);
		ctx.rotate(0);
		ctx.translate(-this.x, -this.y);
	}
}

let i = 0;
let a = (Math.PI / 100) * i;

let plyr = new Player();

function drawFrames() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.setTransform(3, 0, 0, 3, -100, -1500);
	plyr.draw();
	// plyr.archer();
	requestAnimationFrame(drawFrames);
}

drawFrames();

setInterval(() => {
	i++;
	a = (Math.PI / 100) * i;
}, 25);

// ctx.beginPath();
// ctx.fillRect(150, 200, 70, 5);
// ctx.translate(150, 200 + 5 / 2);
// ctx.rotate(-a);
// ctx.fillRect(0, -5 / 2, 70, 5);
// ctx.arc(0, 0, 5 / 2, 0, Math.PI * 2);
// ctx.fill();
// ctx.rotate(a);
// ctx.translate(-150, -200 - 5 / 2);
// ctx.closePath();
