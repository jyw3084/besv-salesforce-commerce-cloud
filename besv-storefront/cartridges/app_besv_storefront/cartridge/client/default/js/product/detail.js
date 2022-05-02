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
    },

    updateQuantity: function() {
        $(document).on('click', '.product-quantity-update', function (e) {
            e.preventDefault();
            var isDecrease = $(this).hasClass('decrease-quantity') ? true : false;
            var needChangeTrigger = false;
            var quantityValue = parseInt($('.quantity-field').val());
            if (isDecrease && quantityValue>1) {
                quantityValue = quantityValue - 1;
                needChangeTrigger = true;
            } else if (!isDecrease && quantityValue<=10) {
                quantityValue = quantityValue + 1;
                needChangeTrigger = true;
            }

            if (needChangeTrigger) {
                $('.quantity-field').val(quantityValue);
            }

        });

    },
    updateCarousalIndex: function() {
        $('.carousel .carousel-control-prev, .carousel .carousel-control-next').on('click', function(e){
            e.preventDefault();
            var isNext = $(this).hasClass('carousel-control-next') ? true : false;
            var currentIndex = $('.carousel-inner .carousel-item.active').data('index');
            var totalImages =  $(".pdp-zoom-icon .zoom-index").data('total');
            if (currentIndex>=0) {
                currentIndex=currentIndex+1;
            }
            if (isNext) {
                currentIndex = currentIndex==totalImages ? 1: (currentIndex+1);
            } else { // prev clicked
                currentIndex = currentIndex==1 ? totalImages : (currentIndex-1);
            }
            $(".pdp-zoom-icon .zoom-index").text(currentIndex+'/'+totalImages);

        });

        $('.carousel .carousel-indicators').on('click','li', function(e){
            e.preventDefault();
            var currentIndex = $(this).data('slide-to');
            var totalImages =  $(".pdp-zoom-icon .zoom-index").data('total');
            if (currentIndex>=0) {
                currentIndex=currentIndex+1;
            }
            $(".pdp-zoom-icon .zoom-index").text(currentIndex+'/'+totalImages);
        });
    }
});

module.exports = exportBase;