import React from 'react'
const firebase = require("firebase");

class selectMap extends React.Component {
    state = {
        data: null,
    }
    onchangeDropdown(e){
        firebase.database().ref().child('electricMap').orderByChild('1/branch').equalTo(e.target.value)
        .once('value')
        .then((snapshot) => {
            const key = snapshot.key;
            const val = snapshot.val();
            console.log(val);
            this.setState(
                {
                    data: val,
                }
            )
        })
        .catch((e) => {
            console.log('Error fetching data', e);
        });
    }
    render(){
        return (
            <div>
                <select class="browser-default custom-select btn-primary" style={{margin: "10px",padding: "5px"}} onChange={this.onchangeDropdown}>
                  <option selected> Select branch</option>
                  <option value="Negambo">Negambo</option>
                  <option value="2"></option>
                  <option value="3"></option>
                </select>
                <input style={{display: "none"}} value={this.state.data}/>
            </div>
        )
    }
}

export default selectMap
