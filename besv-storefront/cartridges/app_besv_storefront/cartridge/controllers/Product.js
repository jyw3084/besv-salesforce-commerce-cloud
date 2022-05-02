'use strict';

var server = require('server');
server.extend(module.superModule);
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

server.append('Show', cache.applyPromotionSensitiveCache, consentTracking.consent, function (req, res, next) {
    var Site = require('dw/system/Site');
    var viewData = res.getViewData();
    viewData.totalImages = viewData.product.images['large'].length.toFixed();
    res.setViewData(viewData);
    next();
});

module.exports = server.exports();