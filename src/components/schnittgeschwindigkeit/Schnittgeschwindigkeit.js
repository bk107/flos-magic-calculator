import React, { useEffect, useState } from 'react'
import './Schnittgeschwindigkeit.css'

const Schnittgeschwindigkeit = (props) => {

    const [durchmesser, setDurchmesser] = useState();
    const [drehzahl1min, setDrehzahl1min] = useState();
    const [vcMMMin, setVcMMMin] = useState(0);


    const handleDurchmesserChange = (event) => {
        setDurchmesser(parseFloat(event.target.value));
    }

    const handleDrehzahl1MinChange = (event) => {
        setDrehzahl1min(parseFloat(event.target.value));
    }


    const calculateVcMMMin = () => {

        setVcMMMin((durchmesser * drehzahl1min * Math.PI / 1000).toFixed(2));

    }


    useEffect(() => {
        if (durchmesser && drehzahl1min) {
            calculateVcMMMin();
        }
    }, [drehzahl1min, durchmesser]);




    return (
        <div className="container schnittgeschwindigkeit">
            <h3> Schnittgeschwindigkeit </h3>
            <div className="form-wrapper">
                <div className="form-group">
                    <label> Durchmesser <span className="unit">(mm)</span> </label>
                    <input type="number" placeholder="0" value={durchmesser} onChange={handleDurchmesserChange} />
                </div>
                <div className="form-group">
                    <label> Drehzahl <span className="unit">(1/Min)</span>  </label>
                    <input type="number" placeholder="0" value={drehzahl1min} onChange={handleDrehzahl1MinChange} />
                </div>

            </div>

            <div className="results">
                <div className="result-group">
                    <div className="label">
                        m/min
                    </div>
                    <div className="value">
                        {vcMMMin}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Schnittgeschwindigkeit