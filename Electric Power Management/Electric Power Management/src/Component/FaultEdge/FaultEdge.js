import React, {Component} from 'react'
import MiniGoJs from "../GoJs/MiniGoJs";
import Swal from "sweetalert2";

class faultEdge extends Component{

    state = {
        hasFaults: false,
        component: []
    }

    faultSwitchInputHandler = () => {
        try{
            //console.log(this.props.nodeDataArrayFault)
            this.generateComponents()
            this.setState({
                hasFaults: true
            })
        }catch (e) {
            console.log("error: "+e)
            alert("No faults detected")
        }


    }

    disconnectEventHandler = () => {
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

    generateComponents(){
        let component = []
        //console.log(this.props.linkDataArrayFault[1])
        for(let i=0;i<this.props.nodeDataArrayFault.length;i++){
            //console.log(this.props.nodeDataArrayFault[i])
            component.push(
                <div key={i+100}>
                    <MiniGoJs nodes={this.props.nodeDataArrayFault[i]} links={this.props.linkDataArrayFault[i]}/>
                    {/*<button onClick={this.disconnectEventHandler} style={{width: "90%"}} className="btn btn-danger btn-sm"><i className="fa fa-ban"></i> Disconnect</button>*/}
                </div>
            )
        }
        this.setState({
            component: component
        })
    }


    render() {
        return (
            <div style={{margin: "0 0 5px 0", borderRadius: "20px",border:"solid grey 2px"}}>
                {
                    (this.state.hasFaults && this.props.nodeDataArrayFault !==undefined)
                        ? <div>
                            {this.state.component}

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
