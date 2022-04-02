'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');

/**
 * Render logic for the component.endscene.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    //video
    model.id = 'video-' + context.component.getID();
    model.videoUrl = content.video_url;
    model.videoFallbackImg = content.video_fallback_img;
    // overlay text
    model.label = content.text_lebel;
    model.heading = content.text_heading;
    model.description = content.text_description;
    // button
    model.buttonLink = content.button_link;
    model.buttonName = content.button_name || "SHOP NOW";

    return new Template('experience/components/assets/video').render(model).text;
};
