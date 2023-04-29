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
