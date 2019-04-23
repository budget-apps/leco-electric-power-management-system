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
        let tempNode;
        while(tempAdjacent.length!==0){
            tempNode = tempAdjacent.pop();
            let tempNodeAdjacents = tempNode[0].getAdjacent();
            allAdjacent.push(tempNode[0]);
            tempAdjacent=tempAdjacent.concat(tempNodeAdjacents);
        }
        return allAdjacent;
    }

    findFaultPath(faultSwitchNode){
        let tempfaultPathNodes = [faultSwitchNode];
        let faultPathNodes = [faultSwitchNode];
        let found = false;
        while(tempfaultPathNodes.length !== 0 && !found){
            let parent = tempfaultPathNodes.pop();
            let tempAdjacents = parent.getAdjacent();
            for(let i=0;i<tempAdjacents.length;i++){
                let tempNode = tempAdjacents[i][0];
                tempfaultPathNodes.push(tempNode);
                tempNode.setParent(parent.getNodeId());
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
        const faultSwitchNode = this.getVertex(faultLocation);
        const faultPathNodes = this.findFaultPath(faultSwitchNode);
        //console.log(faultPathNodes);
        const faultNode = faultPathNodes.pop();
        const parentNode = this.getVertex(faultNode.getParent());
        //console.log([parentNode, faultNode]);
        return [parentNode, faultNode];
    }

    findPaths(from,to){
        let allAdjacents =this.findAllAdjacent(from)
        let allPathsToEnd =[]
        let tempPath = [from]
        for(let i=0;i<allAdjacents.length;i++){
            tempPath.push(allAdjacents[i])
            if(allAdjacents[i].getNodeId()==-1){
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
        return allPathsToEnd;
    }
}

module.exports =  Graph

