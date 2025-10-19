import {useState} from 'react'
import './Bank.css'

function Bank({setShowBank, signals}) {
    const [showSlider, setShowSlider] = useState(false)
    const [sliderValue, setSliderValue] = useState(0)
    const [sliderTime, setSliderTime] = useState(0)
    const [loan1Interest, setLoan1Interest] = useState(0)
    const [loan2Interest, setLoan2Interest] = useState(0)

    const [showLoan1, setShowLoan1] = useState(false)
    const [loan1Active, setLoan1Active] = useState(false)
    const [showLoan2, setShowLoan2] = useState(false)
    const [loan2Active, setLoan2Active] = useState(false)

    function changeInterest() {
        if (showLoan1) {
            setLoan1Interest(Math.floor(sliderValue * 0.01 * sliderTime))
        }
        else if (showLoan2) {
            setLoan2Interest(Math.floor(sliderValue * 0.01 * sliderTime))
        }
    }

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
                <button className="loan-button" onClick={() => {}}>+</button>
                <button className="loan-button" onClick={() => {}}>-</button>
            </div>
            {showLoan1 && (<button className="loan" onClick={() => {setShowLoan1(false), setShowSlider(false)}}>Loan 1 {loan1Active && (<>(Active)</>)}</button>)}
            {!showLoan1 && (<button className="static-loan" onClick={() => {setShowLoan1(true), setShowLoan2(false), setShowSlider(true)}}>Loan 1 {loan1Active && (<>(Active)</>)}</button>)}
            {showLoan2 && (<button className="loan" onClick={() => {setShowLoan2(false), setShowSlider(false)}}>Loan 2 {loan2Active && (<>(Active)</>)}</button>)}
            {!showLoan2 && (<button className="static-loan" onClick={() => {setShowLoan2(true), setShowLoan1(false), setShowSlider(true)}}>Loan 2 {loan2Active && (<>(Active)</>)}</button>)}
        </div>
        <div className="bank-slider-container">
            {showSlider && (<><input className="bank-slider" type="range" min="0" max={signals * 10} value={sliderValue} onChange={(e) => {setSliderValue(e.target.value), changeInterest()}}/>
            <h1>Signals: {sliderValue}</h1></>)}
            {showSlider && (<><input className="bank-slider" type="range" min="0" max="300" value={sliderTime} onChange={(e) => {setSliderTime(e.target.value), changeInterest()}}/>
            <h1>Time: {sliderTime} sec</h1>
            <hr style={{border: '3px solid black', width: '90%'}}/>
            <h1>Interest: {showLoan1 && (<>{loan1Interest}</>)}{showLoan2 && (<>{loan2Interest}</>)}</h1></>)}
        </div>
        </>
    )
}

export default Bank