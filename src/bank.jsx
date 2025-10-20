import {useState} from 'react'
import './Bank.css'

function Bank({setShowBank, signals, setSignals}) {
    const [showSlider, setShowSlider] = useState(false)
    const [sliderValue, setSliderValue] = useState(0)
    const [sliderTime, setSliderTime] = useState(0)
    const [loan1Interest, setLoan1Interest] = useState(0)
    const [loan2Interest, setLoan2Interest] = useState(0)
    const [loan1Time, setLoan1Time] = useState(0)
    const [loan2Time, setLoan2Time] = useState(0)
    const [loan1Value, setLoan1Value] = useState(0)
    const [loan2Value, setLoan2Value] = useState(0)

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

    function startLoan1() {
        const val = Number(sliderValue)
        const time = Number(sliderTime)
        const int = Math.floor(val * 0.01 * time)

        setLoan1Active(true)
        setLoan1Value(val)
        setLoan1Interest(int)
        setLoan1Time(time)
        setSignals(prev => prev + val)
        setTimeout(() => {setSignals(prev => prev - (val + int)); setLoan1Active(false)}, time * 1000)
    }
    function startLoan2() {
        const val = Number(sliderValue)
        const time = Number(sliderTime)
        const int = Math.floor(val * 0.01 * time)

        setLoan2Active(true)
        setLoan2Value(val)
        setLoan2Interest(int)
        setLoan2Time(time)
        setSignals(prev => prev + val)
        setTimeout(() => {setSignals(prev => prev - (val + int)); setLoan2Active(false)}, time * 1000)
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
                {(showLoan1 && !loan1Active) && (<button className="loan-button" onClick={() => startLoan1()}>+</button>)}
                {(!showLoan1 || loan1Active) && (<button className="static-loan-button">+</button>)}
                {(showLoan2 && !loan2Active) && (<button className="loan-button" onClick={() => startLoan2()}>+</button>)}
                {(!showLoan2 || loan2Active) && (<button className="static-loan-button">+</button>)}
            </div>
            {showLoan1 && (<button className="loan" onClick={() => {setShowLoan1(false), setShowSlider(false)}}>Loan 1 {loan1Active && (<>(Active)</>)}</button>)}
            {!showLoan1 && (<button className="static-loan" onClick={() => {setShowLoan1(true), setShowLoan2(false), setShowSlider(true)}}>Loan 1 {loan1Active && (<>(Active)</>)}</button>)}
            {showLoan2 && (<button className="loan" onClick={() => {setShowLoan2(false), setShowSlider(false)}}>Loan 2 {loan2Active && (<>(Active)</>)}</button>)}
            {!showLoan2 && (<button className="static-loan" onClick={() => {setShowLoan2(true), setShowLoan1(false), setShowSlider(true)}}>Loan 2 {loan2Active && (<>(Active)</>)}</button>)}
        </div>
        <div className="bank-slider-container">
            {showSlider && (<><input className="bank-slider" type="range" min="0" max={signals * 10} value={sliderValue} onChange={(e) => {setSliderValue(Number(e.target.value)), changeInterest()}}/>
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