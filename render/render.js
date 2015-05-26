var canvas = document.getElementById('canvas');

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



//
//var ctx = canvas.getContext('2d');
//ctx.fillStyle = 'black';
//ctx.fillText(str, 100, 100);

