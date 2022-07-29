'use strict';
var baseDetail = require('base/product/detail');
var pdpheaderTop = $('.pdp-header-menu-wrapper').offset().top;

function addZoomClose() {
    $('.zoom-close-btn').on('click', function() {
        $('.products-zoom-model').modal('toggle');
        $('.products-zoom-model').remove();
    })
}

function showpZoomModel(index) {
    var imgs = $('.carousel-inner').children().find('img');
    var imagesToDisplay = '';
    for (var i=0; i<imgs.length; i++) {
        if (index == i) {
            imagesToDisplay += '<div class="zoom-scroll-to">';
            imagesToDisplay += imgs[i].outerHTML;
            imagesToDisplay += '</div>';
        } else {
            imagesToDisplay += imgs[i].outerHTML;
        }
    }
    var htmlString = '<!-- Modal -->'
        + '<div class="modal show products-zoom-model" id="pdp-zoom" aria-modal="true" role="dialog" style="display: block;">'
        + '<div class="modal-dialog">'
        + '<!-- Modal content-->'
        + '<div class="modal-content">'
        + '<div class="modal-body">'
        + '<button type="button" class="zoom-close-btn" aria-label="Close"><svg width="20" height="20" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.979492" y="23.2655" width="32" height="2" rx="1" transform="rotate(-45 0.979492 23.2655)" fill="#333333"></rect><rect width="32" height="2" rx="1" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 25.0215 23.2655)" fill="#333333"></rect></svg></button>'
        + imagesToDisplay
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>';
    $('body').append(htmlString);

    $('.products-zoom-model').modal('toggle');
    addZoomClose();

    // scroll
    var zoomToPic = $('.zoom-scroll-to').offset().top;
    if (zoomToPic) {
        $('.products-zoom-model').animate({
            scrollTop: zoomToPic
        }, 0);
    }
}

function pdpZoom() {
    $('.pdp-zoom-icon-btn').on('click', function(){
        var currentIndex = $('.carousel-inner .carousel-item.active').data('index');
        showpZoomModel(currentIndex);
    });
}

function carousalIndex() {
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
        pdpZoom();
    },

    scrollPdp: function() {
        $(document).on('click', '.pdp-menu-link', function (e) {
            var scrollToDiv = $(this).data('scroll');
            var scrollToDivTop = $(scrollToDiv).offset().top;
            var scrollTill = scrollToDivTop && pdpheaderTop ? scrollToDivTop - pdpheaderTop : scrollToDivTop;
            $('html, body').animate({
                scrollTop: scrollTill
            }, 2000);

        });

    },
    updateCarousalIndex: function() {
        carousalIndex();
    },
    tabsUnderHood: function() {
        $('.tab-under-hood').on('click', function(){
            $('.tab-under-hood').removeClass('selected');
            $(this).addClass('selected');
            var openDiv = ".under-hood-" + $(this).data("key");
            $(".under-hood-specification").addClass('d-none');
            $(openDiv).removeClass('d-none');

        });
    },
    updateImageCarousal: function () {
        $('body').on('updateImageCarousal', function () {
            pdpZoom();
            carousalIndex();
        });
    },


});

module.exports = exportBase;