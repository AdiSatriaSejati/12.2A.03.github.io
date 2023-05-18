var vid = document.getElementById("bgvid");
var pauseButton = document.querySelector("#polina button");

if (vid) {
  if (window.matchMedia("(prefers-reduced-motion)").matches) {
    vid.removeAttribute("autoplay");
    vid.pause();
    pauseButton.innerHTML = "Play";
  }

  function vidFade() {
    vid.classList.add("stopfade");
  }

  vid.addEventListener("ended", function () {
    // only functional if "loop" is removed
    vid.pause();
    // to capture IE10
    vidFade();
  });

  pauseButton.addEventListener("click", function () {
    vid.classList.toggle("stopfade");
    if (vid.paused) {
      vid.play();
      pauseButton.innerHTML = "Jeda";
    } else {
      vid.pause();
      pauseButton.innerHTML = "Putar";
    }
  });
}
