import React, { Component } from 'react';
import Header from '../Header/Header'
import SideMenu from '../SideMenu/SideMenu'
import Map from '../Map/Map'
import Path from '../Path/Path'
import AddExelSheet from '../Button/AddExelSheet'
import AddFaults from '../Button/AddFaults'
import SelectMap from '../Button/SelectMap'
import FaultPath from '../FaultEdge/FaultEdge'

import FaultEdge from '../FaultEdge/FaultEdge'
import Graph from '../Graph/Graph'
import Node from '../Node/Node'
import './Dashboard.css'
import GoJs from "../GoJs/GoJs";

var firebase = require("firebase");

class Dashboard extends Component {



    state = {
        electricMap:[],
        graph: new Graph(),
        nodeDataArray: [{key: 0,"text": "Start"}],
        linkDataArray: [],
        isSelect: false,
    }

    generateGraph(){
        const start=new Node(0)
        const end=new Node(-1)
        start.setNodeType("Start")
        end.setNodeType("End")

        const graph = new Graph(start,end)

        const map = this.state.electricMap
        let dataLength = this.state.electricMap.length;
        let nodeArray=[]
        for(let i=0;i<dataLength;i++){
            let nodeData = map[i];
            let tempNode = new Node(nodeData.id)
            tempNode.setCurrentPower(nodeData.currentPower)
            tempNode.setNodeType(nodeData.type)
            tempNode.setBranch(nodeData.branch)
            tempNode.setCapacity(nodeData.capacity)
            tempNode.setIsTripped(nodeData.isTripped)
            tempNode.setFaultCurrent(nodeData.faultCurrent)
            tempNode.setSwitchType(nodeData.switchType)
            nodeArray.push(tempNode)
        }
        graph.addVertertices(nodeArray)
        let allPrimarys = graph.findPrimary();
        for(let i=0;i<allPrimarys.length;i++){
            start.setAdjacent(allPrimarys[i],0)
        }

        let allVertices=graph.getVertices()
        for(let i=0;i<dataLength;i++){
            let nodeData = map[i]
            let nodeAdjacents = "["+nodeData.adjecent+"]"
            let nodesJson = JSON.parse(nodeAdjacents)
            let vertex = allVertices[i+2];
            for(let j=0;j<nodesJson.length;j++){
                let nodeID=nodesJson[j][0]
                let nodeWeight = Number(nodesJson[j][1])
                let node = graph.getVertex(nodeID)
                if(node!=undefined && nodeWeight!=NaN){
                    vertex.setAdjacent(node,nodeWeight)
                    //console.log(vertex.getNodeId()+","+node.getNodeId())
                }

            }
        }
        this.setState({
            graph: graph
        })
        //console.log(this.state.graph)
    }
    generateNodeDataArray(){
        let allVertices = this.state.graph.getVertices();
        let nodeData=[];
        let placex = -400;
        let placey = 100;
        let isPrimary = true;
        let isNormal = true;
        for(let i=0; i<allVertices.length;i++){
            let tempNode = allVertices[i];
            let nodeID= tempNode.getNodeId()
            let nodeType= tempNode.getNodeType()
            let switchType = tempNode.getSwitchType()
            if(!(nodeType=="Start" || nodeType=="End" || nodeType=="Primary") && isNormal){
                let text = nodeID+"\n"+nodeType+"\n"+switchType
                let nodeDataRow={ key: nodeID, text: text,"loc": placex+" "+placey}
                placex+=100;
                placey=100;
                isNormal = false;
                nodeData.push(nodeDataRow)
            }else  if(!(nodeType=="Start" || nodeType=="End" || nodeType=="Primary") && !isNormal){
                let text = nodeID+"\n"+nodeType+"\n"+switchType
                let nodeDataRow={ key: nodeID, text: text,"loc": (placex-100)+" "+placey}
                placex+=100;
                placey=-100;
                isNormal = true;
                nodeData.push(nodeDataRow)
            }else if(nodeType=="Primary" && isPrimary){
                //console.log("Primary")
                let text = nodeID+"\n"+nodeType+"\n"+switchType
                let nodeDataRow={ key: nodeID, text: text,"loc": "-500 -100"}
                placex+=100;
                placey=100;
                isPrimary = false;
                nodeData.push(nodeDataRow)
            }
            else if(nodeType=="Primary" && !isPrimary){
                //console.log("Primary")
                let text = nodeID+"\n"+nodeType+"\n"+switchType
                let nodeDataRow={ key: nodeID, text: text,"loc": "-500 100"}
                placex+=100;
                placey=-100;
                isPrimary = false;
                nodeData.push(nodeDataRow)
            }
            else if(nodeType=="Start"){
                //console.log("Start")
                let nodeDataRow={ key: nodeID, text: nodeType,"loc": "-600 0"}
                nodeData.push(nodeDataRow)
            }else if(nodeType=="End"){
                //console.log("End")
                let nodeDataRow={ key: nodeID, text: nodeType,"loc": "300 0"}
                nodeData.push(nodeDataRow)
            }

        }
        this.setState({
            nodeDataArray: nodeData
        })
        console.log(this.state.nodeDataArray)
    }

    // generateNodeLocations() {
    //     let allVertices = this.state.graph.getVertices();
    //     let locArray = []
    //     let locX = -600;
    //     let locY = 0;
    //     let locCord = locX + " " + locY
    //
    //     let tempAdjacent = allVertices[0].getAdjacent();
    //     let tempNode;
    //     let locRow = {id: 0, loc: "-600 0"}
    //
    //     while (tempAdjacent.length != 0) {
    //         tempNode = tempAdjacent.pop();
    //         let tempNodeAdjacents = tempNode[0].getAdjacent();
    //         allAdjacent.push(tempNode);
    //         tempAdjacent = tempAdjacent.concat(tempNodeAdjacents);
    //     }
    // }
    //
    generateLinkDataArray(){
        let allVertices = this.state.graph.getVertices();
        let linkArray=[]
        for(let i=0;i<allVertices.length;i++){
            let parentNode = allVertices[i]
            let parentNodeID = parentNode.getNodeId();
            for(let j=0;j<allVertices.length;j++){
                let childNode = allVertices[j]
                let childNodeID = childNode.getNodeId()
                //console.log("Link data array "+parentNodeID+","+childNodeID+"->"+parentNode.isAdjacent(childNode))
                if(parentNode.isAdjacent(childNode)){
                    let linkRows={ "from": parentNodeID, "to": childNodeID, "text": "Line Capacity\n40"};
                    linkArray.push(linkRows)
                }
            }
        }
        this.setState({
            linkDataArray: linkArray
        })
        console.log(this.state.linkDataArray)
        console.log(this.state.graph)
    }

    selectMapEventHandler=(event)=>{

        console.log(event.target.value)
        firebase.database().ref().child('electricMap').orderByChild('1/branch').equalTo(event.target.value)
        .once('value')
        
        .then((snapshot) => {
            const key = snapshot.key;
            const val = snapshot.val().electricmap;
            this.setState({electricMap:val})
            //console.log(this.state.electricMap[0])
            this.generateGraph()
            this.generateNodeDataArray()
            this.generateLinkDataArray()
            //GoJs.componentWillUpdate()
        })
        .catch((e) => {
            alert("nothing found"+e)
        });

    }

    render() {
        const {electricmap} = this.props
        return (
            <div className="d-flex" id="wrapper">
                <SideMenu/>
                <div id="page-content-wrapper" style={{padding: "0"}}>

                    <Header/>
                    <div className="row" style={{padding: "0", margin: 0, width: "100%"}}>

                        <div className="col-md-3">
                            <AddExelSheet/>
                        </div>
                        <div className="col-md-3">
                            {/*<AddFaults/>*/}
                        </div>
                        <div className="col-md-3">

                        </div>
                        <div className="col-md-3">
                            <SelectMap changed={this.selectMapEventHandler}/>

                        </div>


                    </div>
                    <div className="row">
                        <div className="col-md-9" style={{width: "100%"}}>
                            <Map dataNodes={this.state.nodeDataArray} dataLinks={this.state.linkDataArray}/>
                        </div>
                        <div className="col-md-3">
                            <FaultEdge graph={this.state.graph}/>
                            <Path/>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}
export default Dashboard
