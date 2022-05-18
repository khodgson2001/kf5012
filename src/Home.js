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

    function availabilityCheck(availablity) {
        if(availablity == 1)
            {
                return "Yes";
            }
        else
            {
                return "No";
            }
    };

    return(
        <div className='home'>
             {cuts && cuts.map((cut) => (
                <div className='outerShell' key={cut.cutID}>
                    <img src = {cut.img}/>
                    <div className='innerContent'>
                        <h2>{ cut.name }</h2>
                        <p>{ cut.description }</p>
                        <p>Length: { cut.hairLength }</p>
                        <p>Time: { cut.duration } minutes</p>
                        <p>Cost: £{ cut.cost }</p>
                        <p>Currently available: { availabilityCheck(cut.available) }</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;