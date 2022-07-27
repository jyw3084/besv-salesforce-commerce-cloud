'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the assets.heroBanner.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;
    // image
    model.bannerImage = ImageTransformation.getScaledImage(content.banner_image);
    model.bannerImageMobile = ImageTransformation.getScaledImage(content.banner_image_mobile);
    // text
    model.heading = content.text_heading;
    model.description = content.text_description;
    // button
    model.buttonLink = content.button_link;
    model.buttonName = content.button_name || "SHOP NOW";

    return new Template('experience/components/assets/heroBanner').render(model).text;
};
