'use strict';

/**
 * @namespace ContactUs
 */

 var server = require('server');
 server.extend(module.superModule);

/**
 * ContactUs-Subscribe : This endpoint is called to submit the shopper's contact information
 * @name Base/ContactUs-Subscribe
 * @function
 * @memberof ContactUs
 * @param {middleware} - server.middleware.https
 * @param {httpparameter} - contactFirstName - First Name of the shopper
 * @param {httpparameter} - contactLastName - Last Name of the shopper
 * @param {httpparameter} - contactEmail - Email of the shopper
 * @param {httpparameter} - contactTopic - ID of the "Contact Us" topic
 * @param {httpparameter} - contactComment - Comments entered by the shopper
 * @param {category} - sensitive
 * @param {returns} - json
 * @param {serverfunction} - post
 */
server.replace('Subscribe', server.middleware.https, function (req, res, next) {
    var Resource = require('dw/web/Resource');
    var hooksHelper = require('*/cartridge/scripts/helpers/hooks');
    var emailHelper = require('*/cartridge/scripts/helpers/emailHelpers');
    var Transaction = require('dw/system/Transaction');
    var CustomObjectMgr = require('dw/object/CustomObjectMgr');
    var URLUtils = require('dw/util/UUIDUtils');
    var randonKey = URLUtils.createUUID();

    var myForm = req.form;
    var isValidEmailid = emailHelper.validateEmail(myForm.contactEmail);
    if (isValidEmailid) {
        var contactDetails = [myForm.contactFirstName, myForm.contactLastName, myForm.contactEmail, myForm.contactTopic, myForm.contactComment];
        hooksHelper('app.contactUs.subscribe', 'subscribe', contactDetails, function () {});
        Transaction.wrap(function () {
            var CustomObject = CustomObjectMgr.createCustomObject('ContactUS', randonKey);
            CustomObject.custom.email =  myForm.contactEmail;
            CustomObject.custom.firstName = myForm.contactFirstName;
            CustomObject.custom.lastName = myForm.contactLastName;
            CustomObject.custom.message = myForm.contactComment;
        });

        res.json({
            success: true,
            msg: Resource.msg('subscribe.to.contact.us.success', 'contactUs', null)
        });
    } else {
        res.json({
            error: true,
            msg: Resource.msg('subscribe.to.contact.us.email.invalid', 'contactUs', null)
        });
    }

    next();
});

module.exports = server.exports();
