let canvas = document.getElementsByTagName("canvas")[0];
let ctx = canvas.getContext("2d");
let input = document.getElementById("angle");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.95;

function resize(event = true) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * (window.innerHeight - 20) / window.innerHeight;
      if (event) {
            console.log("event");
      }
};

resize(false);
window.addEventListener('resize', resize);

class Player {
      constructor() {
            this.x = canvas.width * 0.10;
            this.y = canvas.height * 0.8;
            this.mode = "archer";
            this.armour = null;
            this.helmet = null;
            this.health = 100;
            this.angle = (180 - input.value) * Math.PI / 180;
      }

      draw() {
            this.angle = (180 - input.value) * Math.PI / 180;
            ctx.translate(this.x, this.y);
            ctx.rotate(0);
            ctx.fillStyle = "#000000";
            ctx.beginPath();
            // face
            ctx.arc(0, -20, 15, 0, 2 * Math.PI);
            // body
            ctx.roundRect(-20, 0, 40, 70, 3);
            ctx.fill();
            // hands
            ctx.beginPath();
            ctx.fillStyle = "#CDDC39";
            // bow hand
            ctx.fillRect(0, 1, 82, 6);
            ctx.arc(84, 4, 3, Math.PI * 3 / 2, Math.PI / 2);
            ctx.fill();
            // arrow hand
            ctx.translate(-17.5, 3); // its starting is (-19,0)
            ctx.rotate(this.angle);
            ctx.fillStyle = "#000";
            ctx.fillRect(-3 / 2, -3, 29.5, 6);
            ctx.rotate(-this.angle);
            ctx.translate(17.5, -3);

            ctx.translate(-19 + 29.5 * Math.cos(this.angle), 3 + 29.5 * Math.sin(this.angle)); // its starting is (-19,0)
            ctx.rotate(Math.asin((- 29.5 * Math.sin(this.angle)) / 62));
            ctx.beginPath();
            ctx.fillStyle = "#fff";
            ctx.arc(2, 0, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillRect(0, -3, 62, 6, 3);
            ctx.rotate(-Math.asin((- 29.5 * Math.sin(this.angle)) / 62));
            ctx.translate(19 - 29.5 * Math.cos(this.angle), -3 - 29.5 * Math.sin(this.angle));
            // ctx.fillStyle = "#f00";
            // ctx.fillRect(-this.x, 0, canvas.width, 1);
            ctx.rotate(0);
            ctx.translate(-this.x, -this.y);
      }
}

let i = 0;
let a = (Math.PI / 100) * i;

let plyr = new Player();

function drawFrames() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      plyr.draw();
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