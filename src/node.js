var List = require('./list.js');

class Node {
    constructor(type, value = null) {
        this.type = type;
        this.value = value;
        
        this.children = new List();

        this.next = null;
        this.prev = null;
        this.parent = null;
    }

    appendChild(node) {
        node.parent = this;
        this.children.appendNode(node);
    };

    prependChild(node) {
        node.parent = this;
        this.children.prependNode(node);
    }
    
    replaceChildren(first, last, replacement) {
        replacement.parent = this;
        this.children.replaceNode(first, last, replacement);
    }

    hasChildNodes() {
        return !!this.children.first;
    }
    
    copy() {
        var copy = new Node(this.value, this.type);
        this.children.forEach(child => {
            copy.appendChild(child.copy());
        });
    }
    
    toString() {
        var result = '';
        if (this.value) {
            result += this.value;
        } else {
            this.children.forEach(child => {
                result += child.toString();
            });
        }
        return result;
    }
}

module.exports = Node;
