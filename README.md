# svgmin [![Build Status](https://travis-ci.org/kevva/svgmin.svg?branch=master)](https://travis-ci.org/kevva/svgmin)

> Minify SVG files

## Install

```sh
$ npm install --save svgmin
```

## Usage

```js
var read = require('fs').readFileSync;
var Svgmin = require('svgmin');

var svgmin = new Svgmin()
    .src(read('foo.svg', 'utf8'));

svgmin.run(function (err, svg) {
    if (err) {
        throw err;
    }

    console.log(svg);
    //=> <?xml version="1.0" encoding="UTF-8"><svg...
});
```

## License

MIT © [Kevin Mårtensson](http://kevinmartensson.com)
