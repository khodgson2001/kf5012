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

    return(
        <div className='home'>
             {cuts && cuts.map((cut) => (
                <div className='outerShell' key={cut.cutID}>
                    <img src = {cut.img}/>
                    <div className='innerContent'>
                        <h2>{ cut.name }</h2>
                        <p>{ cut.description }</p>
                        <p>{ cut.hairLength }</p>
                        <p>{ cut.duration }</p>
                        <p>£{ cut.cost }</p>
                        <p>{ cut.available }</p>
                        
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;