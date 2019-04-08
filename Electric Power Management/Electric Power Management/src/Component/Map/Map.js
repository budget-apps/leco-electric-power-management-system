import React from 'react'
import GoJs from "../GoJs/GoJs";

const Graph = require('../Graph/Graph')
const Node = require('../Node/Node')

const map = () => {
    //Vertices set
    const nodeDataArray = [
        { key: 1, text: "Start", fill: "#f68c06", stroke: "#4d90fe" },
        { key: 2, text: "Primary", fill: "#f68c06", stroke: "#4d90fe"},
        { key: 3, text: "Primary", fill: "#f68c06", stroke: "#4d90fe"},
        { key: 4, text: "Switch Closed", fill: "#ccc", stroke: "#4d90fe"},
        { key: 5, text: "Switch Closed", fill: "#f8f8f8", stroke: "#4d90fe"},
        { key: 6, text: "End", fill: "#ccc", stroke: "#4d90fe"},
        { key: 7, text: "End", fill: "#ccc", stroke: "#4d90fe"}
        ];

    //Link set
    const linkDataArray = [ { "from": 1, "to": 2, "text": "up or timer", "curviness": -20 },
        { "from": 1, "to": 3, "text": "down", "curviness": 20 },
        { "from": 1, "to": 0, "text": "up (moved)\nPOST", "curviness": 20 },
        { "from": 1, "to": 1, "text": "down", "curviness": -20 },
        { "from": 1, "to": 2, "text": "up (no move)" }]
    return (
        <div className="container-fluid" style={{width: "100%",padding: 0}}>
            <h1 className="mt-4">Electric Map</h1>
            <GoJs nodes={nodeDataArray} links={linkDataArray}/>
        </div>
    )
}
export default map
