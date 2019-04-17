import React, {Component} from 'react'
import GoJs from "../GoJs/GoJs";

class map extends Component{
    render(){
        return (
            <div className="container-fluid btn-success" style={{width: "100%",padding: 0,backgroundColor: "cyan",margin: "20px",borderRadius: "10px"}}>
                <h1 className="mt-4 btn-default" style={{padding: "10px"}}>Negambo Devision</h1>
                <GoJs nodes={this.props.dataNodes} links={this.props.dataLinks}/>
            </div>
        )
    }

}
export default map
