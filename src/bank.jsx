import {useState} from 'react'
import './Bank.css'

function Bank({setShowBank, signals}) {
    const [showSlider, setShowSlider] = useState(true)
    const [sliderValue, setSliderValue] = useState(0)
    const [sliderTime, setSliderTime] = useState(0)
    const [maxValue, setMaxValue] = useState(10)

    const [showLoan1, setShowLoan1] = useState(false)
    const [showLoan2, setShowLoan2] = useState(false)

    return(
        <>
        <div className="bank-container">
            <button className="bank-button" onClick={(() => setShowBank(false))}>BACK</button>
            <div className="display-container">
                <h1 className="display">Signals: {signals}</h1>
            </div>
        </div>
        <div className="bank-display">
            <div className="loan-button-display">
                <button className="loan-button">+</button>
                <button className="loan-button">-</button>
            </div>
            {showLoan1 && (<button className="loan" onClick={() => setShowLoan1(false)}>Loan 1</button>)}
            {!showLoan1 && (<button className="static-loan" onClick={() => {setShowLoan1(true), setShowLoan2(false)}}>Loan 1</button>)}
            {showLoan2 && (<button className="loan" onClick={() => setShowLoan2(false)}>Loan 2</button>)}
            {!showLoan2 && (<button className="static-loan" onClick={() => {setShowLoan2(true), setShowLoan1(false)}}>Loan 2</button>)}
        </div>
        <div className="bank-slider-container">
            {showSlider && (<><input className="bank-slider" type="range" min="0" max={maxValue} value={sliderValue} onChange={(e) => setSliderValue(e.target.value)}/>
            <h1>Signals: {sliderValue}</h1></>)}
            {showSlider && (<><input className="bank-slider" type="range" min="0" max="300" value={sliderTime} onChange={(e) => setSliderTime(e.target.value)}/>
            <h1>Time: {sliderTime} sec</h1></>)}
        </div>
        </>
    )
}

export default Bank