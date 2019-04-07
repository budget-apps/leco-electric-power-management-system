import React from 'react'

const selectMap = () => {
    return (
            <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Negambo Branch
                    <span className="caret"></span></button>
                <ul className="dropdown-menu">
                    <li><a href="#">HTML</a></li>
                    <li><a href="#">CSS</a></li>
                    <li><a href="#">JavaScript</a></li>
                </ul>
            </div>
    )
}

export default selectMap
