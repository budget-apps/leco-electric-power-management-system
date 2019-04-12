const Node = require('../Node/Node')

class Graph{
    constructor(start){
        this.start=start;
        this.vertices=[start];
        this.order=this.vertices.length;
    }
    addVertertices(vertices){
        for(let i=0;i<vertices.length;i++){
            this.vertices.push(vertices[i])
        }
    }

    getVertices(){
        return this.vertices;
    }

    printGraph(){
        console.log(this.vertices)
    }

    findAllAdjacent(node){
        let vertex=node;
        const allAdjacent=[];
        let tempAdjacent=vertex.getAdjacent();
        let tempAdjacentLength=tempAdjacent.length;
        let counter = 0;
        while(vertex.getNodeType()!=="End"){
            for(let i=0;i<tempAdjacentLength;i++){
                allAdjacent.push(tempAdjacent[i]);
            }
            vertex=allAdjacent[counter];
            counter++;
        }
        return allAdjacent;
    }
    findFaultEdge(faultLocation){
        let graphLength=this.order;
        let faultSwitch;
        for(let i=0;i<graphLength;i++){
            if(this.vertices[i]==faultLocation){
                faultSwitch=this.vertices[i];
            }
        }
        let adjacentSwitches;
        let adjacentSwitchesLength=adjacentSwitches.length;
        let foundFaultEdge = false;
        let counter=0;
        while(foundFaultEdge){
            for(let j=0;j<adjacentSwitchesLength;j++){

            }
        }

    }
}
const primary1=new Node(345,"Primary", 900)
const primary2=new Node(63,346, "Switch", 200,"Closed")
const start=new Node(0,0,"Start",0,"None")
start.setAdjacent(primary1,0)
start.setAdjacent(primary2,0)
primary1.setAdjacent(start,400)

const graph = new Graph(start)
graph.addVertertices([primary1,primary2])
//graph.printGraph()
//console.log(graph.getVertices())

graph.findAllAdjacent(start);

module.exports = Graph

