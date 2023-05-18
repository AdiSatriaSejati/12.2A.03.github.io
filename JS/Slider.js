const slider = document.querySelector(".slider");
const trail = document.querySelector(".trail").querySelectorAll("div");
let value = 0;
let trailValue = 0;
let interval = 4000;
const slide = (condition) => {
  clearInterval(start);
  condition === "increase" ? initiateINC() : initiateDEC();
  move(value, trailValue);
  animate();
  start = setInterval(() => slide("increase"), interval);
};
const initiateINC = () => {
  trail.forEach((cur) => cur.classList.remove("active"));
  value === 80 ? (value = 0) : (value += 20);
  trailUpdate();
};
const initiateDEC = () => {
  trail.forEach((cur) => cur.classList.remove("active"));
  value === 0 ? (value = 80) : (value -= 20);
  trailUpdate();
};
const move = (S, T) => {
  slider.style.transform = `translateX(-${S}%)`;
  trail[T].classList.add("active");
};
const tl = gsap.timeline({
  defaults: {
    duration: 0.6,
    ease: "power2.inOut"
  }
});
const animate = () => tl.restart();
const trailUpdate = () => {
  if (value === 0) {
    trailValue = 0;
  } else if (value === 20) {
    trailValue = 1;
  } else if (value === 40) {
    trailValue = 2;
  } else if (value === 60) {
    trailValue = 3;
  } else {
    trailValue = 4;
  }
};
let start = setInterval(() => slide("increase"), interval);
document.querySelectorAll("svg").forEach((cur) => {
  cur.addEventListener("click", () =>
    cur.classList.contains("next") ? slide("increase") : slide("decrease")
  );
});
const clickCheck = (e) => {
  clearInterval(start);
  trail.forEach((cur) => cur.classList.remove("active"));
  const check = e.target;
  check.classList.add("active");
  if (check.classList.contains("box1")) {
    value = 0;
  } else if (check.classList.contains("box2")) {
    value = 20;
  } else if (check.classList.contains("box3")) {
    value = 40;
  } else if (check.classList.contains("box4")) {
    value = 60;
  } else {
    value = 80;
  }
  trailUpdate();
  move(value, trailValue);
  animate();
  start = setInterval(() => slide("increase"), interval);
};
trail.forEach((cur) => cur.addEventListener("click", (ev) => clickCheck(ev)));
const touchSlide = (() => {
  let start, move, change, sliderWidth;
  slider.addEventListener("touchstart", (e) => {
    start = e.touches[0].clientX;
    sliderWidth = slider.clientWidth / trail.length;
  }, {
    passive: true
  });

  slider.addEventListener("touchmove", (e) => {
    e.preventDefault();
    move = e.touches[0].clientX;
    change = start - move;
  }, {
    passive: true
  });
  const mobile = (e) => {
    change > sliderWidth / 4 ? slide("increase") : null;
    change * -1 > sliderWidth / 4 ? slide("decrease") : null;
    [start, move, change, sliderWidth] = [0, 0, 0, 0];
  };
  slider.addEventListener("touchend", mobile);
})();
