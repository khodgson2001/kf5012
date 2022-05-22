import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';

function Home() {

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


    //Funcitonality works but gives an error in the console
    function availabilityCheck(availablity, pos) {
        if(availablity.available == 1)
            {
                return (
                    
                    <div className='innerContent'>
                        <img src = {availablity.img}/>
                        <div className='otherCutContent'>
                        <h2>{ availablity.name }</h2>
                        <p>{ availablity.description }</p>
                        <p><b>Length:</b> { availablity.hairLength }</p>
                        <p><b>Time:</b> { availablity.duration } minutes</p>
                        <p><b>Cost:</b> £{ availablity.cost }</p>
                        </div>
                    </div>
                
                );
            }
        else
            {
                return (
                    <div  className='notAvailable'>
                    <h2>The <b>{availablity.name}</b> service is unavailable at this time</h2>
                    </div>
                );
            }
    };



    return(
        <div className='home'>
            {cuts && cuts.map((cut) => (
                <div className='outerShell' key={cut.cutID}>
                {availabilityCheck(cut)}
                </div>
             ))}
        </div>
    )
}

export default Home;