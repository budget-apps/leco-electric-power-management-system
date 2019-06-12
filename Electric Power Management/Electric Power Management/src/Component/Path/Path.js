import React, {Component} from 'react'
import MiniGoJsSuccess from "../GoJs/MiniGoJsSuccess";
import Swal from "sweetalert2";

class path extends Component{

    constructor(props){
        super(props)
        this.state = {
            showPath: false,
            nodeDataArray: this.props.nodeDataArray,
            linkDataArray: this.props.linkDataArray,
            componentRow: []
        }
    }

    applyButtonClickEventHandler = () =>{
        Swal.fire({
            title: 'Are you sure to apply new changes?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, apply it!'
        })
    }

    closeButtonClickEventHandler = () =>{
        Swal.fire({
            title: 'Do you want to reset the paths?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, reset it!'
        })
    }


    generateComponent(){
        let componentRow = []
        //console.log(this.state.nodeDataArray)
        //console.log(this.state.linkDataArray)
        for(let i=0;i<this.state.nodeDataArray.length;i++){
            componentRow.push(
                <div key={i} style={{marginBottom: "5px",display: "flex"}} className="row align-items-center">
                    <div className="col-md-12">
                        <MiniGoJsSuccess nodes={this.state.nodeDataArray[i]} links={this.state.linkDataArray[i]}/>
                    </div>
                    {/*<div className="col-md-1">*/}
                        {/*<button onClick={this.applyButtonClickEventHandler} style={{width:"100%"}} className="btn btn-primary">Apply</button>*/}
                    {/*</div>*/}
                    {/*<div className="col-md-1">*/}
                        {/*<button onClick={this.closeButtonClickEventHandler} style={{width:"100%"}} className="btn btn-danger">Revert</button>*/}
                    {/*</div>*/}
                </div>)
        }
        this.setState({
            componentRow: componentRow
        })
        //console.log(this.state.componentRow)
    }

    recoveryClickHandler = () => {
        try{
            this.generateComponent()
            this.setState({
                showPath: true,
            })
            console.log(this.props)
        }catch (e) {
            console.log("error: "+e)
            alert("No recovery paths detected")
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            nodeDataArray: nextProps.nodeDataArray,
            linkDataArray: nextProps.linkDataArray
        })
    }

    render() {
        return (
            <div style={{margin: "0 0 5px 0", borderRadius: "20px",border:"solid grey 2px"}}>
                {
                    (this.state.showPath)
                        ? <div>
                            <div className="row" >
                                <div className="col-md-9"> <h2 style={{padding: "9px",borderRadius: "10px",marginBottom: "0"}}>Reconfiguration</h2></div>
                                <div className="col-md-3">
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                        value="Find Recovery Paths"
                                        style={{padding: "9px",width: "90%"}}
                                        onClick={this.recoveryClickHandler}
                                    ><i className="fa fa-search"></i> Search recovery</button>
                                </div>

                            </div>

                            <div style={{padding: "10px"}}>
                                {this.state.componentRow}
                            </div>
                        </div>
                        : <div className="row" >
                            <div className="col-md-9"> <h2 style={{padding: "9px",borderRadius: "10px",marginBottom: "0"}}>Reconfiguration</h2></div>
                            <div className="col-md-3">
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                    value="Find Recovery Paths"
                                    style={{padding: "9px",width: "90%"}}
                                    onClick={this.recoveryClickHandler}
                                ><i className="fa fa-search"></i> Search recovery</button>
                            </div>

                        </div>
                }
            </div>
        )
    }
}
export default path
