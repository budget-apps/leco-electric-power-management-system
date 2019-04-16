import React from 'react'
const firebase = require("firebase");

class selectMap extends React.Component {
    state = {
        data: null,
    }

    render(){
        return (
            <div>
                <select class="browser-default custom-select btn-primary" style={{margin: "10px",padding: "5px"}} onChange={this.props.changed}>
                  <option selected> Select branch</option>
                  <option value="Negambo">Negambo</option>
                  <option value="2"></option>
                  <option value="3"></option>
                </select>
            </div>
        )
    }
}

export default selectMap
