'use strict';
var baseDetail = require('base/product/detail');

var exportBase = $.extend({}, baseDetail, {

    initDetailsAccordian: function() {
        var acc = $(".pdp-details").find(".accordion");
        var i;
        for (i = 0; i < acc.length; i++) {
            $(acc[i]).on("click", function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                panel.style.display = "none";
                } else {
                panel.style.display = "block";
                }
            });
        }
    },

    initializeFrameGeometry: function() {
        $('.frame-geometry-btn').on('click', function(){
            $('.frame-geometry-btn').removeClass('active');
            $(this).addClass('active');
            var activeDiv = '.' + $(this).data('active');
            $('.geo-metary-content').addClass('d-none');
            $(activeDiv).removeClass('d-none');
        });
    }
});

module.exports = exportBase;