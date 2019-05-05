import React from 'react';
import {Link} from "react-router-dom";
import * as routes from "../../constants/routes";
import { MDBIcon } from "mdbreact";
import {ToastContainer, toast } from 'mdbreact';

const firebase =require('firebase')

class  header extends  React.Component {
    constructor(props){
        super(props)
        //console.log(props)
        this.state={
            changed :0

        }

    }
    notify=()=>{
        if(this.state.changed===1){
        toast.info('Database Chaged', {
            autoClose: 5000
            
          },this.setState({changed:0})
          );
        }
        else{
            toast.info('No Messages', {
                autoClose: 5000
            })
        }

    }
    render(){
        firebase.database().ref().child('electricMap').on('child_changed',snapshot=>{
            //console.log(snapshot.val())
            this.setState({changed:1})
            
          })

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">

            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <Link className="nav-link" to={routes.HOME_PATH}><MDBIcon icon="home" /></Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link dropdown-toggle" id="navbar-dropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                           <span 
                            className="badge badge-info">{this.state.changed}</span>
                            <MDBIcon onClick={this.notify} icon="bell" className="pr-3" />
                        </a>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link"  to={routes.SIGN_OUT_PATH}>Log Out</Link>
                    </li>
                </ul>
                <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          autoClose={5000}
        />
            </div>
        </nav>
    )
    }
};

export default header;
