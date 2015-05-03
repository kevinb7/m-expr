var Node = require('./node.js');

function List() {
    this.first = null;
    this.last = null;
}

List.prototype.appendNode = function(node) {
    if (this.last) {
        node.prev = this.last;
        this.last.next = node;
        this.last = node;
    } else {
        this.first = node;
        this.last = node;
    }
};

List.prototype.append = function(value) {
    this.appendNode(new Node(value));
};

List.prototype.prependNode = function(node) {
    if (this.first) {
        node.next = this.first;
        this.first.prev = node;
        this.first = node;
    } else {
        this.first = node;
        this.last = node;
    }
};

List.prototype.prepend = function(value) {
    this.prependNode(new Node(value));
};

List.prototype.forEach = function(callback) {
    var node = this.first;
    while (node) {
        callback(node);
        node = node.next;
    }
};

List.prototype.replaceNode = function(first, last, replacement) {
    replacement.prev = first.prev;
    replacement.next = last.next;
    if (replacement.prev === null) {
        this.first = replacement;
    }
    if (replacement.last === null) {
        this.last = replacement;
    }
};

List.fromArray = function(array) {
    var list = new List();
    array.forEach(function (value) {
        list.append(value);
    });
    return list;
};

module.exports = List;
