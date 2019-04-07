const Node = require('../Node/Node')

class Graph{
    constructor(start){
        this.start=start;
        this.vertices=[start]
    }
    addVertertices(vertices){
        for(let i=0;i<vertices.length;i++){
            this.vertices.push(vertices[i])
        }
    }

    printGraph(){
        console.log(this.vertices)

    }
}
const node1=new Node(23,345,"Primary", 900,"Closed")
const node2=new Node(63,346, "Switch", 200,"Closed")
const start=new Node(0,0,"Start",0,"None")
start.setAdjacent(node1,0)
start.setAdjacent(node2,0)
node1.setAdjacent(node2,400)

const graph = new Graph(start)
graph.addVertertices([node1,node2])
graph.printGraph()
//console.log(start.getAdjacent())

module.exports = Graph

