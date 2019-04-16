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



var firebase = require("firebase");



class Dashboard extends Component {



    state = {
        electricMap:[],
        data: null,
        graph: null,
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
        ],
    }

    generateGraph(){
        console.log(this.state.val)
        const primary1=new Node(345); //,"Primary",900, 900,"",,"Primary",500, 500,"","Switch",200,200,"Closed"
        const primary2=new Node(346); //,"Switch",200,200,"Closed","Switch",200,200,"Closed","Switch",150,200,"Closed"
        const switch1 = new Node(247); //,"Start",0,0,"","End",0,0,""
        const switch2 = new Node(248);
        const switch3 = new Node(249);
        const switch4 = new Node(250);
        const start=new Node(0)
        const end=new Node(251)

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
        graph.addVertertices([primary1,primary2,switch1,switch2,switch3,end])
        this.setState({
            graph: graph
        })
        console.log(this.state.graph)
    }
    generateNodeDataArray(){
        this.setState({
            nodeDataArray: [
                { key: "1", text: "Start","loc": "-600 0"},
                { key: 2, text: "345\nPrimary","loc": "-500 -100"},
                { key: 4, text: "247\nSwitch\nClosed","loc": "-300 -100"},
                { key: 5, text: "248\nSwitch\nClosed","loc": "-100 -100"},
                { key: 3, text: "346\nPrimary","loc": "-500 100"},
                { key: 6, text: "249\nSwitch\nClosed","loc": "100 -100"},
                { key: 7, text: "250\nSwitch\nClosed","loc": "-300 100"},
                { key: 8, text: "End","loc": "200 0"},
            ]
        })
        console.log(this.state.nodeDataArray)
    }

    generateLinkDataArray(){
        this.setState({
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
        })
    }

    selectMapEventHandler=(event)=>{

        console.log(event.target.value)
        firebase.database().ref().child('electricMap').orderByChild('1/branch').equalTo(event.target.value)
        .once('value')
        .then((snapshot) => {
            const key = snapshot.key;
            const val = snapshot.val();
            this.setState({electricMap:val})
            console.log(val)
            // this.generateGraph();
        })
        .catch((e) => {
            console.log('Error fetching data', e);
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

                        <select class="browser-default custom-select" onChange={this.selectMapEventHandler}>
                        <option selected> select branch</option>
                        <option value="Negambo">Negambo</option>
                        </select>

                        </div>


                    </div>
                    <div className="row">
                        <div className="col-md-9" style={{width: "100%"}}>
                            <Map dataNodes={this.state.nodeDataArray} dataLinks={this.state.linkDataArray}/>
                        </div>
                        <div className="col-md-3">
                            <FaultEdge changed={this.faultSwitchInputHandler} graph={this.state.graph}/>
                            <Path/>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}
export default Dashboard
