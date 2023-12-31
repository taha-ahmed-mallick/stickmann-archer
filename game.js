let canvas = document.getElementsByTagName("canvas")[0];
let ctx = canvas.getContext("2d");
let input = document.getElementById("angle");
let multiplier = document.getElementById("multiplier");

multiplier.onmousemove = () => plyr.multiply(multiplier.value);

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
		this.ratio = [-20, 15, 40, 70, 82, 6, 4, 3, 29.5, 53];
		this.multiplier = 1;
	}

	multiply(newMultiplier) {
		for (let i = 0; i < this.ratio.length; i++)
			this.ratio[i] /= this.multiplier;
		this.multiplier = newMultiplier;
		for (let i = 0; i < this.ratio.length; i++)
			this.ratio[i] *= this.multiplier;
	}

	drawBody() {
		this.angle = ((180 - input.value) * Math.PI) / 180;
		ctx.translate(this.x, this.y);
		ctx.rotate(0);
		ctx.fillStyle = "#000000";
		ctx.beginPath();
		// face
		ctx.arc(0, this.ratio[0], this.ratio[1], 0, 2 * Math.PI);
		// body
		ctx.roundRect(-this.ratio[2] / 2, 0, this.ratio[2], this.ratio[3], 3);
		ctx.fill();

		ctx.fillStyle = "#ffd242"; //yellow
		ctx.fillStyle = "#fe3b36"; //red
		ctx.fillStyle = "#008ced"; //blue
		ctx.fillStyle = "#9724a3"; //purple

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
		ctx.fillRect(0, 1, this.ratio[4], this.ratio[5]);
		ctx.translate(this.ratio[6] + this.ratio[4], this.ratio[7] + 1);
		ctx.rotate((Math.PI * 5) / 4);
		ctx.arc(0, 0, this.ratio[6], 0, (Math.PI * 3) / 2);
		ctx.rotate((-Math.PI * 5) / 4);
		ctx.fill();
		ctx.translate(-this.ratio[6] - this.ratio[4], -this.ratio[7] - 1);

		// ctx.drawImage(bows[0].img, 62, -50 + 5, 98 * bows[0].aspectRatio, 98);
		// arrow hand
		ctx.translate(-(this.ratio[2] - this.ratio[5]) / 2, this.ratio[5] / 2); // its starting is (-19,0)
		ctx.rotate(this.angle);
		ctx.fillStyle = "#000";
		ctx.fillRect(0, -this.ratio[5] / 2, this.ratio[8], this.ratio[5]);
		ctx.rotate(-this.angle);
		ctx.translate((this.ratio[2] - this.ratio[5]) / 2, -this.ratio[5] / 2);

		ctx.translate(
			-(this.ratio[2] - this.ratio[5]) / 2 +
				this.ratio[8] * Math.cos(this.angle),
			this.ratio[5] / 2 + this.ratio[8] * Math.sin(this.angle)
		); // its starting is (-19,0)
		ctx.rotate(
			Math.asin((-this.ratio[8] * Math.sin(this.angle)) / this.ratio[9])
		);
		ctx.fillRect(0, -this.ratio[5] / 2, this.ratio[9], this.ratio[5]);
		ctx.beginPath();
		ctx.arc(0, 0, this.ratio[5] / 2, 0, Math.PI * 2);
		ctx.fill();

		ctx.translate(this.ratio[9] + this.ratio[6], 0);
		ctx.rotate((Math.PI * 5) / 4);
		ctx.beginPath();
		ctx.arc(0, 0, this.ratio[6], 0, (Math.PI * 3) / 2);
		ctx.fill();
		ctx.rotate((-Math.PI * 5) / 4);
		ctx.translate(-this.ratio[9] - this.ratio[6], 0);

		ctx.rotate(
			-Math.asin((-this.ratio[8] * Math.sin(this.angle)) / this.ratio[9])
		);
		ctx.translate(
			(this.ratio[2] - this.ratio[5]) / 2 -
				this.ratio[8] * Math.cos(this.angle),
			-this.ratio[5] / 2 - this.ratio[8] * Math.sin(this.angle)
		);
		ctx.rotate(0);
		ctx.translate(-this.x, -this.y);
	}
}

let i = 0;
let a = (Math.PI / 100) * i;

let plyr = new Player();

function drawFrames() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// ctx.setTransform(2, 0, 0, 2, 200, -700);
	plyr.drawBody();
	plyr.archer();
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
