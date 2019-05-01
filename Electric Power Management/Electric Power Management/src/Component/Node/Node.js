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
        this.visited = false;
    };

    getIsTripped(){
        return this.isTripped;
    }

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
    setAdjacent(node,current,length,conductivity){
        this.adjacent.push([node,current,length,conductivity])
    }
    getAdjacent(){
        return this.adjacent
    }
    isAdjacent(node){
        const adjacentList = this.getAdjacent();
        const listLen = adjacentList.length
        for(let i=0;i<listLen;i++){
            //console.log("Node"+this.getNodeId()+"Adjacent len"+listLen+"adjacent node="+adjacentList[i][0].getNodeId()+", is adjacent to->"+node.getNodeId())
            if(adjacentList[i][0].getNodeId()===node.getNodeId()){
                return true;
            }
        }
        return false;
    }
    getLineCurrent(node){
        const adjacentList = this.getAdjacent();
        const listLen = adjacentList.length
        for(let i=0;i<listLen;i++){
            //console.log("Node"+this.getNodeId()+"Adjacent len"+listLen+"adjacent node="+adjacentList[i][0].getNodeId()+", is adjacent to->"+node.getNodeId())
            if(adjacentList[i][0].getNodeId()===node.getNodeId()){
                return adjacentList[i][1];
            }
        }
    }
    getLineLength(node){
        const adjacentList = this.getAdjacent();
        const listLen = adjacentList.length
        for(let i=0;i<listLen;i++){
            //console.log("Node"+this.getNodeId()+"Adjacent len"+listLen+"adjacent node="+adjacentList[i][0].getNodeId()+", is adjacent to->"+node.getNodeId())
            if(adjacentList[i][0].getNodeId()===node.getNodeId()){
                return adjacentList[i][2];
            }
        }
    }
    getLineConductivity(node){
        const adjacentList = this.getAdjacent();
        const listLen = adjacentList.length
        for(let i=0;i<listLen;i++){
            //console.log("Node"+this.getNodeId()+"Adjacent len"+listLen+"adjacent node="+adjacentList[i][0].getNodeId()+", is adjacent to->"+node.getNodeId())
            if(adjacentList[i][0].getNodeId()===node.getNodeId()){
                return adjacentList[i][3];
            }
        }
    }
}

module.exports = Node
