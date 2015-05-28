var xhr = new XMLHttpRequest();
xhr.open('GET', '../metrics/basic-latin.json', false);
xhr.send();

var data = JSON.parse(xhr.response);

function toHex(number) {
    return "0x" + ("0000" + number.toString(16)).substr(-4);
}

// TODO methods get bounding box for a character of a certain size and location

var fontSize = 144;
var units_per_em = 2048;
var k = fontSize / units_per_em;


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.font = fontSize + 'px comic sans ms';

var string = "2x = 5";

var bboxes = [];

var layout = {
    position: [50, 150],
    glyphs: []
};

// GlyphView
// LayoutView?
// what's the size of each glyph?

var origin = [0, 0];
for (var i = 0; i < string.length; i++) {
    var c = string[i];

    //ctx.fillText(c, origin[0], origin[1]);

    var key = toHex(string.charCodeAt(i));
    var metrics = data[key];

    //var width = k * metrics.width;
    //var height = k * metrics.height;
    //var bearingX = k * metrics.bearingX;
    //var bearingY = k * metrics.bearingY;
    //var left = origin[0] + bearingX;
    //var top = origin[1] - bearingY;

    layout.glyphs.push({
        c: c,
        x: origin[0],
        y: origin[1]
    });
    //bboxes.push([left, top, width, height]);

    origin[0] += k * metrics.advance;
}

function drawLayout(layout) {
    ctx.save();
    ctx.translate.apply(ctx, layout.position);

    layout.glyphs.forEach(function(glyph) {
        ctx.fillText(glyph.c, glyph.x, glyph.y);
    });

    ctx.restore();
}

drawLayout(layout);


//ctx.strokeStyle = 'red';
//bboxes.forEach(function (bbox) {
//    ctx.strokeRect.apply(ctx, bbox);
//});
//
//
//var union = bboxes.reduce(function (previous, current) {
//    var left = Math.min(previous[0], current[0]);
//    var top = Math.min(previous[1], current[1]);
//    var right = Math.max(previous[0] + previous[2], current[0] + current[2]);
//    var bottom = Math.max(previous[1] + previous[3], current[1] + current[3]);
//    return [left, top, right - left, bottom - top];
//});

ctx.strokeStyle = 'blue';
ctx.strokeRect.apply(ctx, union);




//var expr1 = ['2', '*', ['3', '-', '4']];
//
//var expr2 = [['2', '/', '3'], '+', ['5', '/', '6']];
//
//var eq1 = [['2', '*', 'x', '+', '1'], '=', ['7']];
//
//var expr3 = [['1', '/', '2'], '/', ['3', '/', '4']];
//
//var expr4 = ['2', '*', 'x', '/', '3', '/', 'y']; // (2x)/(3y)
//
//var expr4a = [['2', '*', 'x'], '/', ['3', '*', 'y']];
//
// how to show (1/2) / (3/4) ? expr4a