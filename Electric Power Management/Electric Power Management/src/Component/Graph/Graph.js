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
            this.order++;
        }
    }

    getVertices(){
        return this.vertices;
    }

    printGraph(){
        console.log(this.vertices)
    }

    getVertex(id){
        const vertices=this.getVertices();
        for(let i=0;i<this.order;i++){
            if(vertices[i].getNodeId()==id){
                return vertices[i];
            }
        }
    }

    findAllAdjacent(node){
        let allAdjacent=[];
        let tempAdjacent=node.getAdjacent();
        let tempNode;
        while(tempAdjacent.length!=0){
            tempNode = tempAdjacent.pop();
            let tempNodeAdjacents = tempNode[0].getAdjacent();
            allAdjacent.push(tempNode);
            tempAdjacent=tempAdjacent.concat(tempNodeAdjacents);
        }
        return allAdjacent;
    }

    findFaultPath(faultSwitchNode){
        let tempfaultPathNodes = [faultSwitchNode];
        let faultPathNodes = [faultSwitchNode];
        let found = false;
        while(tempfaultPathNodes.length != 0 && !found){
            let parent = tempfaultPathNodes.pop();
            let tempAdjacents = parent.getAdjacent();
            let tempAdjacentLength = tempAdjacents.length;

            for(let i=0;i<tempAdjacentLength;i++){
                let tempNode = tempAdjacents.pop()[0];
                tempfaultPathNodes.push(tempNode);
                tempNode.setParent(parent);
                //console.log(tempNode.getNodeId()+","+tempNode.getFaultCurrent()+","+tempNode.getCurrentPower());
                if(tempNode.getFaultCurrent()){
                    faultPathNodes.push(tempNode);
                }
                if(tempNode.getCurrentPower() == 0 && !tempNode.getFaultCurrent()){
                    faultPathNodes.push(tempNode);
                    found = true;
                    break;
                }
            }
        }
        return faultPathNodes;
    }

    findFaultEdge(faultLocation){
        const faultSwitchNode = this.getVertex(faultLocation);
        const faultPathNodes = this.findFaultPath(faultSwitchNode);
        //console.log(faultPathNodes);
        const faultNode = faultPathNodes.pop();
        const parentNode = faultNode.getParent();
        return [parentNode, faultNode];

    }
}
const primary1=new Node(345,"Primary",900, 900);
const primary2=new Node(346,"Primary",500, 500);
const switch1 = new Node(247,"Switch",200,200,"Closed");
const switch2 = new Node(248,"Switch",200,200,"Closed");
const switch3 = new Node(249,"Switch",200,200,"Closed");
const switch4 = new Node(250,"Switch",150,200,"Closed");
const start=new Node(0,"Start",0,0)
const end=new Node(251,"End",0,0)

start.setAdjacent(primary1,0)
start.setAdjacent(primary2,0)
primary1.setAdjacent(switch1,40);
switch1.setAdjacent(switch2,40);
switch2.setAdjacent(switch3,40);
switch3.setAdjacent(end,40);
switch2.setAdjacent(switch4,20)

switch2.setFaultCurrent(true);
switch3.setFaultCurrent(false);
switch3.setCurrentPower(0);

const graph = new Graph(start)
graph.addVertertices([primary1,primary2,switch1,switch2,switch3,end])
//graph.printGraph()
//console.log(graph.getVertices())

//console.log(graph.findAllAdjacent(start))
//graph.findFaultEdge(247);
let faultEdge = graph.findFaultEdge(247);
//console.log(faultEdge)
console.log(faultEdge[0].getNodeId()+", "+faultEdge[1].getNodeId());

module.exports = Graph

