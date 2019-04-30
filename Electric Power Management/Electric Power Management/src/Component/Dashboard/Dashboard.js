import React, { Component } from 'react';
import Header from '../Header/Header'
import SideMenu from '../SideMenu/SideMenu'
import Map from '../Map/Map'
import Path from '../Path/Path'
import AddExelSheet from '../Button/AddExelSheet'
import SelectMap from '../Button/SelectMap'

import FaultEdge from '../FaultEdge/FaultEdge'
import Graph from '../Graph/Graph'
import Node from '../Node/Node'
import './Dashboard.css'
import Swal from "sweetalert2";

var firebase = require("firebase");

class Dashboard extends Component {
    state = {
        electricMap:[],
        graph: new Graph(),
        branch: "No ",
        nodeDataArray: [],
        linkDataArray: [],
        faultNodeArray: [],
        faultLinkArray: [],
        pathNodeArray: [],
        pathLinkArray: [],
        faultEdges: [],
        paths: [],
        isSelect: false,
        faultSwitch: ""
    }

    findFaultPaths(){
        let graph=this.state.graph;
        let faultLoc = this.state.faultSwitch
        let faultEdges = graph.findFaultEdge(faultLoc)
        let from = graph.getVertex(faultLoc)
        let to = faultEdges[1]
        let paths = graph.findPaths(from,to)
        this.setState({
            paths: paths,
        })
        console.log(paths)
        let allPathNodeData = []
        let allPathLinkData = []
        for(let i=0;i<paths.length;i++){
            let pathNodeSet = []
            let pathLinkSet = []
            let locX = -100
            let locY= 0
            for(let j=0;j<paths[i].length;j++){
                let tempNode = paths[i][j]
                let nodeID= tempNode.getNodeId()
                let nodeType= tempNode.getNodeType()
                let switchType = tempNode.getSwitchType()
                let text = nodeID+"\n"+nodeType+"\n"+switchType
                let pathNodeDataRow = {key: nodeID,text: text,"loc": locX+" "+locY}
                locX+=100;
                pathNodeSet.push(pathNodeDataRow)
                let pathNodeLinkRow= {}
                if(j!==paths[i].length-1){
                    pathNodeLinkRow = {"from": paths[i][j].getNodeId(),"to": paths[i][j+1].getNodeId(),"text": "40"}
                }
                pathLinkSet.push(pathNodeLinkRow)
            }
            allPathNodeData.push(pathNodeSet)
            allPathLinkData.push(pathLinkSet)
        }
        this.setState({
            pathNodeArray: allPathNodeData,
            pathLinkArray: allPathLinkData
        })
    }

    findFaultEdges(){
        //console.log(this.state.graph)
        let graph=this.state.graph;
        let faultLoc = this.state.faultSwitch
        let faultEdges = graph.findFaultEdge(faultLoc);
        console.log(faultEdges)
        let faultNodeData = []
        let loc =["-100 0","50 0"]
        for(let i=0;i<2;i++){
            let tempNode = faultEdges[i]
            let nodeID= tempNode.getNodeId()
            let nodeType= tempNode.getNodeType()
            let switchType = tempNode.getSwitchType()
            let text = nodeID+"\n"+nodeType+"\n"+switchType
            let faultNodeDataRow = {key: nodeID,text: text,"loc": loc[i]}
            faultNodeData.push(faultNodeDataRow)
        }
        let faultNodeLink = [];
        let faultNodeLinkRow = {"from": faultEdges[0].getNodeId(),"to": faultEdges[1].getNodeId(),"text": "40"}
        faultNodeLink.push(faultNodeLinkRow)
        this.setState({
            faultEdges: faultEdges,
            faultNodeArray: faultNodeData,
            faultLinkArray: faultNodeLink,
        })
        //console.log(this.state.graph)
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
                let nodeLength = Number(nodesJson[j][2])
                let nodeConductivity = Number(nodesJson[j][3])
                let node = graph.getVertex(nodeID)
                if(node!==undefined && nodeWeight!==NaN){
                    vertex.setAdjacent(node,nodeWeight,nodeLength,nodeConductivity)
                    //console.log(vertex.getNodeId()+","+node.getNodeId())
                }

            }
        }
        this.setState({
            graph: graph
        })
        console.log(graph,this.state.graph)
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
            let isTripped = tempNode.getIsTripped()
            let faultCurrent = tempNode.getFaultCurrent()
            let currentPower = tempNode.getCurrentPower()
            let capacity = tempNode.getCapacity()
            if(!(nodeType==="Start" || nodeType==="End" || nodeType==="Primary") && isNormal){
                let text = "ID: "+nodeID+"\nType: "+nodeType+"\nStatus: "+switchType+"\nisTipped: "+isTripped+"\nFault Current: "+faultCurrent+"\nCurrent Power: "+currentPower+"\nSwitch Capacity: "+capacity
                let nodeDataRow={ key: nodeID, text: text,"loc": placex+" "+placey}
                placex+=100;
                placey=100;
                isNormal = false;
                nodeData.push(nodeDataRow)
            }else  if(!(nodeType==="Start" || nodeType==="End" || nodeType==="Primary") && !isNormal){
                let text = "ID: "+nodeID+"\nType: "+nodeType+"\nStatus: "+switchType+"\nisTipped: "+isTripped+"\nFault Current: "+faultCurrent+"\nCurrent Power: "+currentPower+"\nSwitch Capacity: "+capacity
                let nodeDataRow={ key: nodeID, text: text,"loc": (placex-100)+" "+placey}
                placex+=100;
                placey=-100;
                isNormal = true;
                nodeData.push(nodeDataRow)
            }else if(nodeType==="Primary" && isPrimary){
                //console.log("Primary")
                let text = "Type: "+nodeType+"\nTotal Feeder Capcity: "+capacity
                let nodeDataRow={ key: nodeID, text: text,"loc": "-500 -100"}
                placex+=100;
                placey=100;
                isPrimary = false;
                nodeData.push(nodeDataRow)
            }
            else if(nodeType==="Primary" && !isPrimary){
                //console.log("Primary")
                let text = "Type: "+nodeType+"\nTotal Feeder Capcity: "+capacity
                let nodeDataRow={ key: nodeID, text: text,"loc": "-500 100"}
                placex+=100;
                placey=-100;
                isPrimary = false;
                nodeData.push(nodeDataRow)
            }
            else if(nodeType==="Start"){
                //console.log("Start")
                let nodeDataRow={ key: nodeID, text: nodeType,"loc": "-600 0"}
                nodeData.push(nodeDataRow)
            }else if(nodeType==="End"){
                //console.log("End")
                let nodeDataRow={ key: nodeID, text: "Type: Switch\nStatus: Normally Open","loc": "300 0"}
                nodeData.push(nodeDataRow)
            }

        }
        this.setState({
            nodeDataArray: nodeData
        })
    }

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
                    let linkRows={ "from": parentNodeID, "to": childNodeID, "text": "40"};
                    linkArray.push(linkRows)
                }
            }
        }
        this.setState({
            linkDataArray: linkArray
        })
    }

    selectMapEventHandler=(event)=>{
        this.setState({
            branch: event.target.value
        })
        firebase.database().ref().child('electricMap').orderByChild('1/branch').equalTo(event.target.value)
        .once('value')
        
        .then((snapshot) => {
            const val = snapshot.val().electricmap;
            this.setState({electricMap:val})
            this.generateGraph()
            this.generateLinkDataArray()
            this.generateNodeDataArray()
            this.checkingFaults()
            this.findFaultEdges()
            this.findFaultPaths()
        })
        .catch((e) => {
            console.log(e)
            Swal.fire('Please select a branch')
        });

    }

    checkingFaults(){
        let vertices = this.state.graph.getVertices()
        for(let i=0;i<vertices.length;i++){
            let tempNode = vertices[i]
            if(tempNode.getIsTripped()){
                this.setState(
                    {
                        faultSwitch: tempNode.getNodeId()
                    }
                )
            }
        }
    }

    render() {
        return (
            <div className="d-flex" id="wrapper">
                <SideMenu/>
                <div id="page-content-wrapper" style={{padding: "0"}}>
                    <Header/>
                    <div className="container-fluid">
                        <div className="row btn-default">
                            <h2 className="" style={{padding: "5px"}}>Dashboard</h2>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <AddExelSheet/>
                            </div>
                            <div className="col-md-3">
                            </div>
                            <div className="col-md-3">

                            </div>
                            <div className="col-md-3">
                                <SelectMap changed={this.selectMapEventHandler}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-9">
                                <Map branch={this.state.branch} dataNodes={this.state.nodeDataArray} dataLinks={this.state.linkDataArray}/>
                            </div>
                            <div className="col-md-3">
                                <FaultEdge nodeDataArray={this.state.faultNodeArray} linkDataArray={this.state.faultLinkArray}/>
                                <Path nodeDataArray={this.state.pathNodeArray} linkDataArray={this.state.pathLinkArray}/>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        );
    }

}
export default Dashboard
