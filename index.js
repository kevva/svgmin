'use strict';

var Ware = require('ware');
var xml2js = require('xml2js');

/**
 * Initialize Svgmin
 *
 * @api public
 */

function Svgmin() {
    if (!(this instanceof Svgmin)) {
        return new Svgmin();
    }

    this.ware = new Ware();
}

/**
 * Get or set the source file
 *
 * @param {String} str
 * @api public
 */

Svgmin.prototype.src = function (str) {
    if (!arguments.length) {
        return this._src;
    }

    this._src = str;
    return this;
};

/**
 * Add a plugin to the middleware stack
 *
 * @param {Function} plugin
 * @api public
 */

Svgmin.prototype.use = function (plugin) {
    this.ware.use(plugin);
    return this;
};

/**
 * Run
 *
 * @param {Function} cb
 * @api public
 */

Svgmin.prototype.run = function (cb) {
    var src = this.src();
    var self = this;

    this.toJs(src, function (err, obj) {
        if (err) {
            cb(err);
            return;
        }

        self.runPlugins(obj, function (err, obj) {
            if (err) {
                cb(err);
                return;
            }

            self.toSvg(obj, function (err, str) {
                if (err) {
                    cb(err);
                    return;
                }

                cb(null, str);
            });
        });
    });
};

/**
 * Run a SVG object through the middleware
 *
 * @param {Object} obj
 * @param {Function} cb
 * @api public
 */

Svgmin.prototype.runPlugins = function (obj, cb) {
    this.ware.run(obj, this, cb);
};

/**
 * Parse SVG to JS object
 *
 * @param {String} str
 * @param {Function} cb
 * @api public
 */

Svgmin.prototype.toJs = function (str, cb) {
    var parse = xml2js.parseString;
    var opts = {
        normalize: true,
        normalizeTags: true,
        trim: true
    };

    parse(str, opts, function (err, res) {
        if (err) {
            cb(err);
            return;
        }

        cb(null, res);
    });
};

/**
 * Convert JS object to SVG
 *
 * @param {Object} obj
 * @param {Function} cb
 * @api public
 */

Svgmin.prototype.toSvg = function (obj, cb) {
    var builder = new xml2js.Builder({ renderOpts: { pretty: false }});
    cb(null, builder.buildObject(obj));
};

/**
 * Module exports
 */

module.exports = Svgmin;
