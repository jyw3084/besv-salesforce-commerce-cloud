'use strict';
var baseDetail = require('base/product/detail');

function addZoomClose() {
    $('.zoom-close-btn').on('click', function() {
        $('.products-zoom-model').modal('toggle');
    })
}

function showpZoomModel() {
    var imgs = $('.carousel-inner').children().find('img');
    var imagesToDisplay = '';
    for (var i=0; i<imgs.length; i++) {
        imagesToDisplay += imgs[i].outerHTML;
    }

    var htmlString = '<!-- Modal -->'
        + '<div class="modal show products-zoom-model" id="pdp-zoom" aria-modal="true" role="dialog" style="display: block;">'
        + '<div class="modal-dialog">'
        + '<!-- Modal content-->'
        + '<div class="modal-content">'
        + '<div class="modal-body">'
        + '<button type="button" class="zoom-close-btn" aria-label="Close">X</button>'
        + imagesToDisplay
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>';
    $('body').append(htmlString);

    $('.products-zoom-model').modal('toggle');
    addZoomClose();
}

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
    },

    initializePDPZoom: function(){
        $('.pdp-zoom-icon-btn').on('click', function(){
            showpZoomModel();
        });
    }
});

module.exports = exportBase;