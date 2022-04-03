'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the assets.storyBanner.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    // look
    model.bannerMargin = content.banner_margin == '0' ? 'no-margin-class' : 'margin-class';
    model.gradientBackground = content.gradient_background == true ? 'gradient-background-class' : '';

    // image
    model.bannerImage = ImageTransformation.getScaledImage(content.banner_image);
    model.imagePosition = content.image_position || 'left';
    // text
    model.heading = content.text_heading;
    model.description = content.text_description;
    model.textPosition = model.imagePosition == 'left' ? 'right' : 'left';
    // button
    model.buttonLink = content.button_link;
    model.buttonName = content.button_name || "SHOP NOW";

    return new Template('experience/components/assets/storyBanner').render(model).text;
};
