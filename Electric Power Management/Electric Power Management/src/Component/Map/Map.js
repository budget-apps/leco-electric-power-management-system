import React, {Component} from 'react'
import GoJs from "../GoJs/GoJs";

class map extends Component{
    render(){
        return (
            <div className="" style={{width: "100%",padding: 0,borderRadius: "20px",marginBottom: "5px",border:"solid grey 2px"}}>
                <h2 style={{padding: "10px",borderRadius: "10px"}}>{this.props.branch}</h2>
                {this.props.isTipped!==""?
                    <div className="alert alert-danger alert-dismissible">
                        <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                        <strong>Warning!</strong> Indicates a dangerous or potentially negative action at switch ID: {this.props.isTipped} in {this.props.branch} electric grid.
                    </div>
                   :
                    <div></div>
                }
                <GoJs nodes={this.props.dataNodes} links={this.props.dataLinks}/>
            </div>
        )
    }

}
export default map
