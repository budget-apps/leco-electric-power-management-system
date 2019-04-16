import React, {Component} from 'react'
import GoJs from "../GoJs/GoJs";

const Graph = require('../Graph/Graph')
const Node = require('../Node/Node')



class map extends Component{
    state = {
        isMapUpdated: false,
        nodeDataArray: [
            { key: "1", text: "Start","loc": "-600 0"},
            { key: 2, text: "345\nPrimary","loc": "-500 -100"},
            { key: 4, text: "247\nSwitch\nClosed","loc": "-300 -100"},
            { key: 5, text: "248\nSwitch\nClosed","loc": "-100 -100"},
            { key: 3, text: "346\nPrimary","loc": "-500 100"},
            { key: 6, text: "249\nSwitch\nClosed","loc": "100 -100"},
            { key: 7, text: "250\nSwitch\nClosed","loc": "-300 100"},
            { key: 8, text: "End","loc": "200 0"},
        ],
        linkDataArray: [
            { "from": "1", "to": 2, "text": "Capacity"},
            { "from": 1, "to": 3, "text": "Capacity"},
            { "from": 2, "to": 4, "text": "Capacity",},
            { "from": 4, "to": 5, "text": "Capacity"},
            { "from": 5, "to": 6, "text": "Capacity" },
            { "from": 4, "to": 7, "text": "Capacity" },
            { "from": 6, "to": 8, "text": "Capacity" },
            { "from": 7, "to": 8, "text": "Capacity" },
        ]

    }

    getData(){
    }




    //graph.addVertertices([primary1,primary2,switch1,switch2,switch3,end])
    //graph.printGraph()
    //console.log(graph.getVertices())

    //console.log(graph.findAllAdjacent(start))
    //graph.findFaultEdge(247);
    //let faultEdge = graph.findFaultEdge(247);
    //console.log(faultEdge)
    //console.log(faultEdge[0].getNodeId()+", "+faultEdge[1].getNodeId());

    //Vertices set


    //Link set


    render(){
        return (
            <div className="container-fluid btn-success" style={{width: "100%",padding: 0,backgroundColor: "cyan",margin: "20px",borderRadius: "10px"}}>
                <h1 className="mt-4 btn-default" style={{padding: "10px"}}>Negambo Devision</h1>
                <GoJs nodes={this.state.nodeDataArray} links={this.state.linkDataArray} mapStatus={this.state.isMapUpdated}/>
            </div>
        )
    }

}
export default map
