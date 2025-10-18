import {useState} from 'react'
import './Bank.css'

function Bank({setShowBank, signals}) {
    return(
        <>
        <div className="bank-container">
            <button className="bank-button" onClick={(() => setShowBank(false))}>BACK</button>
            <div className="display-container">
                <h1 className="display">Signals: {signals}</h1>
            </div>
        </div>
        <div className="bank-display">

        </div>
        <div className="bank-slider-container">

        </div>
        </>
    )
}

export default Bank