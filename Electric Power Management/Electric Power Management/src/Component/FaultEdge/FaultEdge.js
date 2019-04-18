import React, {Component} from 'react'
import GoJs from "../GoJs/GoJs";
import Graph from '../Graph/Graph'
import Node from '../Node/Node'

class faultEdge extends Component{

    state = {
        faultSwitch: "",
        graph: this.props.graph,
        hasFaults: false,
        nodeDataArray: [
            { key: 5, text: "248\nSwitch\nClosed","loc": "-200 0"},
            { key: 6, text: "249\nSwitch\nClosed"}
        ],
        linkDataArray: [
            { "from": 5, "to": 6, "text": "Capacity" }
        ],
    }

    findFault(){
        let faultEdges = this.state.graph.findFaultEdge(this.state.faultSwitch);
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
        let faultNodeLinkRow = {"from": faultEdges[0].getNodeId(),"to": faultEdges[1].getNodeId(),"text": "Line Capacity"}
        faultNodeLink.push(faultNodeLinkRow)
        this.setState({
            nodeDataArray: faultNodeData,
            linkDataArray: faultNodeLink,
            hasFaults: true
        })
    }


    faultSwitchInputHandler = () => {
        try{
            this.setState(
                {
                    graph: this.props.graph
                }
            )
            console.log(this.state.faultSwitch);
            console.log(this.state.graph)
            this.findFault()
        }catch (e) {
            console.log("error: "+e)
            alert("No faults detected")
        }


    }

    faultSwitchInputChangeHandler = (event) => {
        this.setState(
            {
                faultSwitch: event.target.value,
                graph: this.props.graph
            }
        )
    }
    render() {
        return (
            <div className="btn-danger" style={{margin: "0 0 5px 0", borderRadius: "10px"}}>
                {
                    (this.state.hasFaults)
                        ? <div>
                            {/*<input*/}
                                {/*type="text"*/}
                                {/*className="form-control"*/}
                                {/*style={{padding: "5px", margin: "10px", display: "inline", width: "60%"}}*/}
                                {/*placeholder="Enter fault switch id"*/}
                                {/*value={this.state.faultSwitch}*/}
                                {/*onChange={(event) => this.faultSwitchInputChangeHandler(event)}*/}
                            {/*/>*/}
                            {/*<input*/}
                                {/*className="btn btn-primary"*/}
                                {/*type="submit"*/}
                                {/*value="Find"*/}
                                {/*style={{padding: "9px"}}*/}
                                {/*onClick={this.faultSwitchInputHandler}*/}
                            {/*/>*/}
                            <GoJs nodes={this.state.nodeDataArray} links={this.state.linkDataArray}/>

                        </div>
                        : <div>
                            <input
                                type="text"
                                className="form-control"
                                style={{padding: "5px", margin: "10px", display: "inline", width: "60%"}}
                                placeholder="Enter fault switch id"
                                value={this.state.faultSwitch}
                                onChange={(event) => this.faultSwitchInputChangeHandler(event)}
                            />
                            <input
                                className="btn btn-primary"
                                type="submit"
                                value="Find"
                                style={{padding: "9px"}}
                                onClick={this.faultSwitchInputHandler}
                            />
                    </div>
                }
            </div>
        )
    }
}
export default faultEdge
