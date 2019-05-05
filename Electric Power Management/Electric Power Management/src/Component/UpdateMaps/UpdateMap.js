import React, { Component } from 'react'
import './UpdateMaps.css'
import SelectMap from '../Button/SelectMap'
import Swal from "sweetalert2";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

var firebase = require("firebase");



export default class UpdateComponent extends Component {
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
            currentPower: '',
            capacity: '',
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
        this.setState({ id: element.id })
        this.setState({
            show: true,
            row: element,
            id: element.id,
            type: element.type,
            adjecent: element.adjecent,
            switchType: element.switchType,
            faultCurrent: element.faultCurrent,
            currentPower: element.currentPower,
            capacity: element.capacity,
            branch: element.branch,
            isTripped: element.isTripped


        });
        alert(element.id)
    }
    deleteitem = (id) => {
        var arr = []
        this.state.electricMap.forEach(element => {
            if (!(element.id == id)) {
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
                                console.log(snapshot.val().electricmap)
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
                console.log(snapshot.val().electricmap)
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
        console.log(e.target.name)
    }
    updateMap = () => {
        var i = 0;
        var g
        var array = []
        const row = {
            id: this.state.id,
            type: this.state.type,
            adjecent: this.state.adjecent,
            switchType: this.state.switchType,
            faultCurrent: this.state.faultCurrent == "true",
            currentPower: this.state.currentPower,
            capacity: this.state.capacity,
            branch: this.state.branch,
            isTripped: this.state.isTripped == "true"
        }
        this.state.electricMap.forEach(element => {
            if (element.id == this.state.id) {
                array.push(row)
            }
            else {
                array.push(element)
            }


        });
        console.log(array)

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
        console.log(this.state)

        return (
            <div>
                <div>
                    <div className="row btn-info">
                        <h2 className="" style={{ padding: "5px" }}>Maps</h2>
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

                <div className="row">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Adjacent</th>
                                <th>Type</th>
                                <th>Switch Type</th>
                                <th>Fault Current</th>
                                <th>Current Power</th>
                                <th>Capacity</th>
                                <th>Branch</th>
                                <th>Tipped Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.electricMap.map(element =>
                                <tr   >
                                    <td name="id" value={element.id}>{element.id}</td>
                                    <td name="adjecent" value={element.adjecent} >{element.adjecent}</td>
                                    <td name="type" value={element.type} >{element.type}</td>
                                    <td name="switchType" value={element.switchType} >{element.switchType}</td>
                                    <td name="faultCurrent" value={element.faultCurrent} >{element.faultCurrent.toString()}</td>
                                    <td name="currentPower" value={element.currentPower} >{element.currentPower}</td>
                                    <td name="capacity" value={element.capacity} >{element.capacity}</td>
                                    <td name="branch" value={element.branch} >{element.branch}</td>
                                    <td name="isTripped" value={element.isTripped} >{element.isTripped.toString()}</td>
                                    <td ><button onClick={() => this.handleShow(element)} className="btn btn-default btn-sm"><i className="fa fa-arrow-up"></i></button><button onClick={() => this.deleteitem(element.id)} className="btn btn-danger btn-sm"><i className="fa fa-trash"></i></button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Id</Form.Label>
                                    <Form.Control readOnly name="id" onChange={this.onchangetableField} value={this.state.id} type="text" />

                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>adjecent</Form.Label>
                                    <Form.Control value={this.state.adjecent} name="adjecent" onChange={this.onchangetableField} type="text" />

                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>switchType</Form.Label>
                                    <Form.Control value={this.state.switchType} name="switchType" onChange={this.onchangetableField} type="text" />

                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>faultCurrent</Form.Label>
                                    <Form.Control value={this.state.faultCurrent} name="faultCurrent" onChange={this.onchangetableField} type="text" />

                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>currentPower</Form.Label>
                                    <Form.Control value={this.state.currentPower} name="currentPower" onChange={this.onchangetableField} type="text" />

                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>capacity</Form.Label>
                                    <Form.Control value={this.state.capacity} name="capacity" onChange={this.onchangetableField} type="text" />

                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>branch</Form.Label>
                                    <Form.Control value={this.state.branch} name="branch" onChange={this.onchangetableField} type="text" />

                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>isTripped</Form.Label>
                                    <Form.Control value={this.state.isTripped} name="isTripped" onChange={this.onchangetableField} type="text" />

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
        );
    }
}
