import React, { useState, useEffect } from 'react'
import './Viskositaet.css'

const Viskositaet = (props) => {

    const [anteilSilikonOelA, setAnteilSilikonOelA] = useState(0);
    const [mischungsverhaeltnis, setMischungsverhaeltnis] = useState(0);
    const [viskositaetOelA, setViskositaetOelA] = useState();
    const [viskositaetOelB, setViskositaetOelB] = useState();
    const [gewuenschteViskositaet, setGewuenschteViskositaet] = useState();
    const [viskositaetMischungAB, setViskositaetMischungAB] = useState(0);


    const handleGewuenschteViskositaetChange = (event) => {
        setGewuenschteViskositaet(parseFloat(event.target.value));
    }

    const handleViskositaetAChange = (event) => {
        setViskositaetOelA(parseFloat(event.target.value));
    }

    const handleViskositaetBChange = (event) => {
        setViskositaetOelB(parseFloat(event.target.value));
    }

    const calculate = (visA, visB, gV) => {
        if (visA && visB && gV) {
            const firstLog = Math.log(gV / visB);
            const secondLog = Math.log(visA / visB);
            setAnteilSilikonOelA((parseFloat(firstLog / secondLog).toFixed(4) * 100));
        } else {
            setAnteilSilikonOelA(0);
            setMischungsverhaeltnis(0);
            setViskositaetMischungAB(0);
        }
    }

    useEffect(() => {
        if (viskositaetOelA && viskositaetOelB && gewuenschteViskositaet) {
            calculate(viskositaetOelA, viskositaetOelB, gewuenschteViskositaet);
        }

    }, [viskositaetOelA, viskositaetOelB, gewuenschteViskositaet]);


    useEffect(() => {
        if (anteilSilikonOelA) {
            setMischungsverhaeltnis(100 - anteilSilikonOelA);


            const firstPow = Math.pow(viskositaetOelA, (anteilSilikonOelA / 100));
            const secondPow = Math.pow(viskositaetOelB, 1 - (anteilSilikonOelA / 100));

            setViskositaetMischungAB((firstPow * secondPow).toFixed(0));
        }


    }, [anteilSilikonOelA]);



    return (
        <div className="container viskositaet">
            <h3> Viskosität </h3>
            <div className="form-wrapper">
                <div className="form-group">
                    <label> Viskosität Silikonöl A <span className="unit">(cSt)  </span></label>
                    <input type="number" placeholder="0" value={viskositaetOelA} onChange={handleViskositaetAChange} />
                </div>
                <div className="form-group">
                    <label> Viskosität Silikonöl B <span className="unit">(cSt)  </span> </label>
                    <input type="number" placeholder="0" value={viskositaetOelB} onChange={handleViskositaetBChange} />
                </div>
                <div className="form-group">
                    <label> Gewünschte Viskosität <span className="unit">(cSt)  </span></label>
                    <input type="number" placeholder="0" value={gewuenschteViskositaet} onChange={handleGewuenschteViskositaetChange} />
                </div>
            </div>

            {/* <h2> Ergebnisse </h2> */}

            <div className="results">
                <div className="result-group">
                    <div className="label">
                        Mischungsverhältnis A:B
                    </div>
                    <div className="value">
                        {anteilSilikonOelA.toFixed(2) || 0} : {mischungsverhaeltnis.toFixed(2) || 0}
                    </div>
                </div>

                <div className="result-group">
                    <div className="label">
                        Viskosität Mischung A-B
                    </div>
                    <div className="value">
                        {viskositaetMischungAB || 0} cSt
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Viskositaet