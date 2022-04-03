'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the assets.awardBanner.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    // image
    model.bannerImage = ImageTransformation.getScaledImage(content.banner_image);
    model.imagePosition = content.image_position;
    // text
    model.heading = content.text_heading;
    model.description = content.text_description;
    // button
    model.buttonLink = content.button_link;
    model.buttonName = content.button_name || "SHOP NOW";
    // awards
    model.regions = PageRenderHelper.getRegionModelRegistry(context.component);

    return new Template('experience/components/assets/awardBanner').render(model).text;
};
