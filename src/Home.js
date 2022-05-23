import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';

function Home() {

    /*constant that holds the cookies that stores the information about the cuts e.g. cut ID etc*/
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


    /*Use effect runs when the page is rendered. The empty array specifies that the useEffect dependencies. As it is empty it only runs on the initial load of the page.
    availablity check is a function that takes in the cut information and checks if the cut is available. 
    Then, it outputs different JSX depending on if it is available or not to be returned to the application render.
    
    */
    function availabilityCheck(availablity) {
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