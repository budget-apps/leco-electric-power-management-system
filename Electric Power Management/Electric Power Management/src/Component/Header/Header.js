import React from 'react';
import {Link} from "react-router-dom";
import * as routes from "../../constants/routes";
import { MDBIcon } from "mdbreact";

const header = () => {
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
                        <Link className="nav-link" to={routes.HOME_PATH}>Home</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbar-dropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <MDBIcon icon="bell" className="pr-3" /><span
                            className="badge badge-light">4</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbar-dropdown">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link"  to={routes.SIGN_OUT_PATH}>Log Out</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
};

export default header;
