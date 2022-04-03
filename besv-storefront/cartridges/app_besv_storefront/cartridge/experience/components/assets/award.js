'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');


/**
* Render logic for the assets.award
*/
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content;
    model.icon = ImageTransformation.getScaledImage(content.keyIcon);

    return new Template('experience/components/assets/award').render(model).text;
};
