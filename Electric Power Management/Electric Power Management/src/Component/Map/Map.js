import React, {Component} from 'react'
import GoJs from "../GoJs/GoJs";




class map extends Component{
    state = {
        nodeDataArray: this.props.dataNodes,
        linkDataArray: this.props.dataLinks,
    }

    getData(){
    }




    //graph.addVertertices([primary1,primary2,switch1,switch2,switch3,end])
    //graph.printGraph()
    //console.log(graph.getVertices())

    //console.log(graph.findAllAdjacent(start))
    //graph.findFaultEdge(247);
    //let faultEdge = graph.findFaultEdge(247);
    //console.log(faultEdge)
    //console.log(faultEdge[0].getNodeId()+", "+faultEdge[1].getNodeId());

    //Vertices set


    //Link set


    render(){
        return (
            <div className="container-fluid btn-success" style={{width: "100%",padding: 0,backgroundColor: "cyan",margin: "20px",borderRadius: "10px"}}>
                <h1 className="mt-4 btn-default" style={{padding: "10px"}}>Negambo Devision</h1>
                <GoJs nodes={this.state.nodeDataArray} links={this.state.linkDataArray}/>
            </div>
        )
    }

}
export default map
