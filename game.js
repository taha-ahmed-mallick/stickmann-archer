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
            this.x = x;
            this.y = y;
            this.mode = "archer";
            this.armour = null;
            this.helmet = null;
            this.health = 100;
      }

      draw() {

      }
}

function drawFrames() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, 2 * Math.PI);
      ctx.fill();
      requestAnimationFrame(drawFrames);
}

drawFrames();