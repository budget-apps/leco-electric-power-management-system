class Graph{
    constructor(start,end){
        this.start=start;
        this.end = end
        this.vertices=[start,end];
        this.order=this.vertices.length;
    }
    addVertertices(vertices){
        for(let i=0;i<vertices.length;i++){
            this.vertices.push(vertices[i])
            this.order++;
        }
    }

    findPrimary(){
        let primaryArray=[]
        for(let i=0;i<this.order;i++){
            if(this.vertices[i].getNodeType()==="Primary"){
                primaryArray.push(this.vertices[i])
            }
        }
        return primaryArray
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
            if(vertices[i].getNodeId()===id){
                return vertices[i];
            }
        }
    }

    findAllAdjacent(node){
        let allAdjacent=[];
        let tempAdjacent=node.getAdjacent();
        console.log(node.getAdjacent())
        let tempNode;
        while(tempAdjacent.length!==0){
            tempNode = tempAdjacent.pop();
            let tempNodeAdjacents = tempNode[0].getAdjacent();
            allAdjacent.push(tempNode[0]);
            tempAdjacent=tempAdjacent.concat(tempNodeAdjacents);
        }
        console.log(allAdjacent)
        return allAdjacent;
    }

    findFaultPath(faultSwitchNode){
        let tempfaultPathNodes = [faultSwitchNode];
        let faultPathNodes = [faultSwitchNode];
        let found = false;
        while(tempfaultPathNodes.length !== 0 && !found){
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
                if(tempNode.getCurrentPower() === 0 && !tempNode.getFaultCurrent()){
                    if(parent.getFaultCurrent()){
                        faultPathNodes.push(tempNode);
                        found = true;
                        break;
                    }

                }
            }
        }
        return faultPathNodes;
    }

    findFaultEdge(faultLocation){
        console.log(faultLocation)
        const faultSwitchNode = this.getVertex(faultLocation);
        const faultPathNodes = this.findFaultPath(faultSwitchNode);
        //console.log(faultPathNodes);
        const faultNode = faultPathNodes.pop();
        const parentNode = faultNode.getParent();
        //console.log([parentNode, faultNode]);
        return [parentNode, faultNode];
    }

    findPaths(from,to){
        console.log(from)
        let allAdjacents =this.findAllAdjacent(from)
        console.log(allAdjacents)
        let tempPath = [from]
        let allPathsToEnd =[]
        for(let i=0;i<allAdjacents.length;i++){
            tempPath.push(allAdjacents[i])
            console.log(allAdjacents[i])
            if(allAdjacents[i].getNodeId()<0){
                allPathsToEnd.push(tempPath)
                tempPath = [from]
            }
        }
        let allPathsToNode = []
        for(let i=0;i<allAdjacents.length;i++){
            tempPath.push(allAdjacents[i])
            if(allAdjacents[i].getNodeId()===to.getNodeId()){
                allPathsToNode.push(tempPath)
                tempPath = [from]
            }
        }
        console.log(allPathsToNode)
        console.log(allPathsToEnd)
        return allPathsToNode;
    }
}

module.exports = Graph

