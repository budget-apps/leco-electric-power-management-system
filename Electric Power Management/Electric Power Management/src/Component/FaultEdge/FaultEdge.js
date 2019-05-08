import React, {Component} from 'react'
import MiniGoJs from "../GoJs/MiniGoJs";
import Swal from "sweetalert2";

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

    disconnectEventHandler = () =>{
        Swal.fire({
            title: 'Are you sure to disconnect the fault edge?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, disconnect it!'
        })
    }

    render() {
        return (
            <div className="bg-default" style={{margin: "0 0 5px 0", borderRadius: "10px"}}>
                {
                    (this.state.hasFaults)
                        ? <div>
                             <MiniGoJs nodes={this.props.nodeDataArray} links={this.props.linkDataArray}/>
                             <button onClick={this.disconnectEventHandler} className="btn btn-danger btn-sm"><i className="fa fa-ban"></i> Disconnect</button>
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
