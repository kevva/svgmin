'use strict';

var path = require('path');
var read = require('fs').readFile;
var Svgmin = require('../');
var test = require('ava');

test('minify svg', function (t) {
    t.plan(3);

    read(path.join(__dirname, 'fixtures/test.svg'), 'utf8', function (err, data) {
        t.assert(!err);

        new Svgmin()
            .src(data)
            .run(function (err, file) {
                t.assert(!err);
                t.assert(file.length < data.length);
            });
    });
});
