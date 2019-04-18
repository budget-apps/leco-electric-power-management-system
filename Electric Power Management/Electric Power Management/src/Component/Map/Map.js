import React, {Component} from 'react'
import GoJs from "../GoJs/GoJs";

class map extends Component{
    render(){
        return (
            <div className="" style={{width: "100%",padding: 0,borderRadius: "10px"}}>
                <h2 className="btn-default" style={{padding: "10px",borderRadius: "10px"}}>{this.props.branch} Branch</h2>
                <GoJs nodes={this.props.dataNodes} links={this.props.dataLinks}/>
            </div>
        )
    }

}
export default map
