import React, {Component} from 'react'
import Graph from '../Graph/Graph'
import GoJs from "../GoJs/GoJs";

class path extends Component{

    state = {
        showPath: false,
    }

    recoveryClickHandler = () => {
        try{
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
        if(this.props.path!==nextProps.path){
            console.log(nextProps)
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
                            <p>{this.props.path}</p>
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
