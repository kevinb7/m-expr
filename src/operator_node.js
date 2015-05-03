import Node from './node.js';
import NumberNode from './number_node.js'

var allowedOperators = [
    '+', '-', '*', '/', '^'
];

var operatorPrecedence = {
    '+': 1, '-': 1,
    '*': 2, '/': 2,
    '^': 3
};

var evaluators = {
    '+'(a, b) { return a + b },
    '-'(a, b) { return a - b },
    '*'(a, b) { return a * b },
    '/'(a, b) { return a / b },
    '^'(a, b) { return Math.pow(a, b) }
};

class OperatorNode extends Node {
    constructor(operator) {
        if (allowedOperators.indexOf(operator) === -1) {
            throw `invalid operator`;
        }
        super('Operator', operator);
    }

    appendChild(node) {
        throw `OperatorNodes can't have children`;
    }
    
    prependChild(node) {
        throw `OperatorNodes can't have children`;
    }
    
    replaceChildren(node) {
        throw `OperatorNodes can't have children`;
    }
    
    canEvaluate() {
        return this.prev.type === 'Number' && this.next.type === 'Number';
    }
    
    evaluate() {
        if (this.canEvaluate()) {
            // TODO: create an alias for 'value' called 'operator'
            
            var operator = evaluators[this.value];
            var result = operator(this.prev.value, this.next.value);
            var resultNode = new NumberNode(result);

            this.parent.replaceChildren(this.prev, this.next, resultNode);
        }
    }
}

export default OperatorNode;
