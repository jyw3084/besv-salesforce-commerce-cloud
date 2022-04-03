'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Render logic for the assets.newsletter.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;
    // promo text
    model.promoText = content.newsletter_promoText;
    // form
    model.placeholder = content.field_placeholder || 'Email';
    model.buttonName = content.button_name || 'SUBSCRIBE';

    return new Template('experience/components/assets/newsletter').render(model).text;
};
