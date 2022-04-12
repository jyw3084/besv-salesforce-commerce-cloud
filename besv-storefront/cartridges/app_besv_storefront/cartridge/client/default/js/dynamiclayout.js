
$(document).ready(function () {

    $(function () {
        $(".feature-tile-description:not(:first-of-type)").css("display", "none");
        $(".feature-tile-top:first-of-type").addClass("open");
        $(".feature-tile-top").click(function () {
          $(".open").not(this).removeClass("open").next().slideUp(300);
          $(this).toggleClass("open").next().slideToggle(300);
        });
    });
});