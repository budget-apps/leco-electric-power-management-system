import React from 'react'
const firebase = require("firebase");

class selectMap extends React.Component {

    render(){
        return (
            <div>
                <select class="browser-default custom-select btn-primary" style={{marginTop: "10px",marginBottom: "5px"}} onChange={this.props.changed}>
                  <option selected> Select branch</option>
                  <option value="Negambo">Negambo</option>
                </select>
            </div>
        )
    }
}

export default selectMap
