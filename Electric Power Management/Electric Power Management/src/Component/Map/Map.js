import React from 'react'
import GoJs from "../GoJs/GoJs";

const Graph = require('../Graph/Graph')
const Node = require('../Node/Node')



const map = () => {

    const isMapUdated = false;
    const normalFillColor = "#f68c06";
    const strokeColor = "#4d90fe";

    //Vertices set
    const nodeDataArray = [
        { key: 1, text: "Start","loc": "-300 0"},
        { key: 2, text: "345\nPrimary","loc": "-100 -200"},
        { key: 4, text: "247\nSwitch\nClosed"},
        { key: 5, text: "248\nSwitch\nClosed"},
        { key: 3, text: "346\nPrimary","loc": "-100 200"},
        { key: 6, text: "249\nSwitch\nClosed"},
        { key: 7, text: "250\nSwitch\nClosed"},
        { key: 8, text: "End"},
        ];

    //Link set
    const linkDataArray = [ { "from": 1, "to": 2, "text": "Capacity"},
        { "from": 1, "to": 3, "text": "Capacity"},
        { "from": 2, "to": 4, "text": "Capacity",},
        { "from": 4, "to": 5, "text": "Capacity"},
        { "from": 5, "to": 6, "text": "Capacity" },
        { "from": 4, "to": 7, "text": "Capacity" },
        { "from": 6, "to": 8, "text": "Capacity" },
        { "from": 7, "to": 8, "text": "Capacity" },
        ]
    return (
        <div className="container-fluid btn-success" style={{width: "100%",padding: 0,backgroundColor: "cyan",margin: "20px",borderRadius: "10px"}}>
            <h1 className="mt-4 btn-default" style={{padding: "10px"}}>Negambo Devision</h1>
            <GoJs nodes={nodeDataArray} links={linkDataArray} mapStatus={isMapUdated}/>
        </div>
    )
}
export default map
