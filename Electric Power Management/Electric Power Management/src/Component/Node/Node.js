class Node{
    constructor(current,id,type,capacity,status)
    {
        this.cuurent = current;
        this.id = id;
        this.adjacent = [];
        this.type=type;
        this.capacity=capacity;
        this.status=status;
    };
    getStatus(){
        return this.status
    }

    setStatus(status){
        this.status=status
    }
    getType(){
        return this.type
    }

    setType(type){
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
    getCurrent(){
        return this.cuurent
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

node1=new Node(23,345,"Primary", 900,"Closed")
node2=new Node(63,346, "Switch", 200,"Closed")
start=new Node(0,0,"Start",0,"None")
start.setAdjacent(node1,0)
start.setAdjacent(node2,0)
node1.setAdjacent(node2,400)


console.log(node1.getNodeId())
console.log(node1.isAdjacent(node2))

module.exports = Node
