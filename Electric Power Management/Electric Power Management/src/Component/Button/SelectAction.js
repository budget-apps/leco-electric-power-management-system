import React from 'react'

class selectAction extends React.Component {

    render(){
        return (
            <div>
                <select className="browser-default custom-select btn-primary btn-sm" style={{marginTop: "10px",marginBottom: "5px"}} onChange={this.props.changed}>
                    <option defaultValue={"No"}>Action</option>
                    <option value="faults">Find Faults</option>
                    <option value="recovery">Find Recovery Paths</option>
                </select>
            </div>
        )
    }
}

export default selectAction
