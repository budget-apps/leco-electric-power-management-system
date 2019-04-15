import React from 'react'
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
var firebase = require("firebase");

class selectMap extends React.Component {

    onchangeDropdown(){
        firebase.database().ref().child('electricMap')
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
  <option value="1">Negambo</option>
  <option value="2"></option>
  <option value="3"></option>
</select>
    )
}
}

export default selectMap
