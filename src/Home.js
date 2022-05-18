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
                        <p><b>Length:</b> { cut.hairLength }</p>
                        <p><b>Time:</b> { cut.duration } minutes</p>
                        <p><b>Cost:</b> £{ cut.cost }</p>
                        <p><b>Currently available:</b> { availabilityCheck(cut.available) }</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;