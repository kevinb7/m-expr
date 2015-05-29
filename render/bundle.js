'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var xhr = new XMLHttpRequest();
xhr.open('GET', '../metrics/basic-latin.json', false);
xhr.send();

var fontSize = 144;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.font = fontSize + 'px comic sans ms';

// TODO: create an object for retrieving raw metrics for different fonts
var raw_metrics = JSON.parse(xhr.response);
var units_per_em = 2048;

var Glyph = (function () {
    function Glyph(fontSize, charCode, x, y) {
        _classCallCheck(this, Glyph);

        Object.assign(this, { fontSize: fontSize, charCode: charCode, x: x, y: y });
    }

    _createClass(Glyph, [{
        key: 'width',
        get: function () {
            return raw_metrics[this.charCode].width * this.fontSize / units_per_em;
        }
    }, {
        key: 'height',
        get: function () {
            return raw_metrics[this.charCode].height * this.fontSize / units_per_em;
        }
    }, {
        key: 'bearingX',
        get: function () {
            return raw_metrics[this.charCode].bearingX * this.fontSize / units_per_em;
        }
    }, {
        key: 'bearingY',
        get: function () {
            return raw_metrics[this.charCode].bearingY * this.fontSize / units_per_em;
        }
    }, {
        key: 'advance',
        get: function () {
            return raw_metrics[this.charCode].advance * this.fontSize / units_per_em;
        }
    }, {
        key: 'left',
        get: function () {
            return this.x + this.bearingX;
        }
    }, {
        key: 'top',
        get: function () {
            return this.y - this.bearingY;
        }
    }, {
        key: 'bounds',
        get: function () {
            // TODO create a smarter rectangle with getters for right and bottom
            return [this.left, this.top, this.width, this.height];
        }
    }, {
        key: 'fill',
        value: function fill(ctx) {
            ctx.fillText(String.fromCharCode(this.charCode), this.x, this.y);
        }
    }]);

    return Glyph;
})();

var string = '2x = 5';

var layout = {
    position: [50, 150],
    glyphs: []
};

// GlyphView
// LayoutView?
// what's the size of each glyph?

var x = 0;
var y = 0;

for (var i = 0; i < string.length; i++) {
    var glyph = new Glyph(fontSize, string.charCodeAt(i), x, y);
    layout.glyphs.push(glyph);
    x += glyph.advance;
}

function drawLayout(layout) {
    ctx.save();
    ctx.translate.apply(ctx, layout.position);

    ctx.fillStyle = 'black';
    layout.glyphs.forEach(function (glyph) {
        return glyph.fill(ctx);
    });

    ctx.restore();
}

drawLayout(layout);

function drawBoundingBoxes(layout) {
    ctx.save();
    ctx.translate.apply(ctx, layout.position);

    ctx.strokeStyle = 'red';
    layout.glyphs.forEach(function (glyph) {
        return ctx.strokeRect.apply(ctx, _toConsumableArray(glyph.bounds));
    });

    ctx.restore();
}

drawBoundingBoxes(layout);

function computeLayoutBounds(layout) {
    var bounds = layout.glyphs.map(function (glyph) {
        return glyph.bounds;
    }).reduce(function (previous, current) {
        var l = Math.min(previous[0], current[0]);
        var t = Math.min(previous[1], current[1]);
        var r = Math.max(previous[0] + previous[2], current[0] + current[2]);
        var b = Math.max(previous[1] + previous[3], current[1] + current[3]);
        return [l, t, r - l, b - t];
    });
    bounds[0] += layout.position[0];
    bounds[1] += layout.position[1];
    return bounds;
}

var layoutBounds = computeLayoutBounds(layout);

ctx.strokeStyle = 'blue';
ctx.strokeRect.apply(ctx, _toConsumableArray(layoutBounds));
