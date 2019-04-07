import React from 'react'
import GoJs from "../GoJs/GoJs";
import SelectMap from "../Button/SelectMap";

const Graph = require('../Graph/Graph')
const Node = require('../Node/Node')

const map = () => {
    var nodeDataArray = [
        { key: 1, text: "Start", fill: "#f68c06", stroke: "#4d90fe" },
        { key: 2, text: "Primary", fill: "#f68c06", stroke: "#4d90fe", parent: 1 },
        { key: 3, text: "Primary", fill: "#f68c06", stroke: "#4d90fe", parent: 1 },
        { key: 4, text: "Switch Closed", fill: "#ccc", stroke: "#4d90fe", parent: 2 },
        { key: 5, text: "Switch Closed", fill: "#f8f8f8", stroke: "#4d90fe", parent: 2 },
        { key: 6, text: "End", fill: "#ccc", stroke: "#4d90fe", parent: 3 },
        { key: 7, text: "End", fill: "#ccc", stroke: "#4d90fe", parent: 4 }
        ]
    return (
        <div className="container-fluid" style={{width: "100%",padding: 0}}>
            <h1 className="mt-4">Electric Map</h1>
            <GoJs data={nodeDataArray}/>
        </div>
    )
}
export default map
