
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
    getAllPathsTo(startid){
        let start = this.getVertex(startid)
        let allPaths = []
        let queue = []
        let path =[]
        path.push(start)
        queue.push(path)
        while(queue.length!==0){
            path = queue.shift()
            let last =path[path.length-1]
            //console.log(last.getNodeId()+","+last.getCurrentPower()+","+last.getFaultCurrent())
            if(last.getCurrentPower()===0 && !last.getFaultCurrent()){
                allPaths.push(path)
            }else{
                let tempAdjacent = last.getAdjacent()
                let validAdjacent = []
                for(let i=0;i<tempAdjacent.length;i++){
                    let temp = tempAdjacent[i][0]
                    if(last.getLineCurrent(temp)!==0){
                        //console.log(temp.getNodeId()+","+end2.getLineCurrent(temp))
                        validAdjacent.push(temp)
                    }
                }
                //console.log(validAdjacent)
                for(let i=0;i<validAdjacent.length;i++){
                    if(this.isNotVisited(validAdjacent[i],path)){
                        //console.log(path)
                        //console.log(validAdjacent[i].getNodeId())
                        //console.log(queue)
                        let newPath = []
                        for(let j=0;j<path.length;j++){
                            newPath.push(path[j])
                        }
                        //console.log(newPath)
                        //console.log(validAdjacent[i].getCurrentPower()+","+validAdjacent[i].getFaultCurrent())
                        if(validAdjacent[i].getCurrentPower()===0){
                           // console.log(validAdjacent[i].getCurrentPower()+","+validAdjacent[i].getFaultCurrent())
                            newPath.push(validAdjacent[i])
                            //tempAdjacent[i][0].setParent(last.getNodeId())
                            queue.unshift(newPath)
                        }


                    }
                }
                //console.log("\n-------------------\n")
            }
        }
        let faultedge =[]
        // faultedge.unshift(allPaths[0][allPaths[0].length-1])
        // faultedge.unshift(allPaths[0][allPaths[0].length-2])
        for(let i=0;i<allPaths.length;i++){
            let temp1 = allPaths[i][allPaths[i].length-1]
            let temp2 = allPaths[i][allPaths[i].length-2]
            let temp = []
            temp.unshift(temp1)
            temp.unshift(temp2)
            faultedge.push(temp)
        }
        //console.log(allPaths)
        //console.log(faultedge)
        return faultedge
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
            console.log("total Line Current "+"of line"+(i+1)+totalLineCurrent)
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
        console.log("+++++++++++++limited factor++++++++++++++++++")
        console.log(min)
        return min;
    }

    BFS(start){
        let V = this.getVertices().length
        let visited = []
        for(let i=0;i<V;i++){
            visited[i]=false
        }
        let queue = []
        let startLoc = this.getVertexLocation(start)
        visited[startLoc]=true
        let final = []
        final.push(start)
        final.push(-5)
        queue.push(start)
        while(queue.length!==0){
            start = queue.shift()
            console.log(start.getNodeId())
            let tempAdjacents = start.getAdjacent()
            for(let j=0;j<tempAdjacents.length;j++){
                let tempNode = tempAdjacents[j][0]
                let tempLoc = this.getVertexLocation(tempNode)
                if(visited[tempLoc]!==true){
                    visited[tempLoc]=true
                    queue.push(tempNode)
                    final.push(tempNode)
                }
            }
            final.push(-5)
        }
        for(let i=0;i<final.length;i++){
            console.log(final[i])
        }
    }

    getVertexLocation(vertex){
        for(let i=0;i<this.getVertices().length;i++){
            if(vertex.getNodeId()==this.getVertices()[i].getNodeId()){
                return i
            }
        }
        return 0;
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
        let valid = []
        for(let k=0;k<faultEdges.length;k++){
            let start = this.getVertex(0)
            let end1 = faultEdges[k][0]
            let end2 = faultEdges[k][1]
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


            //console.log(tempValid.length)
            for(let i=0;i<tempValid.length;i++){
                let founds = false;
                let found2 = false;
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
                //checking that last node does not connected to a fault edge's node
                let last = tempValid[i][tempValid[i].length-1]
                let lastAdjacent = last.getAdjacent()
                //console.log(last.getNodeId())
                //console.log(lastAdjacent)
               // console.log(faultEdges[k][0])
                for(let j=0;j<lastAdjacent.length;j++){
                    if(faultEdges[k][0]===lastAdjacent[j][0]){
                        //console.log("Mathed")
                        found2=true;
                    }
                }
                if(!founds && !found2){
                    valid.push(tempValid[i])
                }
            }
        }


        console.log("++++++++++Valid recovery paths before checking Max current capacity++++++++++++++")
        console.log(valid)
        valid = this.findMaxCurrentPath(valid)
        console.log("++++++++++Valid recovery paths after checking Max current capacity++++++++++++++")
        console.log(valid)
        valid = this.findMaxVoltageDropPath(valid)
        console.log("++++++++++Valid recovery paths after checking Max voltage drop++++++++++++++")
        console.log(valid)
        return valid
    }

}

module.exports =  Graph

