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

    isPrimary(){
        for(let i=0;i<this.order;i++){
            if(this.vertices[i].getNodeType()==="Primary"){
                return true
            }
        }
        return false;
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

    isNotVisited(node,path){
        for(let i=0;i<path.length;i++){
            if(path[i].getNodeId()===node.getNodeId()){
                console.log(path[i],node)
                return false;
            }
        }
        return true;
    }

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
                        queue.unshift(newPath)
                    }
                }
                //console.log("\n-------------------\n")
            }
        }
        console.log(allPaths)
        return allPaths
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
                console.log(i+","+tempNode.getNodeId()+","+tempNode.getFaultCurrent()+","+tempNode.getCurrentPower()+","+tempAdjacents.length);
                if(tempNode.getFaultCurrent()){
                    faultPathNodes.push(tempNode);
                }
                if(tempNode.getCurrentPower() === 0 && !tempNode.getFaultCurrent()){
                    if(parent.getFaultCurrent()){
                        if((tempNode.getNodeId()!==-1 && tempAdjacents.length!==1)||(tempNode.getNodeId()===-1 && tempAdjacents.length===1)){
                            faultPathNodes.push(tempNode);
                            found = true;
                            break;
                        }

                    }

                }
            }
        }
        return faultPathNodes;
    }

    findFaultEdge(faultLocation){
        let faultSwitchNode = this.getVertex(faultLocation);
        faultSwitchNode.setSwitchType("Closed")
        let faultPathNodes = this.findFaultPath(faultSwitchNode);
        //console.log(faultPathNodes);
        let faultNode = faultPathNodes.pop();
        let parentNode = this.getVertex(faultNode.getParent());
        //console.log([parentNode, faultNode]);
        parentNode.setSwitchType("Open")
        faultNode.setSwitchType("open")

        return [parentNode, faultNode];
    }

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
                console.log(voltageDrop)
            }
            let voltageDropPrecentage = (voltageDrop/11000)*100
            console.log(voltageDropPrecentage)
            if(voltageDropPrecentage<maxVoltageDropPrecentage){
                testedPaths.push([paths[i],true,voltageDropPrecentage,maxVoltageDropPrecentage])
            }else{
                testedPaths.push([paths[i],false,voltageDropPrecentage,maxVoltageDropPrecentage])
            }
        }
        let validPaths = []
        for(let i=0;i<testedPaths.length;i++){
            console.log(testedPaths[i][1])
            if(testedPaths[i][1]===true){
                validPaths.push(testedPaths[i][0])
            }
        }
        console.log(testedPaths)
        console.log(validPaths)
        return validPaths;
    }

    findMaxVoltageDropPathAll(paths){
        let testedPaths = []
        let maxVoltageDropPrecentage = 6.0
        for(let i=0;i<paths.length;i++){
            let voltageDrop = 0
            for(let j=2;j<paths[i].length-1;j++){
                let sw1 = paths[i][0][j];
                let sw2 = paths[i][0][j+1]

                let lineLength = sw1.getLineLength(sw2)
                let sw1Capacity = sw1.getCurrentPower()
                let sw2Capacity = sw2.getCurrentPower()
                //console.log(sw1.getNodeId(),sw2.getNodeId(),lineLength,sw1Capacity,sw2Capacity)
                let tempVoltageDrop = ((sw1Capacity-sw2Capacity)/2)*lineLength*0.25
                voltageDrop += tempVoltageDrop
                console.log(voltageDrop)
            }
            let voltageDropPrecentage = (voltageDrop/11000)*100
            console.log(voltageDropPrecentage)
            if(voltageDropPrecentage<maxVoltageDropPrecentage){
                let temp = paths[i].concat([true,voltageDrop])
                testedPaths.push(temp)
            }else{
                let temp2 = paths[i].concat([false,voltageDrop])
                testedPaths.push(temp2)
            }
        }
        let validPaths = []
        for(let i=0;i<testedPaths.length;i++){
            console.log(testedPaths[i][1])
            if(testedPaths[i][4]===true){
                validPaths.push(testedPaths[i])
            }
        }
        console.log(testedPaths)
        console.log(validPaths)
        return validPaths;
    }

    findMaxCurrentPathAll(paths){
        let testedPaths =[];
        for(let i=0;i<paths.length;i++){
            let limitedFactor = this.findLimitedFactor(paths[i])
            let totalLineCurrent = 0;
            for(let j=0;j<paths[i].length-1;j++){
                totalLineCurrent += paths[i][j].getLineCurrent(paths[i][j+1])
                console.log(paths[i].length-1,j,totalLineCurrent)
            }
            if(totalLineCurrent<limitedFactor){
                testedPaths.push([paths[i],true,totalLineCurrent,limitedFactor])
            }else{
                testedPaths.push([paths[i],false,totalLineCurrent,limitedFactor])
            }
        }
        console.log("Paths with max current capacity ")
        console.log(testedPaths)
        let validPaths = []
        for(let i=0;i<testedPaths.length;i++){
            if(testedPaths[i][1]===true){
                validPaths.push(testedPaths[i])
            }
        }
        console.log(validPaths)
        return validPaths;
    }

    removeFaultLocFromPaths(validPaths,faultLoc){
        let test3 = []
        for(let i=0;i<validPaths.length;i++){
            let found = false;
            for(let j=0;j<validPaths[i].length;j++){
                if(validPaths[i][j]===faultLoc){
                    found = true;
                    break;
                }
            }
            if(!found){
                test3.push(validPaths[i])
            }

        }
        return test3;

    }

    findMaxCurrentPath(paths){
        let testedPaths =[];
        for(let i=0;i<paths.length;i++){
            let limitedFactor = this.findLimitedFactor(paths[i])
            let totalLineCurrent = 0;
            for(let j=0;j<paths[i].length-1;j++){
                totalLineCurrent += paths[i][j].getLineCurrent(paths[i][j+1])
                console.log(paths[i].length-1,j,totalLineCurrent)
            }
            if(totalLineCurrent<limitedFactor){
                testedPaths.push([paths[i],true,totalLineCurrent,limitedFactor])
            }else{
                testedPaths.push([paths[i],false,totalLineCurrent,limitedFactor])
            }
        }
        console.log("Paths with max current capacity ")
        console.log(testedPaths)
        let validPaths = []
        for(let i=0;i<testedPaths.length;i++){
            if(testedPaths[i][1]===true){
                validPaths.push(testedPaths[i][0])
            }
        }
        console.log(validPaths)
        return validPaths;
    }

    findLimitedFactor(path){
        let primary = path[0];
        for(let i=0;i<path.length;i++){
            if(path[i].getNodeType()==="Primary"){
                primary = path[i]
                console.log(primary)
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
        console.log(min)
        return min;
    }

    findAlternativePathsFromOtherPrimaries(faultLoc){
        let start = this.getVertex(0)
        let end = this.getVertex(-1)
        let startToEndPaths = this.getAllPaths(start,end)
        let test = this.findMaxCurrentPathAll(startToEndPaths)
        let test2 = this.findMaxVoltageDropPathAll(test)
        let faultToEndPaths = this.getAllPaths(faultLoc,end)

        let test3 = []
        for(let i=0;i<test2.length;i++){
            let found = false;
            for(let j=0;j<test2[i].length;j++){
                if(test2[i][0][j]===faultLoc){
                    found = true;
                    break;
                }
            }
            if(!found){
                test3.push(test2[i])
            }

        }
        console.log(test3)
        console.log(faultToEndPaths)
        let paths = []
        for(let i=0;i<test3.length;i++){
            let totalVoltageDrop = test3[i][5]
            let maxCurrent = test3[i][3]-test3[i][2]
            for(let j=0;j<faultToEndPaths.length;j++){
                let tempCurrent = 0;
                let tempDrop = 0;
                for(let k=faultToEndPaths[j].length-1;k>0;k--){
                    let sw1 = faultToEndPaths[j][k-1]
                    let sw2 = faultToEndPaths[j][k]
                    tempCurrent+=sw1.getLineCurrent(sw2)
                    let sw1cap = sw1.getCurrentPower()
                    let sw2cap = sw2.getCurrentPower()
                    let len = sw1.getLineLength(sw2)
                    let tempVoltageDrop = ((sw1cap-sw2cap)/2)*len*0.25
                    tempDrop+= tempVoltageDrop
                    console.log(tempCurrent)
                    console.log(tempDrop)
                }
                if(tempCurrent<maxCurrent){
                    console.log("True")
                    let voltageDrpPrecentage = ((tempDrop+totalVoltageDrop)/11000)*100
                    if(voltageDrpPrecentage<6.0){
                        console.log("true drop")
                        faultToEndPaths[j].pop()
                        paths.push(test3[i][0].concat(faultToEndPaths[j].reverse()))
                    }
                }


            }
        }
        console.log(paths)
        return paths;
    }

}

module.exports =  Graph

