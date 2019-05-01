import React, {Component} from 'react'
import MiniGoJs from "../GoJs/MiniGoJs";

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
            componentRow.push(<div style={{marginBottom: "5px"}}><MiniGoJs nodes={this.state.nodeDataArray[i]} links={this.state.linkDataArray[i]}/></div>)
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
                            <input
                                className="btn btn-primary"
                                type="submit"
                                value="Find Recovery Paths"
                                style={{padding: "9px",width: "90%"}}
                                onClick={this.recoveryClickHandler}
                            />
                            <div style={{padding: "10px"}}>
                                {this.state.componentRow}
                            </div>
                        </div>
                        : <div>
                            <input
                                className="btn btn-primary"
                                type="submit"
                                value="Find Recovery Paths"
                                style={{padding: "9px",width: "90%"}}
                                onClick={this.recoveryClickHandler}
                            />
                        </div>
                }
            </div>
        )
    }
}
export default path
