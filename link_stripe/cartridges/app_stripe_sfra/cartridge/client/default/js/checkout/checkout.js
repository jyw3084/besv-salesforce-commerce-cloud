/* global $ */

'use strict';

var base = require('base/checkout/checkout');

var billingHelpers = require('./billing');
var shippingHelpers = require('base/checkout/shipping');
var summaryHelpers = require('base/checkout/summary');

base.updateCheckoutView = function () {
    $('body').on('checkout:updateCheckoutView', function (e, data) {
        shippingHelpers.methods.updateMultiShipInformation(data.order);
        summaryHelpers.updateTotals(data.order.totals);

        data.order.shipping.forEach(function (shipping) {
            shippingHelpers.methods.updateShippingInformation(
                shipping,
                data.order,
                data.customer,
                data.options
            );
        });

        billingHelpers.methods.updateBillingInformation(
            data.order,
            data.customer,
            data.options
        );

        billingHelpers.methods.updatePaymentInformation(data.order, data.options);
        summaryHelpers.updateOrderProductSummaryInformation(data.order, data.options);
    });
};

base.addPrivacyCheck = function() {
    $('#check-payment-privacy').on('click', function() {
        var checkVal = window.getComputedStyle(document.querySelector('.label-payment-privacy'), ':after') 
           .getPropertyValue('background-image');

        if (checkVal && checkVal!='none') {
            $('button.submit-payment').prop("disabled", false);
        } else {
            $('button.submit-payment').prop("disabled", true);
        }
    })
}

base.enableButton = function () {
    $('body').on('checkout:enableButton', function (e, button) {
        if (!$(button).hasClass('submit-payment')) {
            $(button).prop('disabled', false);
        } else {
            $(button).prop('disabled', true);
        }
    });
}

module.exports = base;
