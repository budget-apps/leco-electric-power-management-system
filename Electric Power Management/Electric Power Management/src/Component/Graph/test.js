var Node = require('../Node/Node')
var Graph = require('./Graph')
const node1 = new Node(1)
const node2 = new Node(2)
const node3 = new Node(3)
const node4 = new Node(4)
const node5 = new Node(-1)

const graph = new Graph(node1,node5)
node1.setAdjacent(node2)
node1.setAdjacent(node3)
node2.setAdjacent(node4)
node3.setAdjacent(node4)
node4.setAdjacent(node5)

graph.addVertertices([node2,node3,node4])
for(let i=0;i<graph.getVertices().length;i++){
    console.log(graph.getVertices()[i].getAdjacent().length)
}
console.log("==============================")
graph.findFaultEdge(2)
for(let i=0;i<graph.getVertices().length;i++){
    console.log(graph.getVertices()[i].getAdjacent().length)
}
console.log("==============================")
console.log(graph.findPaths(node1,node5))
