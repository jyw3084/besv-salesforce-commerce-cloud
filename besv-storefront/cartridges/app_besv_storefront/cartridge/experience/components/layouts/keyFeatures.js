'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');
/**
 * Render logic for the layouts.keyFeatures.
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    model.heading = context.content.heading || '';
    model.regions = PageRenderHelper.getRegionModelRegistry(context.component);

    return new Template('experience/components/layouts/keyFeatures').render(model).text;
};