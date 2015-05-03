import Node from './node.js';

// TODO: use BigNum library
class NumberNode extends Node {
    constructor(number) {
        if (typeof(number) === 'string') {
            try {
                number = parseFloat(number);
            } catch (e) {
                throw `invalid number`;
            }
        }
        if (typeof(number) === 'number') {
            super('Number', number);
        } else {
            throw `invalid number`;
        }
    }

    appendChild(node) {
        throw `NumberNodes can't have children`;
    }
}

export default NumberNode;
