import React from 'react'
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
var firebase = require("firebase");

class selectMap extends React.Component {
    constructor(props){
        super(props)
        this.state={


        }
        
    }

    onchangeDropdown(e){
        firebase.database().ref().child('electricMap').orderByChild('1/branch').equalTo(e.target.value)
        .once('value')
    .then((snapshot) => {
        const key = snapshot.key;
        const val = snapshot.val();
        console.log(val);
    })
    .catch((e) => {
        console.log('Error fetching data', e);
    });

   
    }
    render(){
        
    return (
    <select class="browser-default custom-select" onChange={this.onchangeDropdown}>
  <option selected> select branch</option>
  <option value="Negambo">Negambo</option>
  <option value="2"></option>
  <option value="3"></option>
</select>
    )
}
}

export default selectMap
