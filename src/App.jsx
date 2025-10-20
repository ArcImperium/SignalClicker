import {useState, useEffect} from 'react'
import './App.css'
import ClickerImage from './assets/signal_tower.png'
import Bank from './Bank.jsx'

function App() {
  useEffect(() => {
    document.title="Signal Clicker"
  }, [])

  const [signals, setSignals] = useState(0)
  const [pulsate, setPulsate] = useState(false)
  const [showSignals, setShowSignals] = useState(false)
  const [multiplier, setMultiplier] = useState(1)
  const [autoMultiplier, setAutoMultiplier] = useState(0)

  const [plus5Cost, setPlus5Cost] = useState(10)
  const [plus10Cost, setPlus10Cost] = useState(50)
  const [autoPlus5Cost, setAutoPlus5Cost] = useState(250)

  const [showBank, setShowBank] = useState(false)

  const [messageCounter, setMessageCounter] = useState(1)
  const [numClicks, setNumClicks] = useState(0)

  function click() {
    setSignals(prev => prev + multiplier)

    setPulsate(true)
    setShowSignals(true)
    setTimeout(() => {setPulsate(false)}, 500)
    setTimeout(() => {setShowSignals(false)}, 500)

    setNumClicks(prev => prev + 1)
    if (numClicks === (messageCounter - 1)) {
      const newMessage = `You have reached ${messageCounter} clicks!`
      alert(newMessage)
      setMessageCounter(prev => prev * 10)
    }
  } 

  useEffect(() => {
    const interval = setInterval(() => {
      setSignals(prev => prev + autoMultiplier)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoMultiplier])

  return (
    <>
    <button className="bank-button" onClick={() => setShowBank(true)}>BANK</button>
    {showBank && (<Bank setShowBank={setShowBank} signals={signals} setSignals={setSignals}/>)}
    <div className="clicker-container">
      <h1 className="display-multiplier">Multiplier: {multiplier}</h1>
      <h1 className="display-multiplier">Generator Multiplier: {autoMultiplier}</h1>
      <img className={`clicker-image ${pulsate ? 'pulsating' : ''}`} src={ClickerImage} onClick={() => click()}/>
      {showSignals && (<div className="signal-container">
        <div className={`signal s1 ${showSignals ? 'pulsating' : ''}`}></div>
        <div className={`signal s2 ${showSignals ? 'pulsating' : ''}`}></div>
        <div className={`signal s3 ${showSignals ? 'pulsating' : ''}`}></div>
      </div>)}
    </div>
    <div className="display-container">
      <h1 className="display">Signals: {signals}</h1>
    </div>
    <div className="clicker-upgrades-container">
      {signals >= plus5Cost && (<button className="upgrade-button" onClick={() => {setSignals(prev => prev - plus5Cost), setMultiplier(prev => prev + 5), setPlus5Cost(prev => Math.floor(prev * 1.5))}}>
        +5<br/>Cost: {plus5Cost}
      </button>)}
      {signals < plus5Cost && (<button className="static-upgrade-button">
        +5<br/>Cost: {plus5Cost}
      </button>)}
      {signals >= plus10Cost && (<button className="upgrade-button" onClick={() => {setSignals(prev => prev - plus10Cost), setMultiplier(prev => prev + 10), setPlus10Cost(prev => Math.floor(prev * 1.5))}}>
        +10<br/>Cost: {plus10Cost}
      </button>)}
      {signals < plus10Cost && (<button className="static-upgrade-button">
        +10<br/>Cost: {plus10Cost}
      </button>)}
      {signals >= autoPlus5Cost && (<button className="upgrade-button" onClick={() => {setSignals(prev => prev - autoPlus5Cost), setAutoMultiplier(prev => prev + 5), setAutoPlus5Cost(prev => Math.floor(prev * 1.5))}}>
        +5 Generator<br/>Cost: {autoPlus5Cost}
      </button>)}
      {signals < autoPlus5Cost && (<button className="static-upgrade-button">
        +5 Generator<br/>Cost: {autoPlus5Cost}
      </button>)}
    </div>
    </>
  )
}

export default App
