import React, { useEffect, useState } from 'react'
import './Drehzahl.css'

const Drehzahl = (props) => {

    const [durchmesser, setDurchmesser] = useState();
    const [drehzahl1min, setDrehzahl1min] = useState(0);
    const [vcMMMin, setVcMMMin] = useState();


    const handleDurchmesserChange = (event) => {
        setDurchmesser(parseFloat(event.target.value));
    }

    const handleVcMMMinChange = (event) => {
        setVcMMMin(parseFloat(event.target.value));
    }

    const calculateDrehzahl1Min = () => {


        setDrehzahl1min(((vcMMMin * 1000) / (durchmesser * Math.PI)).toFixed(0));

    }

    useEffect(() => {

        if (durchmesser && vcMMMin) {
            calculateDrehzahl1Min();
        } else {
            setDrehzahl1min(0);
        }



    }, [durchmesser, vcMMMin]);




    return (
        <div className="container drehzahl">
            <h3> Drehzahl  </h3>
            <div className="form-wrapper">
                <div className="form-group">
                    <label> Durchmesser <span className="unit">(mm) </span> </label>
                    <input type="number" placeholder="0" value={durchmesser} onChange={handleDurchmesserChange} />
                </div>
                <div className="form-group">
                    <label> VC <span className="unit">(m/min) </span></label>
                    <input type="number" placeholder="0" value={vcMMMin} onChange={handleVcMMMinChange} />
                </div>
            </div>

            <div className="results">
                <div className="result-group">
                    <div className="label">
                        Drehzahl 1/Min
                    </div>
                    <div className="value">
                        {drehzahl1min || 0}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Drehzahl