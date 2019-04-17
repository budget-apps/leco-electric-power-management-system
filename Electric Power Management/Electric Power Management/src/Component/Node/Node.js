class Node{
    constructor(id)
    {
        this.id = id;
        this.adjacent = [];
        this.type="";
        this.capacity=0;
        this.currentPower = 0;
        this.switchType="Closed";
        this.isTripped=false;
        this.faultCurrent=false;
        this.parent = null;
        this.branch = null;
    };

    setIsTripped(val){
        this.isTripped = val;
    }
    setBranch(branch){
        this.branch = branch;
    }

    getBranch(){
        return this.branch;
    }
    setFaultCurrent(val){
        this.faultCurrent = val;
    }

    getFaultCurrent(){
        return this.faultCurrent;
    }

    getParent(){
        return this.parent;
    }

    setParent(node){
        this.parent = node;
    }


    getSwitchType(){
        return this.switchType
    }

    setSwitchType(switchType){
        this.switchType=switchType
    }
    getNodeType(){
        return this.type;
    }

    setNodeType(type){
        this.type=type
    }

    getCapacity(){
        return this.capacity
    }

    setCapacity(capacity){
        this.capacity=capacity
    }

    getNodeId(){
        return this.id;
    }
    getCurrentPower(){
        return this.currentPower
    }
    setCurrentPower(val){
        this.currentPower = val;
    }
    setAdjacent(node,weight){
        this.adjacent.push([node,weight])
    }
    getAdjacent(){
        return this.adjacent
    }
    isAdjacent(node){
        let i;
        const adjacentList = this.getAdjacent();
        const listLen = adjacentList.length
        for(i=0;i<listLen;i++){
            if(adjacentList[i][0].getNodeId()===node.getNodeId()){
                return true;
            }else{
                return false;
            }
        }
    }
}

module.exports = Node
