
import React, { Component } from 'react'
import Header from '../Header/Header'
import SideMenu from '../SideMenu/SideMenu'

class Lines  extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (


            <div className="d-flex" id="wrapper">
            <SideMenu  changevalue={this.showmap} hidemap={this.hidemap}/>
            <div id="page-content-wrapper" style={{padding: "0"}}>
                <Header/>
                <div className="container-fluid">
                </div>
                </div>
                </div>
          );
    }
}
 
export default Lines ;