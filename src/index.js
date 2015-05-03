require('babel/register');
var Node = require('./node.js');
var NumberNode = require('./number_node.js');
var OperatorNode = require('./operator_node.js');


var expr3 = new Node();

expr3.appendChild(new NumberNode(1));
expr3.appendChild(new OperatorNode('+'));
expr3.appendChild(new NumberNode(2));
expr3.appendChild(new OperatorNode('+'));

var term1 = new Node();
term1.appendChild(new NumberNode(3));
var mult1 = new OperatorNode('*');
term1.appendChild(mult1);
term1.appendChild(new NumberNode(4));
expr3.appendChild(term1);


console.log(expr3.toString());

mult1.evaluate();

console.log('----');
console.log(expr3.toString());

console.log('hello, world!');
