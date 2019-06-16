import React, { Component } from 'react'
import './Lines.css'
import SelectMap from '../Button/SelectMap'
import Swal from "sweetalert2";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Header from '../Header/Header'
import SideMenu from '../SideMenu/SideMenu'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import update from 'react-addons-update';
var firebase = require("firebase");



export default class Lines extends Component {

    constructor(props) {
        super(props)
        this.state = {
            electricMap: [],
            adjecent: [],
            row: {},
            id: '',
            type: '',
            switchType: '',
            faultCurrent: '',
            currentPower: 0,
            capacity: 0,
            index: '',
            branch: '',
            isTripped: '',
            currentSwitch: {
                index: '',
                id: '',
                adjecent: []
            }

        }
        this.onchangetableField = this.onchangetableField.bind(this)

    }
    handleClose = (element) => {
        this.setState({ show: false });
    }

    handleShow = (element) => {
        this.setState({
            show: true,
            currentSwitch: element


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
                var adjesents = []
                snapshot.val().electricmap.map((ele, index) => {
                    var adjesent = []

                    var arr = ((ele.adjecent.replace(/\[/g, '').replace(/]/g, '')).split(','))
                    var arr1 = []
                    var arr2 = []
                    var arr3 = []
                    var arr4 = []
                    var i = 0
                    while (i < arr.length) {
                        if (i % 4 == 0) {
                            arr1.push(arr[i])
                        }
                        if (i % 4 == 1) {
                            arr2.push(arr[i])
                        }
                        if (i % 4 == 2) {
                            arr3.push(arr[i])
                        }
                        if (i % 4 == 3) {
                            arr4.push(arr[i])
                        }
                        i++
                    }
                    adjesent.push(arr1)
                    adjesent.push(arr2)
                    adjesent.push(arr3)
                    adjesent.push(arr4)
                    var elem = {
                        id: ele.id,
                        index: index,
                        adjecent: adjesent

                    }
                    adjesents.push(elem)
                })
                this.setState({ adjecent: adjesents })
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
    onchangeFormfield = (e) => {
        //         (this.state.currentSwitch.id)
        // (e.target.name)
        // (e.target.id)
        // (e.target.value)
        var arr = [...this.state.currentSwitch.adjecent]
        arr[e.target.id][e.target.name] = e.target.value
        var element = {
            id: this.state.currentSwitch.id,
            index: this.state.currentSwitch.index,
            adjecent: arr
        }
        this.setState({ currentSwitch: element })
        var arry = []
        this.state.adjecent.map(ele => {
            if (ele.id == this.state.currentSwitch.id) {
                arry.push(element)
            }
            else {
                arry.push(ele)
            }
        })
        this.setState({ adjecent: arry })

        // this.setState(prevState => ({
        //     currentSwitch: {
        //         ...prevState.currentSwitch,
        //         [prevState.currentSwitch.adjecent]: arr,
        //     },
        // }));
        // this.setState(prevState => ({
        //     adjecent: {
        //         ...prevState.adjecent,
        //         [prevState.adjecent[this.state.currentSwitch.index].adjecent[this.state.currentSwitch.index]]: arr,
        //     },
        // }));

    }

    updateElecticMap = () => {
        var Electricmap = []
        this.state.electricMap.map((ele, index) => {


            var adjecent = ""
            var fullarray = []
            var arr1 = []
            var arr2 = []
            var arr3 = []
            var arr4 = []
            var arr5 = []
            var arr6 = []
            this.state.adjecent[index].adjecent.map(element => {
                if (element[0]) {
                    arr1.push(element[0])
                }

                if (element[1]) {

                    arr2.push(element[1])
                }

                if (element[2]) {
                    arr3.push(element[2])
                }

                if (element[3]) {
                    arr4.push(element[3])
                }
                if (element[4]) {
                    arr5.push(element[4])
                }
                if (element[5]) {
                    arr6.push(element[5])
                }
            })


            if (arr1.length > 0) {
                fullarray.push(arr1)
                adjecent = adjecent + "[" + arr1.toString() + "]"
            }

            if (arr2.length > 0) {
                fullarray.push(arr2)
                adjecent = adjecent + ",[" + arr2.toString() + "]"
            }

            if (arr3.length > 0) {
                fullarray.push(arr3)
                adjecent = adjecent + ",[" + arr3.toString() + "]"
            }

            if (arr4.length > 0) {
                fullarray.push(arr4)
                adjecent = adjecent + ",[" + arr4.toString() + "]"
            }

            const row = {
                id: ele.id,
                type: ele.type,
                adjecent: adjecent,
                switchType: ele.switchType,
                faultCurrent: ele.faultCurrent, //(this.state.faultCurrent == "true"),
                currentPower: ele.currentPower,//   Number(this.state.currentPower),
                capacity: ele.capacity,
                branch: ele.branch,
                isTripped: ele.isTripped                 //(this.state.isTripped == "true")
            }
            Electricmap.push(row)


        })

        firebase.database().ref().child('electricMap').set({ electricmap: Electricmap }, (err, doc) => {
            if (!err) {
                Swal.fire("Update the Database!!!")

            }
        })


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
        console.log(this.state)

        return (
            <div className="d-flex" id="wrapper">
                <SideMenu changevalue={this.showmap} hidemap={this.hidemap} />
                <div id="page-content-wrapper" style={{ padding: "0" }}>
                    <Header />
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

                        <div className="container-fluid row" style={{ width: "100%", padding: "20px", borderRadius: "20px", marginBottom: "5px", marginLeft: "2px", border: "solid grey 2px" }}>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th className="btn-light">Switch ID</th>
                                        <th className="btn-light">Connected Switch ID</th>
                                        <th className="btn-light">Line Current power</th>
                                        <th className="btn-light">Line length</th>
                                        <th className="btn-light">Line Conductivity</th>
                                        <th style={{ width: "10%" }} className="btn-light">Action</th>
                                    </tr>
                                </thead>
                                {this.state.adjecent.length > 0 ?

                                    <tbody>
                                        {this.state.adjecent.map((element, index) =>
                                            <tr className={element.currentPower === 0 && element.switchType !== "Open" ? "bg-warning" : ""}>
                                                <td name="id" value={element.id}>{element.id}</td>
                                                <td>{element.adjecent[0].map(ele =>
                                                    <div>{ele}</div>
                                                )}</td>
                                                <td>{element.adjecent[1].map(ele =>
                                                    <div>{ele}</div>
                                                )}</td>
                                                <td>{element.adjecent[2].map(ele =>
                                                    <div>{ele}</div>
                                                )}</td>
                                                <td>{element.adjecent[3].map(ele =>
                                                    <div>{ele}</div>
                                                )}</td>

                                                <td ><button onClick={() => this.handleShow(element, index)} className="btn btn-default btn-sm"><i className="fa fa-arrow-up"></i></button>
                                                    <button onClick={() => this.deleteitem(element.id)} className="btn btn-danger btn-sm"><i className="fa fa-trash"></i></button></td>
                                            </tr>
                                        )}

                                    </tbody>
                                    :
                                    <div></div>}
                            </table>
                            <Modal show={this.state.show} onHide={this.handleClose} dialogClassName="custom-dialog"
                                aria-labelledby="example-custom-modal-styling-title">
                                <Modal.Header closeButton>
                                    <Modal.Title id="example-custom-modal-styling-title">Change node details </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                    <Form>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Switch Id</Form.Label>
                                            <Form.Control readOnly name="id" onChange={this.onchangetableField} value={this.state.currentSwitch.id} type="text" />
                                        </Form.Group>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="0">
                                                    <Form.Label>Connected Switch ID</Form.Label>
                                                    {this.state.currentSwitch.adjecent.length > 0 ?
                                                        <div>
                                                            {this.state.currentSwitch.adjecent[0].map((ele, index) =>
                                                                <Form.Control value={ele} name={index} onChange={this.onchangeFormfield} type="text" style={{marginBottom: "2px"}} />
                                                            )}

                                                        </div>
                                                        :
                                                        <div></div>
                                                    }
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group controlId="1">
                                                    <Form.Label>Current Power</Form.Label>
                                                    {this.state.currentSwitch.adjecent.length > 0 ?
                                                        <div>
                                                            {this.state.currentSwitch.adjecent[1].map((ele, index) =>
                                                                <Form.Control value={ele} name={index} onChange={this.onchangeFormfield} type="text" style={{marginBottom: "2px"}}/>
                                                            )}

                                                        </div>
                                                        :
                                                        <div></div>
                                                    }
                                                </Form.Group>
                                            </Col>

                                            <Col>
                                                <Form.Group controlId="2">
                                                    <Form.Label>{" Line Length"}</Form.Label><br></br>

                                                    {this.state.currentSwitch.adjecent.length > 0 ?
                                                        <div>
                                                            <br />
                                                            {this.state.currentSwitch.adjecent[2].map((ele, index) =>
                                                                <Form.Control value={ele} name={index} onChange={this.onchangeFormfield} type="text" style={{marginBottom: "2px"}}/>
                                                            )}

                                                        </div>
                                                        :
                                                        <div></div>
                                                    }
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group controlId="3">
                                                    <Form.Label>Conductivity</Form.Label>
                                                    {"\n"}
                                                    {this.state.currentSwitch.adjecent.length > 0 ?

                                                        <div>
                                                            <br />
                                                            {this.state.currentSwitch.adjecent[3].map((ele, index) =>
                                                                <Form.Control value={ele} name={index} onChange={this.onchangeFormfield} type="text" style={{marginBottom: "2px"}}/>


                                                            )
                                                            }


                                                        </div>
                                                        :
                                                        <div></div>
                                                    }
                                                </Form.Group>
                                            </Col>
                                        </Row>


                                    </Form>

                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={this.updateElecticMap}>
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
