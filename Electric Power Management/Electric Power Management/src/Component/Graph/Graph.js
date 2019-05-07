class Graph{
    constructor(start){
        this.start=start;
        this.vertices=[start];
        this.order=this.vertices.length;
    }

    /*Add vertices to the graph*/
    addVertertices(vertices){
        for(let i=0;i<vertices.length;i++){
            this.vertices.push(vertices[i])
            this.order++;
        }
    }

    /*Find primary nodes*/
    findPrimary(){
        let primaryArray=[]
        for(let i=0;i<this.order;i++){
            if(this.vertices[i].getNodeType()==="Primary"){
                primaryArray.push(this.vertices[i])
            }
        }
        return primaryArray
    }

    /*Get all vertices*/
    getVertices(){
        return this.vertices;
    }

    /*get vertex by ID*/
    getVertex(id){
        const vertices=this.getVertices();
        for(let i=0;i<this.order;i++){
            if(vertices[i].getNodeId()===id){
                return vertices[i];
            }
        }
    }

    /*Check node is in a give path*/
    isNotVisited(node,path){
        for(let i=0;i<path.length;i++){
            if(path[i].getNodeId()===node.getNodeId()){
                //console.log(path[i],node)
                return false;
            }
        }
        return true;
    }

    /*Get all paths from start to end*/
    getAllPaths(start, end){
        let allPaths = []
        let queue = []
        let path =[]
        path.push(start)
        queue.push(path)
        while(queue.length!==0){
            path = queue.shift()
            let last =path[path.length-1]
            if(last.getNodeId()===end.getNodeId()){
                allPaths.push(path)
            }else{
                let tempAdjacent = last.getAdjacent()
                for(let i=0;i<tempAdjacent.length;i++){
                    if(this.isNotVisited(tempAdjacent[i][0],path)){
                        //console.log(path)
                        //console.log(tempAdjacent[i][0].getNodeId())
                        //console.log(queue)
                        let newPath = []
                        for(let i=0;i<path.length;i++){
                            newPath.push(path[i])
                        }
                        newPath.push(tempAdjacent[i][0])
                        //tempAdjacent[i][0].setParent(last.getNodeId())
                        queue.unshift(newPath)
                    }
                }
                //console.log("\n-------------------\n")
            }
        }
        for(let i=0;i<allPaths.length;i++){
            allPaths[i].pop()
        }
        //console.log(allPaths)
        return allPaths
    }

    /*Find complete fault path from faulted switch*/
    findFaultPath(faultSwitchNode){
        let tempfaultPathNodes = [faultSwitchNode];
        let faultPathNodes = [];
        for(let i=0;i<tempfaultPathNodes.length;i++){
            faultPathNodes.push(tempfaultPathNodes[i])
        }

        let found = false;
        while(tempfaultPathNodes.length !== 0 && !found){
            //console.log(faultPathNodes)
            let parent = tempfaultPathNodes.pop();
            let tempAdjacents = parent.getAdjacent();
            //console.log(faultPathNodes)
            for(let i=0;i<tempAdjacents.length;i++){
                let tempNode = tempAdjacents[i][0];
                tempfaultPathNodes.push(tempNode);
                tempNode.setParent(parent.getNodeId());
                //console.log(i+","+tempNode.getNodeId()+","+typeof tempNode.getFaultCurrent()+","+typeof Number(tempNode.getCurrentPower())+","+tempAdjacents.length+","+parent.getFaultCurrent());
                if(tempNode.getFaultCurrent()){
                    faultPathNodes.push(tempNode)
                }
                if(Number(tempNode.getCurrentPower()) === 0 && !tempNode.getFaultCurrent()){
                    //console.log(i+","+tempNode.getNodeId()+","+tempNode.getFaultCurrent()+","+tempNode.getCurrentPower()+","+tempAdjacents.length);
                    if(parent.getFaultCurrent()){
                        faultPathNodes.push(tempNode);
                        found = true;
                        break;

                    }

                }
                //console.log(tempNode.getAllParent())
            }
            if(found){
                break
            }

        }
        return faultPathNodes;
    }

    /*get only the edge from complete fault path*/
    findFaultEdge(faultLocation){
        let faultSwitchNode = this.getVertex(faultLocation);
        faultSwitchNode.setSwitchType("Closed")
        let faultPathNodes = this.findFaultPath(faultSwitchNode);
        //console.log(faultPathNodes);
        let faultNode = faultPathNodes[faultPathNodes.length-1];
        let parentNode = faultPathNodes[faultPathNodes.length-2];
        //console.log(faultNode);

        return [parentNode, faultNode];
    }

    /*Find maximum voltage drop a path can have*/
    findMaxVoltageDropPath(paths){
        let testedPaths = []
        let maxVoltageDropPrecentage = 6.0
        for(let i=0;i<paths.length;i++){
            let voltageDrop = 0
            for(let j=2;j<paths[i].length-1;j++){
                let sw1 = paths[i][j];
                let sw2 = paths[i][j+1]

                let lineLength = sw1.getLineLength(sw2)
                let sw1Capacity = sw1.getCurrentPower()
                let sw2Capacity = sw2.getCurrentPower()
                //console.log(sw1.getNodeId(),sw2.getNodeId(),lineLength,sw1Capacity,sw2Capacity)
                let tempVoltageDrop = ((sw1Capacity-sw2Capacity)/2)*lineLength*0.25
                voltageDrop += tempVoltageDrop
                //console.log(voltageDrop)
            }
            let voltageDropPrecentage = (voltageDrop/11000)*100
            //console.log(voltageDropPrecentage)
            if(voltageDropPrecentage<maxVoltageDropPrecentage){
                testedPaths.push([paths[i],true,voltageDropPrecentage,maxVoltageDropPrecentage])
            }else{
                testedPaths.push([paths[i],false,voltageDropPrecentage,maxVoltageDropPrecentage])
            }
        }
        let validPaths = []
        for(let i=0;i<testedPaths.length;i++){
           // console.log(testedPaths[i][1])
            if(testedPaths[i][1]===true){
                validPaths.push(testedPaths[i][0])
            }
        }
        //console.log(testedPaths)
        //console.log(validPaths)

        return validPaths;
    }

    /*Find maximum current a path can have*/
    findMaxCurrentPath(paths){
        let testedPaths =[];
        for(let i=0;i<paths.length;i++){
            let limitedFactor = this.findLimitedFactor(paths[i])
            let totalLineCurrent = 0;
            for(let j=0;j<paths[i].length-1;j++){
                totalLineCurrent += paths[i][j].getLineCurrent(paths[i][j+1])
                //console.log(paths[i].length-1,j,totalLineCurrent)
            }
            if(totalLineCurrent<limitedFactor){
                testedPaths.push([paths[i],true,totalLineCurrent,limitedFactor])
            }else{
                testedPaths.push([paths[i],false,totalLineCurrent,limitedFactor])
            }
        }
        //console.log("Paths with max current capacity ")
        //console.log(testedPaths)
        let validPaths = []
        for(let i=0;i<testedPaths.length;i++){
            if(testedPaths[i][1]===true){
                validPaths.push(testedPaths[i][0])
            }
        }
        //console.log(validPaths)
        return validPaths;
    }

    /*Find limited factor*/
    findLimitedFactor(path){
        let primary = path[0];
        for(let i=0;i<path.length;i++){
            if(path[i].getNodeType()==="Primary"){
                primary = path[i]
                //console.log(primary)
                break;
            }
        }
        let primaryCapacity = Number(primary.getCapacity())
        let totalFeeders = Number(primary.getAdjacent().length)
        let feederCapacity = primaryCapacity/totalFeeders
        let switchCapacity = Number(primary.getAdjacent()[0][0].getCapacity())
        let lineConductivity = Number(primary.getAdjacent()[0][3])
        let allFactors= [feederCapacity,switchCapacity,lineConductivity]

        let min = allFactors[0]
        for(let i=1;i<allFactors.length;i++){
            if(min > allFactors[i]){
                min = allFactors[i]
            }
        }
        //console.log(min)
        return min;
    }

    getAllPathsNew(start, end){
        let allPaths = []
        let queue = []
        let path =[]
        path.push(start)
        queue.push(path)
        while(queue.length!==0){
            path = queue.shift()
            let last =path[path.length-1]
            if(last.getNodeId()===end.getNodeId()){
                allPaths.push(path)
            }else{
                let tempAdjacent = last.getAdjacent()
                for(let i=0;i<tempAdjacent.length;i++){
                    if(this.isNotVisited(tempAdjacent[i][0],path)){
                        //console.log(path)
                        //console.log(tempAdjacent[i][0].getNodeId())
                        //console.log(queue)
                        let newPath = []
                        for(let i=0;i<path.length;i++){
                            newPath.push(path[i])
                        }
                        newPath.push(tempAdjacent[i][0])
                        //tempAdjacent[i][0].setParent(last.getNodeId())
                        queue.unshift(newPath)
                    }
                }
                //console.log("\n-------------------\n")
            }
        }
        for(let i=0;i<allPaths.length;i++){
            allPaths[i].pop()
        }
        //console.log(allPaths)
        return allPaths
    }

    /*Find recovery paths*/
    /*
    *
    * Main logic
    * Don't touch a single code
    * */
    findAltPaths(faultEdges){
        let start = this.getVertex(0)
        let end1 = faultEdges[0]
        let end2 = faultEdges[1]
        let en2adjacent = end2.getAdjacent()
        let validAdjacent = []
        for(let i=0;i<en2adjacent.length;i++){
            let temp = en2adjacent[i][0]
            if(end2.getLineCurrent(temp)!==0){
                //console.log(temp.getNodeId()+","+end2.getLineCurrent(temp))
                validAdjacent.push(temp)
            }
        }

        for(let i=0;i<validAdjacent.length;i++){
            let tempN = validAdjacent[i]
            if(tempN.getSwitchType()==="Closed"){
                return []
            }
        }

        //console.log(validAdjacent[0])
        let paths=[]
        for(let i=0;i<validAdjacent.length;i++){
            let temppaths = this.getAllPathsNew(start,validAdjacent[i])
            paths.push(temppaths)
        }


        //console.log(paths[0])
       // console.log(paths[1])
        let tempValid = []
        for(let l=0;l<paths.length;l++){
            for(let i=0;i<paths[l].length;i++){
                let path = paths[l][i]
                let found = false;
                for(let j=0;j<path.length;j++){
                    let adjacent = path[j].getAdjacent()
                    for(let k=0;k<adjacent.length;k++){
                        let adjacentNode = adjacent[k][0]
                        if((adjacentNode.getNodeId()===end1.getNodeId())||(adjacentNode.getNodeId()===end2.getNodeId())){
                            found = true
                            break;
                        }
                    }

                }
                if(!found){
                    path.push(validAdjacent[l])
                    tempValid.push(path)
                }
            }

            //console.log(tempValid)
            //console.log("++++++++++++++++++++++++++++")
        }

        let valid = []
        //console.log(tempValid.length)
        for(let i=0;i<tempValid.length;i++){
            let founds = false;
            //console.log(tempValid[i].length)
            for(let j=2;j<tempValid[i].length-1;j++){
                let tmp1 = tempValid[i][j]
                let tmp2 = tempValid[i][j+1]
                //console.log(tmp1.getLineCurrent(tmp2)+","+tmp1.getNodeId()+","+tmp2.getNodeId())
                if(tmp1.getLineCurrent(tmp2)===0){
                    founds = true;
                    break;
                }
            }
            if(!founds){
                valid.push(tempValid[i])
            }
        }
        //console.log(valid)

        valid = this.findMaxCurrentPath(valid)
        valid = this.findMaxVoltageDropPath(valid)

        return valid
    }

}

module.exports =  Graph

