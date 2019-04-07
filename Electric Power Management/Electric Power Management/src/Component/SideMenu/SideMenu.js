import React from 'react'

const sideMenu = () => {
    return (
        <div className="bg-light border-right" id="sidebar-wrapper">
            <div className="sidebar-heading">LECO</div>
            <div className="list-group list-group-flush">
                <a href="#" className="list-group-item list-group-item-action bg-light"><label className="float-left" style={{"padding": 0,"margin-bottom": 0}}>Dashboard</label></a>
                <a href="#" className="list-group-item list-group-item-action bg-light"><label className="float-left" style={{"padding": 0,"margin-bottom": 0}}>Shortcuts</label></a>
                <a href="#" className="list-group-item list-group-item-action bg-light"><label className="float-left" style={{"padding": 0,"margin-bottom": 0}}>Overview</label></a>
                <a href="#" className="list-group-item list-group-item-action bg-light"><label className="float-left" style={{"padding": 0,"margin-bottom": 0}}>Events</label></a>
                <a href="#" className="list-group-item list-group-item-action bg-light"><label className="float-left" style={{"padding": 0,"margin-bottom": 0}}>Profile</label></a>
                <a href="#" className="list-group-item list-group-item-action bg-light"><label className="float-left" style={{"padding": 0,"margin-bottom": 0}}>Status</label></a>
            </div>
        </div>
    )
}

export default sideMenu
