import React from 'react';
import {Link} from "react-router-dom";
import * as routes from "../../constants/routes";

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
                    <li className="nav-item">
                        <a className="nav-link" href="#">Log Out</a>
                    </li>
                    {/*<li className="nav-item dropdown">*/}
                        {/*<a className="nav-link dropdown-toggle" href="#" id="navbar-dropdown" role="button"*/}
                           {/*data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">*/}
                            {/*Dropdown*/}
                        {/*</a>*/}
                        {/*<div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbar-dropdown">*/}
                            {/*<a className="dropdown-item" href="#">Action</a>*/}
                            {/*<a className="dropdown-item" href="#">Another action</a>*/}
                            {/*<div className="dropdown-divider"></div>*/}
                            {/*<a className="dropdown-item" href="#">Something else here</a>*/}
                        {/*</div>*/}
                    {/*</li>*/}
                </ul>
            </div>
        </nav>
    )
};

export default header;
