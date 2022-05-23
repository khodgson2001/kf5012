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
                        <h3>{ cut.name }</h3>
                        <p>{ cut.description }</p>
                        <p>Cut ID: { cut.cutID }</p>
                        <p>Length: { cut.hairLength }</p>
                        <p>Time: { cut.duration } minutes</p>
                        <p>Cost: £{ cut.cost }</p>
                        <p>Currently available: { cut.available }</p>
                    </div>
                </div>
            ))}
            <div className="editCutForm">
                <h2>Change cut values here: </h2>
                <div className="editCutFormOuter">
                    <p>Start by identifying the cut ID from the list above. Then change the details of the cut as you would like.</p>
                <form action = "http://localhost:9999/manageCut" method = "POST">
                    <div className="editCutFormInner">
                        <label htmlFor = "cutID">ID of cut: </label>
                        <input type = "number" name = "cutID" id = "cutID" required></input>
                    </div>
                    <div className="editCutFormInner">
                        <label htmlFor = "cutName">Name of cut: </label>
                        <input type = "text" name = "cutName" id = "cutName" maxLength = "44" required></input>
                    </div>
                    <div className="editCutFormInner">
                        <label htmlFor = "cutLength">Length of cut: </label>
                        <input type = "text" name = "cutLength" id = "cutLength" maxLength = "44" required></input>
                    </div>
                    <div className="editCutFormInner">
                        <label htmlFor = "cutDuration">Duration of cut: </label>
                        <input type = "number" name = "cutDuration" id = "cutDuration" step='15' max = '120' required></input>
                    </div>
                    <div className="editCutFormInner">
                        <label htmlFor = "cutCost">Cost of cut: </label>
                        <input type = "number" name = "cutCost" id = "cutCost" max = '30' required></input>
                    </div>
                    <div className="editCutFormInner">
                        <label htmlFor = "cutAvailable">Availability of cut: </label>
                        <input type = "number" name = "cutAvailable" id = "cutAvailable" min = '0' max = '1' required></input>
                    </div>
                    <div className="editCutFormInner">
                        <input type = "submit" value = "Submit" id = "submit"></input>
                    </div>
                </form>
                <a href = "http://localhost:9999/addCut">
                    <button>Add blank cut</button>
                </a>
                </div>
            </div>
        </div>
    );
}

export default ManageCuts;