import React, {Component} from 'react'
import GoJs from "../GoJs/GoJs";

class path extends Component{

    state = {
        faultSwitch: this.props.faultSwitch,
        graph: this.props.graph,
        showPath: false,
        paths: [],
        faultEdges: [],
        nodeDataArray: [
            { key: 5, text: "248\nSwitch\nClosed","loc": "-200 0"},
            { key: 6, text: "249\nSwitch\nClosed"}
        ],
        linkDataArray: [
            { "from": 5, "to": 6, "text": "Capacity" }
        ],
    }

    findPaths(){
        let faultEdges = this.props.graph.findFaultEdge(this.props.faultSwitch)
        let from = this.props.graph.getVertex(this.props.faultSwitch)
        let to = faultEdges[1]
        let paths = this.props.graph.findPaths(from,to)
        this.setState({
            faultEdges: faultEdges,
            paths: paths,
            showPath: true
        })
        console.log("Paths: "+paths)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.faultSwitch!==this.props.faultSwitch){
            console.log("Recovery path component updating...")
            this.setState({
                faultSwitch: this.props.faultSwitch,
                graph: this.props.graph,

            })
        }
    }

    recoveryClickHandler = () => {
        try{
            this.findPaths()
        }catch (e) {
            console.log("error: "+e)
            alert("No recovery paths detected")
        }


    }

    render() {
        return (
            <div className="bg-default" style={{margin: "0 0 5px 0", borderRadius: "10px"}}>
                {
                    (this.state.showPath)
                        ? <div>
                            {/*<GoJs nodes={this.state.nodeDataArray} links={this.state.linkDataArray}/>*/}
                            <input
                                className="btn btn-primary"
                                type="submit"
                                value="Find Recovery Path"
                                style={{padding: "9px",width: "90%"}}
                                onClick={this.recoveryClickHandler}
                            />
                            <p>{this.state.paths.length!==0?this.state.paths:"No paths"}</p>
                        </div>
                        : <div>

                            <input
                                className="btn btn-primary"
                                type="submit"
                                value="Find Recovery Path"
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
