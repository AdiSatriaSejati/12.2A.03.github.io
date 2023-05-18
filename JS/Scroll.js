/* Navigation
------------------------------------------------------ */

$(window).scroll(function () {
  if ($(window).scrollTop() > 300) {
    $(".main_nav").addClass("sticky");
  } else {
    $(".main_nav").removeClass("sticky");
  }
});

/*----------------------------------------------------*/
/* Smooth Scrolling
------------------------------------------------------ */

jQuery(document).ready(function ($) {
  $(".smoothscroll").on("click", function (e) {
    e.preventDefault();

    var target = this.hash,
      $target = $(target);

    $("html, body")
      .stop()
      .animate({
          scrollTop: $target.offset().top,
        },
        800,
        "swing",
        function () {
          window.location.hash = target;
        }
      );
  });
});
