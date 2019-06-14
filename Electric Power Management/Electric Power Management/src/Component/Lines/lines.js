import React, { Component } from 'react'
import './Lines.css'
import SelectMap from '../Button/SelectMap'
import Swal from "sweetalert2";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Header from '../Header/Header'
import SideMenu from '../SideMenu/SideMenu'
var firebase = require("firebase");



export default class Lines extends Component
{

    constructor(props) {
        super(props)
        this.state = {
            electricMap: [],
            row: {},
            id: '',
            type: '',
            adjecent: '',
            switchType: '',
            faultCurrent: '',
            currentPower: 0,
            capacity: 0,
            index: '',
            branch: '',
            isTripped: ''

        }
        this.onchangetableField = this.onchangetableField.bind(this)

    }
    handleClose = (element) => {
        this.setState({ show: false });
    }

    handleShow = (element) => {
        this.setState({
            show: true,
            row: element,
            id: element.id,
            type: element.type,
            adjecent: element.adjecent,
            switchType: element.switchType,
            faultCurrent: element.faultCurrent.toString(),
            currentPower: element.currentPower,
            capacity: element.capacity,
            branch: element.branch,
            isTripped: element.isTripped.toString()


        });

    }
    deleteitem = (id) => {
        var arr = []
        this.state.electricMap.forEach(element => {
            if (!(element.id === id)) {
                arr.push(element)
            }
        });

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                firebase.database().ref().child('electricMap').set({ electricmap: arr }, (err, doc) => {
                    if (!err) {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        firebase.database().ref().child('electricMap').orderByChild('1/branch').equalTo(this.state.branch).once('value')
                            .then((snapshot) => {
                                //console.log(snapshot.val().electricmap)
                                this.setState({ electricMap: snapshot.val().electricmap })

                            })
                            .catch(err => {
                                Swal.fire({
                                    type: 'error',
                                    title: 'Oops...',
                                    text: 'Something went wrong!',

                                })
                            })
                    }
                })
            }
        })
    }

    onchangedropdown = (e) => {
        this.setState({
            branch: e.target.value
        })
        firebase.database().ref().child('electricMap').orderByChild('1/branch').equalTo(e.target.value)
            .once('value')

            .then((snapshot) => {
                //console.log(snapshot.val().electricmap)
                this.setState({ electricMap: snapshot.val().electricmap })
            })
            .catch(
                err => {
                    Swal.fire('Please select a branch')
                }
            )


    }
    onchangetableField = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    updateMap = () => {
        //var i = 0;
        //var g
        var array = []
        const row = {
            id: this.state.id,
            type: this.state.type,
            adjecent: this.state.adjecent,
            switchType: this.state.switchType,
            faultCurrent: (this.state.faultCurrent == "true"),
            currentPower: Number(this.state.currentPower),
            capacity: Number(this.state.capacity),
            branch: this.state.branch,
            isTripped: (this.state.isTripped == "true")
        }
        this.state.electricMap.forEach(element => {

            if (element.id === this.state.id) {
                array.push(row)
            }
            else {
                array.push(element)
            }


        });
        //console.log(array)

        firebase.database().ref().child('electricMap').set({ electricmap: array }, (err, doc) => {
            if (!err) {
                Swal.fire("Update the Database!!!")
                firebase.database().ref().child('electricMap').orderByChild('1/branch').equalTo(this.state.branch).once('value')
                    .then((snapshot) => {
                        this.setState({ electricMap: snapshot.val().electricmap })

                    })
            }
        })

    }

    render() {
        // console.log(this.state)

        return (
            <div className="d-flex" id="wrapper">
                <SideMenu  changevalue={this.showmap} hidemap={this.hidemap}/>
                <div id="page-content-wrapper" style={{padding: "0"}}>
                    <Header/>
                    <div className="container-fluid">
                        <div>
                            <div className="row btn-primary">
                                <h2 className="btn warning" style={{ padding: "5px" }}>Lines Table</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                            </div>
                            <div className="col-md-3">
                            </div>
                            <div className="col-md-3">

                            </div>
                            <div className="col-md-3">
                                <SelectMap changed={this.onchangedropdown} />
                            </div>
                        </div>

                        <div className="container-fluid row" style={{width: "100%",padding: "20px",borderRadius: "20px",marginBottom: "5px",marginLeft: "2px",border:"solid grey 2px"}}>
                            <table className="table table-hover">
                                <thead>
                                <tr>
                                    <th className="btn-light">Switch ID</th>
                                    <th className="btn-light">Connected Switch ID</th>
                                    <th className="btn-light">Current power</th>
                                    <th className="btn-light">Line length</th>
                                    <th className="btn-light">Conductivity</th>
                                    <th style={{width: "10%"}} className="btn-light">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.electricMap.map(element =>
                                    <tr   className={element.currentPower===0 && element.switchType!=="Open"?"bg-warning":""}>
                                        <td name="id" value={element.id}>{element.id}</td>
                                        <td name="adjecent" value={element.adjecent} >{element.adjecent}</td>
                                        <td name="adjecent" value={element.adjecent} >{element.adjecent}</td>
                                        <td name="adjecent" value={element.adjecent} >{element.adjecent}</td>
                                        <td name="adjecent" value={element.adjecent} >{element.adjecent}</td>
                                        <td ><button onClick={() => this.handleShow(element)} className="btn btn-default btn-sm"><i className="fa fa-arrow-up"></i></button><button onClick={() => this.deleteitem(element.id)} className="btn btn-danger btn-sm"><i className="fa fa-trash"></i></button></td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                            <Modal show={this.state.show} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Change node details </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                    <Form>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Switch Id</Form.Label>
                                            <Form.Control readOnly name="id" onChange={this.onchangetableField} value={this.state.id} type="text" />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Connected Switch ID</Form.Label>
                                            <Form.Control value={this.state.adjecent} name="adjecent" onChange={this.onchangetableField} type="text" />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Current power</Form.Label>
                                            <Form.Control value={this.state.adjecent} name="adjecent" onChange={this.onchangetableField} type="text" />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Line length</Form.Label>
                                            <Form.Control value={this.state.adjecent} name="adjecent" onChange={this.onchangetableField} type="text" />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Conductivity</Form.Label>
                                            <Form.Control value={this.state.adjecent} name="adjecent" onChange={this.onchangetableField} type="text" />
                                        </Form.Group>
                                    </Form>

                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={this.updateMap}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
