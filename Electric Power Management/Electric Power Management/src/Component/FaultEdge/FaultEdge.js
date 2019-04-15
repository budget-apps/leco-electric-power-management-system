import React from 'react'

const faultEdge = (props) => {
    return (
        <div className="container-fluid btn-danger" style={{margin: "22px",borderRadius: "10px"}}>
            {props.changed?
                <h2 style={{padding: "5px"}}>No faults detected!!!</h2>
                :
                <h2 style={{padding: "5px"}}>Faults detected!!!</h2>
            }

        </div>
    )
}
export default faultEdge
