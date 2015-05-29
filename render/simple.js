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

class Glyph {
    constructor(fontSize, charCode, x, y) {
        Object.assign(this, {fontSize, charCode, x, y});
    }

    get width() {
        return raw_metrics[this.charCode].width * this.fontSize / units_per_em;
    }

    get height() {
        return raw_metrics[this.charCode].height * this.fontSize / units_per_em;
    }

    get bearingX() {
        return raw_metrics[this.charCode].bearingX * this.fontSize / units_per_em;
    }

    get bearingY() {
        return raw_metrics[this.charCode].bearingY * this.fontSize / units_per_em;
    }

    get advance() {
        return raw_metrics[this.charCode].advance * this.fontSize / units_per_em;
    }

    get left() {
        return this.x + this.bearingX;
    }

    get top() {
        return this.y - this.bearingY;
    }

    get bounds() {
        // TODO create a smarter rectangle with getters for right and bottom
        return [this.left, this.top, this.width, this.height];
    }

    fill(ctx) {
        ctx.fillText(String.fromCharCode(this.charCode), this.x, this.y);
    }
}


var string = "2x = 5";

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
    layout.glyphs.forEach(glyph => glyph.fill(ctx));

    ctx.restore();
}

drawLayout(layout);

function drawBoundingBoxes(layout) {
    ctx.save();
    ctx.translate.apply(ctx, layout.position);

    ctx.strokeStyle = 'red';
    layout.glyphs.forEach(glyph => ctx.strokeRect(...glyph.bounds));

    ctx.restore();
}

drawBoundingBoxes(layout);

function computeLayoutBounds(layout) {
    var bounds = layout.glyphs.map(glyph => glyph.bounds)
        .reduce((previous, current) => {
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
ctx.strokeRect(...layoutBounds);
