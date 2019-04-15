import React from 'react'
import * as excel from 'xlsx';
import {  MDBBtn } from 'mdbreact';
var firebase = require("firebase");


class  AddExelSheet extends React.Component{
    constructor(){
        super()
    this.state={
        arr:{}
    }
    this.uploadfile = this.uploadfile.bind(this)
}

    uploadfile(event){
        let file =event.target.files[0]
        var reader = new FileReader();
        reader.readAsArrayBuffer(file)
        reader.onload=(e)=>{
          var data = new Uint8Array(reader.result);
          var wb = excel.read(data,{type:'array'});
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data1 = excel.utils.sheet_to_json(ws);      
        
          this.setState({arr : data1})
          
        }
    }

    submitFile=()=>{
        firebase.database().ref('electricMap').push(this.state.arr,(err,doc)=>{
            if(!err){
                alert("success")
            }
        })
    }
    render(){
    return (
        <div>
            <input className="btn btn-primary" type="file" onChange={this.uploadfile} style={{"padding":"10px",width: "100%"}} />
            <MDBBtn className="btn btn-primary" type="submit" size="sm" onClick={this.submitFile}>Submit</MDBBtn>
            </div>
    )
}
}

export default AddExelSheet
