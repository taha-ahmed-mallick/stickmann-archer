let screens = document.getElementsByClassName("screen");
let campaignBtn = document.getElementsByClassName("campaign")[0];
// removing intro screen
setTimeout(() => screenTransition(screens[0], screens[1]), 100);

function screenTransition(screenR, screenE) {
      screenR.style.opacity = 0;
      screenE.classList.remove("hidden");
      screenE.style.opacity = 1;
      setTimeout(() => {
            screenR.classList.add("hidden");
            screenR.classList.remove("top");
            screenE.classList.add("top");
      }, 750);
};

campaignBtn.addEventListener("click", () => {
      screenTransition(screens[1], screens[3]);
      // startGame();
});