import React, {Component} from 'react'

class path extends Component{
    state={
        faultSwitch: this.props.faultSwitch,
        graph: this.props.graph,
        faultEdge: [],
        paths: [],
        showPath: false,
    }

    findPath(){
        console.log(this.state.graph)
        let faultEdges = this.state.graph.findFaultEdge(this.state.faultSwitch)
        let from = this.state.graph.getVertex(this.state.faultSwitch)
        let to = faultEdges[1]
        let paths = this.state.graph.findPaths(from,to)
        this.setState({
            faultEdges: faultEdges,
            paths: paths
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.faultSwitch!==this.props.faultSwitch){
            console.log("Recovery path component updating...");
            this.setState({
                faultSwitch: this.props.faultSwitch,
                graph: this.props.graph,
            });
            console.log(this.state.faultSwitch)
        }
    }

    findRecoveryPathsInputHandler(){
       try{
           console.log(this.state.faultSwitch);
           this.findPath()
       }catch (e) {
           console.log(e)
       }
    }

    render() {
        return (
            <div className="bg-default" style={{borderRadius: "10px"}}>
                {this.state.showPath ?
                    <div>
                        {/*<GoJs nodes={this.state.nodeDataArray} links={this.state.linkDataArray}/>*/}
                        <p>{this.state.paths}</p>
                    </div>
                    :
                    <input
                        className="btn btn-primary"
                        type="submit"
                        value="Find Recovery Path"
                        style={{padding: "9px", width: "90%"}}
                        onClick={this.findRecoveryPathsInputHandler}
                    />
                }
            </div>
        )
    }


}
export default path
