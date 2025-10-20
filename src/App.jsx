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

  const [plus1Cost, setPlus1Cost] = useState(25)
  const [plus5Cost, setPlus5Cost] = useState(100)
  const [plus30Cost, setPlus30Cost] = useState(750)
  const [autoPlus20Cost, setAutoPlus20Cost] = useState(5000)
  const [autoPlus150Cost, setAutoPlus150Cost] = useState(30000)
  const [autoPlus400Cost, setAutoPlus400Cost] = useState(75000)
  const [plus500Cost, setPlus500Cost] = useState(100000)

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
      {signals >= plus1Cost && (<button className="upgrade-button" onClick={() => {setSignals(prev => prev - plus1Cost), setMultiplier(prev => prev + 1), setPlus1Cost(prev => Math.floor(prev * 1.5))}}>
        +1<br/>Cost: {plus1Cost}
      </button>)}
      {signals < plus1Cost && (<button className="static-upgrade-button">
        +1<br/>Cost: {plus1Cost}
      </button>)}
      {signals >= plus5Cost && (<button className="upgrade-button" onClick={() => {setSignals(prev => prev - plus5Cost), setMultiplier(prev => prev + 5), setPlus5Cost(prev => Math.floor(prev * 1.5))}}>
        +5<br/>Cost: {plus5Cost}
      </button>)}
      {signals < plus5Cost && (<button className="static-upgrade-button">
        +5<br/>Cost: {plus5Cost}
      </button>)}
      {signals >= plus30Cost && (<button className="upgrade-button" onClick={() => {setSignals(prev => prev - plus30Cost), setMultiplier(prev => prev + 30), setPlus30Cost(prev => Math.floor(prev * 1.5))}}>
        +30<br/>Cost: {plus30Cost}
      </button>)}
      {signals < plus30Cost && (<button className="static-upgrade-button">
        +30<br/>Cost: {plus30Cost}
      </button>)}
      {signals >= autoPlus20Cost && (<button className="upgrade-button" onClick={() => {setSignals(prev => prev - autoPlus20Cost), setAutoMultiplier(prev => prev + 20), setAutoPlus20Cost(prev => Math.floor(prev * 1.5))}}>
        +20 Generator<br/>Cost: {autoPlus20Cost}
      </button>)}
      {signals < autoPlus20Cost && (<button className="static-upgrade-button">
        +20 Generator<br/>Cost: {autoPlus20Cost}
      </button>)}
      {signals >= autoPlus150Cost && (<button className="upgrade-button" onClick={() => {setSignals(prev => prev - autoPlus150Cost), setAutoMultiplier(prev => prev + 150), setAutoPlus150Cost(prev => Math.floor(prev * 1.5))}}>
        +150 Generator<br/>Cost: {autoPlus150Cost}
      </button>)}
      {signals < autoPlus150Cost && (<button className="static-upgrade-button">
        +150 Generator<br/>Cost: {autoPlus150Cost}
      </button>)}
      {signals >= autoPlus400Cost && (<button className="upgrade-button" onClick={() => {setSignals(prev => prev - autoPlus400Cost), setAutoMultiplier(prev => prev + 400), setAutoPlus400Cost(prev => Math.floor(prev * 1.5))}}>
        +400 Generator<br/>Cost: {autoPlus400Cost}
      </button>)}
      {signals < autoPlus400Cost && (<button className="static-upgrade-button">
        +400 Generator<br/>Cost: {autoPlus400Cost}
      </button>)}
      {signals >= plus500Cost && (<button className="upgrade-button" onClick={() => {setSignals(prev => prev - plus500Cost), setMultiplier(prev => prev + 500), setPlus500Cost(prev => Math.floor(prev * 1.5))}}>
        +500<br/>Cost: {plus500Cost}
      </button>)}
      {signals < plus500Cost && (<button className="static-upgrade-button">
        +500<br/>Cost: {plus500Cost}
      </button>)}
    </div>
    </>
  )
}

export default App
