import React, { Component } from 'react';
import Header from '../Header/Header'
import SideMenu from '../SideMenu/SideMenu'
import Map from '../Map/Map'
import Path from '../Path/Path'
import AddExelSheet from '../Button/AddExelSheet'
import AddFaults from '../Button/AddFaults'

import './Dashboard.css'

class Dashboard extends Component {

    render() {
        return (
            <div className="d-flex" id="wrapper">
                <SideMenu/>

                <div id="page-content-wrapper">
                    <Header/>
                    <div className="row">

                        <div className="col-md-3">
                            <AddExelSheet/>
                        </div>
                        <div className="col-md-3">
                            <AddFaults/>
                        </div>

                    </div>
                    <div className="row">
                        <Map/>
                    </div>
                    <div className="row">
                        <Path/>
                    </div>




                </div>

            </div>
        )
    }

}
export default Dashboard
