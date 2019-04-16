import React, { Component } from 'react';
import Header from '../Header/Header'
import SideMenu from '../SideMenu/SideMenu'
import Map from '../Map/Map'
import Path from '../Path/Path'
import AddExelSheet from '../Button/AddExelSheet'
import AddFaults from '../Button/AddFaults'
import SelectMap from '../Button/SelectMap'
import FaultEdge from '../FaultEdge/FaultEdge'

import './Dashboard.css'



class Dashboard extends Component {
    state = {
        data: null,
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
                            <FaultEdge changed={this.faultSwitchInputHandler}/>
                            <Path/>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}
export default Dashboard
