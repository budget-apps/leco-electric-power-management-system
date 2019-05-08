import React, {Component} from 'react'
import MiniGoJs from "../GoJs/MiniGoJs";

class faultEdge extends Component{

    state = {
        hasFaults: false,
    }

    faultSwitchInputHandler = () => {
        try{
            this.setState({
                hasFaults: true
            })
        }catch (e) {
            console.log("error: "+e)
            alert("No faults detected")
        }


    }

    render() {
        return (
            <div className="bg-default" style={{margin: "0 0 5px 0", borderRadius: "10px"}}>
                {
                    (this.state.hasFaults)
                        ? <div>
                             <MiniGoJs nodes={this.props.nodeDataArray} links={this.props.linkDataArray}/>
                             <button className="btn btn-danger btn-sm"><i className="fa fa-ban"></i> Disconnect</button>
                             <button
                                className="btn btn-primary"
                                type="submit"
                                value="Find faults"
                                style={{padding: "9px",width: "90%"}}
                                onClick={this.faultSwitchInputHandler}
                             ><i className="fa fa-search"></i> Search faults</button>
                        </div>
                        : <div>
                            <button
                                className="btn btn-primary"
                                type="submit"
                                value="Find faults"
                                style={{padding: "9px",width: "90%"}}
                                onClick={this.faultSwitchInputHandler}
                            ><i className="fa fa-search"></i> Search faults</button>
                    </div>
                }
            </div>
        )
    }
}
export default faultEdge
