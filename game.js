let canvas = document.getElementsByTagName("canvas")[0];
let ctx = canvas.getContext("2d");

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
      }

      draw() {
            ctx.translate(this.x, this.y);
            ctx.rotate(0);
            ctx.fillStyle = "#000000";
            ctx.beginPath();
            // face
            ctx.arc(0, -20, 15, 0, 2 * Math.PI);
            // body
            ctx.roundRect(-15, 0, 30, 52.5, 3);
            ctx.fill();
            // hands
            ctx.beginPath();
            ctx.fillStyle = "#CDDC39";
            // bow hand
            ctx.fillRect(0, 1, 65, 5);
            ctx.arc(67, 3.5, 2.5, Math.PI * 3 / 2, Math.PI / 2);
            ctx.fill();
            // arrow hand
            ctx.fillRect(-15, 0, 0, 0);
            ctx.beginPath();
            ctx.arc(100, 100, 15, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillRect(-15, 10, 65, 5);
            // ctx.fillRect(0, 0, 1, canvas.height);
            ctx.rotate(0);
            ctx.translate(-this.x, -this.y);
      }
}

let plyr = new Player();

function drawFrames() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      plyr.draw();
      requestAnimationFrame(drawFrames);
}

drawFrames();

// let i = 0;
// let a = (Math.PI / 100) * i;

// setInterval(() => {
//       i++;
//       a = (Math.PI / 100) * i;
// }, 25);

// ctx.beginPath();
// ctx.fillRect(150, 200, 70, 5);
// ctx.translate(150, 200 + 5 / 2);
// ctx.rotate(-a);
// ctx.fillRect(0, -5 / 2, 70, 5);
// ctx.rotate(a);
// ctx.translate(-150, -200 - 5 / 2);
// ctx.closePath();