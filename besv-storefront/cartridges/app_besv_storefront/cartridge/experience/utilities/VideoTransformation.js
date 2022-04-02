var VideoTransformation = {};
var MediaFile = require('dw/content/MediaFile');


/**
 * Provides a url to the given media file video.
 * @param {Video|MediaFile} video the video for which the url should be obtained.
 * @param {Object} options the (optional)
 *
 * @return {string} The Absolute url
 */
 VideoTransformation.url = function (video, options) {
    var transform = {};
    var mediaFile = video instanceof MediaFile ? video : video.file;

    return mediaFile.getAbsURL();
};

/**
 * Return an object containing the video for mobile, table and desktop.
 * are: alt text, focalPoint x, focalPoint y.
 *
 * @param {Video} video the image for which to be scaled.
 * @param {Object} The object containing the scaled video
 *
 * @return {string} The Absolute url
 */
 VideoTransformation.getVideo = function (video) {
    var mediaFile = video instanceof MediaFile ? video : video.file;
    var video = {
        src: mediaFile.getAbsURL(),
        alt: mediaFile.getAlt(),
    };

    return video;
};

module.exports = VideoTransformation;
