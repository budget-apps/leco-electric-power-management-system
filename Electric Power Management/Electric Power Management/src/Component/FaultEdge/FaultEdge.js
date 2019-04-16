import React, {Component} from 'react'
import Map from "../Map/Map";
import GoJs from "../GoJs/GoJs";

class faultEdge extends Component{

    state = {
        faultSwitch: "",
        hasFaults: false,
        nodeDataArray: [
            { key: 5, text: "248\nSwitch\nClosed","loc": "-200 0"},
            { key: 6, text: "249\nSwitch\nClosed"}
        ],
        linkDataArray: [
            { "from": 5, "to": 6, "text": "Capacity" }
        ],
    }



    refreshHandler = () => {
        this.setState(
            {
                hasFaults: false
            }
        )
    }

    faultSwitchInputHandler = () => {
        console.log(this.state.faultSwitch);

        this.setState(
            {
                hasFaults: true,
            }
        )
        const graph = this.props.graph;

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
            <div className="container-fluid btn-danger" style={{margin: "22px 5px 10px 0", borderRadius: "10px"}}>
                {
                    (this.state.hasFaults)
                        ? <div>
                            <button style={{float: "right",padding: "2px 5px 2px 5px"}} onClick={this.refreshHandler} className="btn btn-danger">x</button>
                            <GoJs nodes={this.state.nodeDataArray} links={this.state.linkDataArray}/>

                        </div>
                        : <div>
                            <input
                                type="text"
                                className="form-control"
                                style={{padding: "5px", margin: "10px", display: "inline", width: "60%"}}
                                placeholder="Enter fault switch id"
                                value={this.state.faultSwitch}
                                onChange={(event) => this.faultSwitchInputChangeHandler(event)}
                            />
                            <input
                            className="btn btn-primary"
                            type="submit"
                            value="Find"
                            style={{padding: "9px"}}
                            onClick={this.faultSwitchInputHandler}
                            />
                    </div>
                }
            </div>
        )
    }
}
export default faultEdge
