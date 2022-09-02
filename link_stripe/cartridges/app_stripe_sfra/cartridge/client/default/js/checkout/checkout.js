/* global $ */

'use strict';

var base = require('base/checkout/checkout');

var customerHelpers = require('base/checkout/customer');
var billingHelpers = require('./billing');
var shippingHelpers = require('base/checkout/shipping');
var summaryHelpers = require('base/checkout/summary');

base.updateCheckoutView = function () {
    $('body').on('checkout:updateCheckoutView', function (e, data) {

        if (data.csrfToken) {
            $("input[name*='csrf_token']").val(data.csrfToken);
        }
        customerHelpers.methods.updateCustomerInformation(data.customer, data.order);

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
        $(button).prop('disabled', false);
        $('.submit-payment').prop('disabled', true);
    });
}

base.editPaymentButton = function () {
    $('body').on('click', '.edit-payment-btn', function (e) {
        var checkVal = window.getComputedStyle(document.querySelector('.label-payment-privacy'), ':after') 
           .getPropertyValue('background-image');

        if (checkVal && checkVal!='none') {
            $('button.submit-payment').prop("disabled", false);
        } else {
            $('button.submit-payment').prop("disabled", true);
        }
    });
}

base.switchHeadingStepOne = function () {
    $('body').on('click', '.switch-guest-register', function (e) {
        var step = '<span>1/3</span>';
        if ($(this).hasClass('js-cancel-login')) { //guest
            var sectionHeading = step + ' Your email';
            $('.heading-email-my-account').html(sectionHeading);
        } else if ($(this).hasClass('js-login-customer')) { //register
            var sectionHeading = step + ' My account';
            $('.heading-email-my-account').html(sectionHeading);
        }
    });
}

module.exports = base;
