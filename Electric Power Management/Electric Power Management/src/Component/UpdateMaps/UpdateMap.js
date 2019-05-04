import React, {Component} from 'react'
import './UpdateMaps.css'
import SelectMap from '../Button/SelectMap'

export default class UpdateComponent extends Component{
    render() {
        return (
            <div>
                <div>
                    <div className="row btn-info">
                        <h2 className="" style={{padding: "5px"}}>Maps</h2>
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
                        <SelectMap/>
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
                        <tr>
                            <td contentEditable={true}>July</td>
                            <td contentEditable={true}>Dooley</td>
                            <td contentEditable={true}>july@example.com</td>
                            <td contentEditable={true}>July</td>
                            <td contentEditable={true}>Dooley</td>
                            <td contentEditable={true}>july@example.com</td>
                            <td contentEditable={true}>July</td>
                            <td contentEditable={true}>Dooley</td>
                            <td contentEditable={true}>july@example.com</td>
                            <td contentEditable={true}><button className="btn btn-default btn-sm"><i className="fa fa-arrow-up"></i></button><button className="btn btn-danger btn-sm"><i className="fa fa-trash"></i></button></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
