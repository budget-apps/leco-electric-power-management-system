import React from 'react'
import GoJs from "../GoJs/GoJs";

const Graph = require('../Graph/Graph')
const Node = require('../Node/Node')

const map = () => {
    //Vertices set
    const nodeDataArray = [
        { key: 1, text: "Start", fill: "#f68c06", stroke: "#4d90fe" },
        { key: 2, text: "Primary 1", fill: "#f68c06", stroke: "#4d90fe"},
        { key: 4, text: "Switch 1 Closed", fill: "#ccc", stroke: "#4d90fe"},
        { key: 5, text: "Switch 2 Closed", fill: "#f8f8f8", stroke: "#4d90fe"},
        { key: 3, text: "Primary 2", fill: "#f68c06", stroke: "#4d90fe"},
        { key: 6, text: "Switch 3 Closed", fill: "#ccc", stroke: "#4d90fe"},
        { key: 7, text: "Switch 4 Closed", fill: "#f8f8f8", stroke: "#4d90fe"},
        { key: 8, text: "Switch 5 Closed", fill: "#ccc", stroke: "#4d90fe"},
        { key: 9, text: "Switch 2 Closed", fill: "#f8f8f8", stroke: "#4d90fe"},
        { key: 10, text: "End", fill: "#ccc", stroke: "#4d90fe"},
        ];

    //Link set
    const linkDataArray = [ { "from": 1, "to": 2, "text": "Capacity"},
        { "from": 1, "to": 3, "text": "Capacity"},
        { "from": 2, "to": 4, "text": "Capacity",},
        { "from": 2, "to": 5, "text": "Capacity"},
        { "from": 3, "to": 6, "text": "Capacity" },
        { "from": 3, "to": 7, "text": "Capacity" },
        { "from": 3, "to": 8, "text": "Capacity" },
        ]
    return (
        <div className="container-fluid" style={{width: "100%",padding: 0}}>
            <h1 className="mt-4">Electric Map</h1>
            <GoJs nodes={nodeDataArray} links={linkDataArray}/>
        </div>
    )
}
export default map
