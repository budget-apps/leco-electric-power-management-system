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

var firebase = require("firebase");



class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state={
            electricMap:[]
        }
    }

    onchangeDropdown=(e)=>{
        firebase.database().ref().child('electricMap').orderByChild('1/branch').equalTo(e.target.value)
        .once('value')
        .then((snapshot) => {
        const key = snapshot.key;
        const val = snapshot.val();
        this.setState({electricMap:val})
        console.log(this.state.electricMap)
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
                    <div className="row" style={{padding: "0",margin: 0,width: "100%"}}>

                        <div className="col-md-3">
                            <AddExelSheet/>
                        </div>
                        <div className="col-md-3">
                            <AddFaults/>
                        </div>
                        <div className="col-md-3">

                        </div>
                        <div className="col-md-3">
                        <select class="browser-default custom-select" onChange={this.onchangeDropdown}>
                        <option selected> select branch</option>
                        <option value="Negambo">Negambo</option>
                        </select>
                        </div>


                    </div>
                    <div className="row" >
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
        )
    }

}
export default Dashboard
