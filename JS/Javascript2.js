// Start Page_Background_Video
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
// End Page_Background_Video
// Start Search
const searchContainer = document.querySelector(".search-container"),
    searchInput = searchContainer.querySelector("input"),
    closeBtn = searchContainer.querySelector(".closeBtn"),
    resultBlock = searchContainer.querySelector(".search-results");
var closeSearch = function () {
    searchContainer.classList.remove("morphing");
    searchContainer.classList.remove("showresults");
    closeBtn.setAttribute("aria-hidden", "true");
    resultBlock.setAttribute("aria-hidden", "true");
    searchInput.value = "";
    setTimeout(function () {
        searchContainer.removeAttribute("style");
    }, 650);
};
/**
 * Close / Open the morphing search
 */
searchInput.addEventListener("focus", function () {
    let offset = searchContainer.getBoundingClientRect();
    searchContainer.style.left = offset.left + "px";
    searchContainer.style.right = offset.right + "px";
    searchContainer.style.top = offset.top + "px";
    searchContainer.style.bottom = offset.bottom + "px";
    searchContainer.style.width = offset.width + "px";
    searchContainer.style.height = offset.height + "px";
    searchContainer.style.position = "fixed";
    setTimeout(function () {
        searchContainer.classList.add("morphing");
        closeBtn.setAttribute("aria-hidden", "false");
    }, 50);
});
// Close on Click
closeBtn.addEventListener("click", function (e) {
    e.preventDefault();

    closeSearch();

    return false;
});

// Close on ESC
document.addEventListener("keyup", function (e) {
    if (e.keyCode === 27) {
        closeSearch();
    }
});
/**
 * When typing something
 */
searchInput.addEventListener("keyup", function () {
    searchContainer.classList.add("showresults");
    resultBlock.setAttribute("aria-hidden", "false");
});
// End Search
// Start Slider
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
    } else if (value === 80) {
        trailValue = 4;
    } else {
        trailValue = 5;
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
    } else if (check.classList.contains("box5")) {
        value = 80;
    } else {
        value = 100;
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
        change > sliderWidth / 5 ? slide("increase") : null;
        change * -1 > sliderWidth / 5 ? slide("decrease") : null;
        [start, move, change, sliderWidth] = [0, 0, 0, 0, 0];
    };
    slider.addEventListener("touchend", mobile);
})();
// End Slider