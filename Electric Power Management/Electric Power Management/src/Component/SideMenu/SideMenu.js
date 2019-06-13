import React from 'react'
import { Link } from 'react-router-dom'

class   sideMenu extends React.Component {

    constructor(props){
        super(props)
        this.state={

        }
    }

    
    render(){
    return (
        <div className="bg-light border-right" id="sidebar-wrapper">
            <div className="sidebar-heading">LECO</div>
            <div className="list-group list-group-flush">
            <Link  className="list-group-item list-group-item-action bg-light" to="/dashboard"><label className="float-left" style={{"padding": 0,"marginBottom": 0}}>Dashboard</label></Link>
                <Link  className="list-group-item list-group-item-action bg-light" to="/switches"><label className="float-left" style={{"padding": 0,"marginBottom": 0}}>Switches</label></Link>
                <Link  className="list-group-item list-group-item-action bg-light" to="/Lines"><label className="float-left" style={{"padding": 0,"marginBottom": 0}}>Lines</label></Link>

            </div>
        </div>
    )
}
}

export default sideMenu
