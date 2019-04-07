const Node = require('../Node/Node')

class Graph{
    constructor(start){
        this.start=start;
        this.vertices=[start]
    }
    addVertertices(vertices){
        for(let vertex in vertices){
            this.vertices.push(vertex)
        }
    }

    printGraph(){
        for(let vertex in this.vertices){
            console.log(vertex.getAdjacent())
        }
    }
}

//graph = new Graph(start)
//graph.addVertertices([start,node1,node2])


