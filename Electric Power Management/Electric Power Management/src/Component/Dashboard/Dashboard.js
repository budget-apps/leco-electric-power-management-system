import React, { Component } from 'react';
import Header from '../Header/Header'
import SideMenu from '../SideMenu/SideMenu'
import Map from '../Map/Map'
import Path from '../Path/Path'
import AddExelSheet from '../Button/AddExelSheet'
import AddFaults from '../Button/AddFaults'
import SelectMap from '../Button/SelectMap'
import FaultPath from '../FaultEdge/FaultEdge'

import './Dashboard.css'



class Dashboard extends Component {

    state = {
        faultSwitch: "",
    }

    faultSwitchInputHandler = () => {
        console.log(this.state.faultSwitch)
    }

    faultSwitchInputChangeHandler = (event) => {
        this.setState(
            {
                faultSwitch: event.target.value
            }
        )
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
                            <input
                                type="text"
                                className="form-control"
                                style={{padding: "5px", margin: "10px", display: "inline", width: "50%"}}
                                placeholder="enter fault switch"
                                value={this.state.faultSwitch}
                                onChange={(event) => this.faultSwitchInputChangeHandler(event)}
                            />
                            <input
                                className="btn btn-primary"
                                type="submit"
                                value="Find"
                                onClick={this.faultSwitchInputHandler}
                            />
                        </div>
                        <div className="col-md-3">
                            <SelectMap/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8" style={{width: "100%"}}>
                            <Map/>
                        </div>
                        <div className="col-md-4">
                            <FaultPath/>
                        </div>

                    </div>
                    <div className="row">
                        <Path/>
                    </div>


                </div>

            </div>
        );
    }

}
export default Dashboard
