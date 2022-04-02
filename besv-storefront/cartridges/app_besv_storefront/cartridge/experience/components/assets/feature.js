'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');


/**
* Render logic for the assets.feature
*/
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content;

    model.icon = ImageTransformation.getScaledImage(content.keyIcon);
    model.heading = content.heading;
    model.description = content.description;

    return new Template('experience/components/assets/feature').render(model).text;
};
