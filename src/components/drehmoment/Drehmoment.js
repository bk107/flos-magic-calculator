import React, { useState, useEffect } from 'react'
import './Drehmoment.css'

const Drehmoment = (props) => {

    const [inputValues, setInputValues] = useState({
        gewinde: "",
        steigung: "",
        festigkeitsklasse1: "",
        festigkeitsklasse2: "",
        reibungskoeffizient: 0.14
    })

    const [result, setResult] = useState(0);


    const handleChange = event => {

        setInputValues({
            ...inputValues,
            [event.target.name]: parseFloat(event.target.value)
        })
    }

    const calculateResult = () => {

        setResult(
            (Math.pow((inputValues.gewinde - inputValues.steigung) / 2, 2)
                * Math.PI
                * inputValues.festigkeitsklasse1
                * inputValues.festigkeitsklasse2
                * 10 / 1000
                * inputValues.gewinde
                * inputValues.reibungskoeffizient)
                .toFixed(0)
        )


    }

    useEffect(() => {

        let allInputValuesSet = true;
        for (let i in inputValues) {
            if (!inputValues[i]) {
                allInputValuesSet = false;
                break;
            }
        }
        if (allInputValuesSet) {
            calculateResult();
        }

    }, [inputValues]);




    return (
        <div className="container drehzahl">
            <h3> Drehmoment </h3>
            <div className="form-wrapper">
                <div className="form-group">
                    <label> Gewinde <span className="unit">(M)</span></label>
                    <input type="number" placeholder="0" name="gewinde" value={inputValues.gewinde} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label> Steigung <span className="unit">(mm)</span></label>
                    <input type="number" placeholder="0" name="steigung" value={inputValues.steigung} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label> Festigkeitsklasse </label>
                    <div className="input-group">
                        <input type="number" className="input-small" placeholder="0" name="festigkeitsklasse1" value={inputValues.festigkeitsklasse1} onChange={handleChange} />
                        <input type="number" className="input-small" placeholder="0" name="festigkeitsklasse2" value={inputValues.festigkeitsklasse2} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label> Reibungskoeffizient </label>
                    <input type="number" placeholder="0" name="reibungskoeffizient" value={inputValues.reibungskoeffizient} onChange={handleChange} />
                </div>
            </div>

            <div className="results">
                <div className="result-group">
                    <div className="label">
                        Anzugsdrehmoment Nm
                    </div>
                    <div className="value">
                        {result || 0}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Drehmoment