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
            { key: 6, text: "249\nSwitch\nClosed","loc": "-100 -100"},
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

    createMap(){
        const primary1=new Node(345,"Primary",900, 900);
        const primary2=new Node(346,"Primary",500, 500);
        const switch1 = new Node(247,"Switch",200,200,"Closed");
        const switch2 = new Node(248,"Switch",200,200,"Closed");
        const switch3 = new Node(249,"Switch",200,200,"Closed");
        const switch4 = new Node(250,"Switch",150,200,"Closed");
        const start=new Node(0,"Start",0,0)
        const end=new Node(251,"End",0,0)

        start.setAdjacent(primary1,0)
        start.setAdjacent(primary2,0)
        primary1.setAdjacent(switch1,40);
        switch1.setAdjacent(switch2,40);
        switch2.setAdjacent(switch3,40);
        switch3.setAdjacent(end,40);
        switch2.setAdjacent(switch4,20)

        switch2.setFaultCurrent(true);
        switch3.setFaultCurrent(false);
        switch3.setCurrentPower(0);

        const graph = new Graph(start)
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
