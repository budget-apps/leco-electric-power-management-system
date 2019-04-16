import React, { Component } from 'react';
import Header from '../Header/Header'
import SideMenu from '../SideMenu/SideMenu'
import Map from '../Map/Map'
import Path from '../Path/Path'
import AddExelSheet from '../Button/AddExelSheet'
import AddFaults from '../Button/AddFaults'
import SelectMap from '../Button/SelectMap'
import FaultEdge from '../FaultEdge/FaultEdge'
import Graph from '../Graph/Graph'
import './Dashboard.css'



class Dashboard extends Component {
    state = {
        data: null,
        graph: null,
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
        graph.addVertertices([primary1,primary2,switch1,switch2,switch3,end])
        this.setState({
            graph: graph
        })
    }
    render() {
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
                            <SelectMap/>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-9" style={{width: "100%"}}>
                            <Map data={this.state.data}/>
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
