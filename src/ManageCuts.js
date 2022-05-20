import React from "react";
import {useEffect, useState} from "react";


function ManageCuts() {

    const [cuts, setCuts] = useState(null);

    useEffect(() => {
        fetch('http://localhost:9999/cuts')
            .then(res => {
               return res.json();
            })
            .then(data => {
                setCuts(data);
            });
    }, []);

    return(
        <div className="manageCuts">
            <h2>Manage Cuts</h2>
            {cuts && cuts.map((cut) => (
                <div className='outShell' key={cut.cutID}>
                    <div className='inShell'>
                        <h2>{ cut.name }</h2>
                        <p>{ cut.description }</p>
                        <p>Cut ID: { cut.cutID }</p>
                        <p><b>Length:</b> { cut.hairLength }</p>
                        <p><b>Time:</b> { cut.duration } minutes</p>
                        <p><b>Cost:</b> £{ cut.cost }</p>
                        <p><b>Currently available:</b> { cut.available }</p>
                    </div>
                </div>
            ))}
            <div className="editCutForm">
                <h2>Edit cuts</h2>
                <form action = "" method = "POST">
                    <label htmlFor = "cutID">ID of cut: </label>
                    <input type = "text" name = "cutID" id = "cutID"></input>
                </form>
            </div>
        </div>
    );
}

export default ManageCuts;