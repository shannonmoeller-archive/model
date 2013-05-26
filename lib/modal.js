/*jshint indent:4, node:true, plusplus:false */
'use strict';

// Constants
var TYPE_ARRAY = '[object Array]';
var TYPE_OBJECT = '[object Object]';

/**
 * Shortcut to `toString` for better type detection.
 * @type {Function}
 */
var toString = Object.prototype.toString;

/**
 * A basic JavaScript model.
 * @constructor
 */
var Model = function (raw) {
    if (!(this instanceof Model)) {
        return new Model(raw);
    }

    if (raw instanceof Model) {
        raw = raw.toJSON();
    }

    this._raw = raw || {};
};

/**
 * Gets one or more values.
 *
 * @param {String,Array} key A single key, or a list of keys.
 * @return {*,Object} The value, or an object of key-value pairs.
 * @since 0.0.1
 */
Model.prototype.get = function (key) {
    var i = null;
    var ret = null;
    var property = null;
    var raw = this._raw;

    // Get single value
    if (toString.call(key) !== TYPE_ARRAY) {
        return raw[key];
    }

    // Get multiple values
    i = key.length;
    ret = {};

    while (i--) {
        property = key[i];
        ret[property] = raw[property];
    }

    return ret;
};

/**
 * Sets one or more values.
 *
 * @param {String,Object} key A single key, or a list of keys.
 * @param {*,undefined} value The value for a single key, or `undefined`.
 * @return {this} Maintains chain.
 * @since 0.0.1
 */
Model.prototype.set = function (key, value) {
    var previous = null;
    var property = null;
    var raw = this._raw;

    // Set single value
    if (toString.call(key) !== TYPE_OBJECT) {
        previous = raw[key];
        raw[key] = value;

        return this;
    }

    // Set multiple values
    for (property in key) {
        if (key.hasOwnProperty(property)) {
            this.set(property, key[property]);
        }
    }

    return this;
};

/**
 * Gets the raw data as a plain object.
 *
 * @return {Object} The raw data.
 * @since 0.0.1
 */
Model.prototype.toJSON = function () {
    return this._raw;
};

/**
 * Export.
 */
module.exports = Model;
