import React, {Component} from 'react'
import MiniGoJsSuccess from "../GoJs/MiniGoJsSuccess";

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

    generateComponent(){
        let componentRow = []
        for(let i=0;i<this.state.nodeDataArray.length;i++){
            componentRow.push(
                <div key={i} style={{marginBottom: "5px",display: "flex"}} className="row align-items-center">
                    <div className="col-md-10">
                        <MiniGoJsSuccess nodes={this.state.nodeDataArray[i]} links={this.state.linkDataArray[i]}/>
                    </div>
                    <div className="col-md-1">
                        <button style={{width:"100%"}} style={{borderRadius: "40px"}} className="btn btn-primary">Apply</button>
                    </div>
                    <div className="col-md-1">
                        <button style={{width:"100%"}} style={{borderRadius: "40px"}} className="btn btn-danger">Reset</button>
                    </div>
                </div>)
        }
        this.setState({
            componentRow: componentRow
        })
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
            <div className="bg-default" style={{margin: "0 0 5px 0", borderRadius: "10px"}}>
                {
                    (this.state.showPath)
                        ? <div>
                            <div className="row">
                                <div className="col-md-9"> <h2 className="btn-default" style={{padding: "9px",borderRadius: "10px",marginBottom: "0"}}>Reconfiguration</h2></div>
                                <div className="col-md-3">
                                    <input
                                        className="btn btn-primary"
                                        type="submit"
                                        value="Find Recovery Paths"
                                        style={{padding: "9px",width: "90%"}}
                                        onClick={this.recoveryClickHandler}
                                    />
                                </div>

                            </div>

                            <div style={{padding: "10px"}}>
                                {this.state.componentRow}
                            </div>
                        </div>
                        : <div className="row">
                            <div className="col-md-9"> <h2 className="btn-default" style={{padding: "9px",borderRadius: "10px",marginBottom: "0"}}>Reconfiguration</h2></div>
                            <div className="col-md-3">
                                <input
                                className="btn btn-primary"
                                type="submit"
                                value="Find Recovery Paths"
                                style={{padding: "9px",width: "90%"}}
                                onClick={this.recoveryClickHandler}
                            />
                            </div>

                        </div>
                }
            </div>
        )
    }
}
export default path
