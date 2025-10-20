import {useState, useEffect} from 'react'
import './App.css'
import ClickerImage from './assets/signal_tower.png'
import Bank from './bank.jsx'

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

  const [numPlus1, setNumPlus1] = useState(0)
  const [numPlus5, setNumPlus5] = useState(0)
  const [numPlus30, setNumPlus30] = useState(0)
  const [numAutoPlus20, setNumAutoPlus20] = useState(0)
  const [numAutoPlus150, setNumAutoPlus150] = useState(0)
  const [numAutoPlus400, setNumAutoPlus400] = useState(0)
  const [numPlus500, setNumPlus500] = useState(0)

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
    }, 1000)

    return () => clearInterval(interval)
  }, [autoMultiplier])

  return (
    <>
    <button className="bank-button" onClick={() => setShowBank(true)}>BANK</button>
    {showBank && (<Bank setShowBank={setShowBank} signals={signals} setSignals={setSignals}/>)}
    <div className="clicker-container">
      <h1 className="display-multiplier">Multiplier: {multiplier}</h1>
      <h1 className="display-multiplier">Auto Multiplier: {autoMultiplier}</h1>
      <img className={`clicker-image ${pulsate ? 'pulsating' : ''}`} src={ClickerImage} onClick={() => click()}/>
      {showSignals && (<div className="signal-container">
        <div className={`signal s1 ${showSignals ? 'pulsating' : ''}`}></div>
        <div className={`signal s2 ${showSignals ? 'pulsating' : ''}`}></div>
        <div className={`signal s3 ${showSignals ? 'pulsating' : ''}`}></div>
      </div>)}
    </div>
    <div className="clicks-container">
      <h1 className="display-clicks">Clicks: {numClicks}</h1>
    </div>
    <div className="display-container">
      <h1 className="display">Signals: {signals}</h1>
    </div>
    <div className="clicker-upgrades-container">
      {signals >= plus1Cost && (<button className="upgrade-button" onClick={() => {setSignals(prev => prev - plus1Cost), setMultiplier(prev => prev + 1), setPlus1Cost(prev => Math.floor(prev * 1.5)), setNumPlus1(prev => prev + 1)}}>
        Smoke Signal ({numPlus1})<br/>simple but effective<br/>Cost: {plus1Cost} Signals
      </button>)}
      {signals < plus1Cost && (<button className="static-upgrade-button">
        Smoke Signal ({numPlus1})<br/>simple but effective<br/>Cost: {plus1Cost} Signals
      </button>)}
      {signals >= plus5Cost && (<button className="upgrade-button" onClick={() => {setSignals(prev => prev - plus5Cost), setMultiplier(prev => prev + 5), setPlus5Cost(prev => Math.floor(prev * 1.5)), setNumPlus5(prev => prev + 1)}}>
        Flag ({numPlus5})<br/>show 'em who's in charge<br/>Cost: {plus5Cost} Signals
      </button>)}
      {signals < plus5Cost && (<button className="static-upgrade-button">
        Flag ({numPlus5})<br/>show 'em who's in charge<br/>Cost: {plus5Cost} Signals
      </button>)}
      {signals >= plus30Cost && (<button className="upgrade-button" onClick={() => {setSignals(prev => prev - plus30Cost), setMultiplier(prev => prev + 30), setPlus30Cost(prev => Math.floor(prev * 1.5)), setNumPlus30(prev => prev + 1)}}>
        Telegraph ({numPlus30})<br/>dots and dashes<br/>Cost: {plus30Cost} Signals
      </button>)}
      {signals < plus30Cost && (<button className="static-upgrade-button">
        Telegraph ({numPlus30})<br/>dots and dashes<br/>Cost: {plus30Cost} Signals
      </button>)}
      {signals >= autoPlus20Cost && (<button className="upgrade-button" onClick={() => {setSignals(prev => prev - autoPlus20Cost), setAutoMultiplier(prev => prev + 20), setAutoPlus20Cost(prev => Math.floor(prev * 1.5)), setNumAutoPlus20(prev => prev + 1)}}>
        Radio ({numAutoPlus20})<br/>wireless broadcasting ...tskrr...<br/>Cost: {autoPlus20Cost} Signals
      </button>)}
      {signals < autoPlus20Cost && (<button className="static-upgrade-button">
        Radio ({numAutoPlus20})<br/>wireless broadcasting ...tskrr...<br/>Cost: {autoPlus20Cost} Signals
      </button>)}
      {signals >= autoPlus150Cost && (<button className="upgrade-button" onClick={() => {setSignals(prev => prev - autoPlus150Cost), setAutoMultiplier(prev => prev + 150), setAutoPlus150Cost(prev => Math.floor(prev * 1.5)), setNumAutoPlus150(prev => prev + 1)}}>
        Telephone ({numAutoPlus150})<br/>individual voice communication<br/>Cost: {autoPlus150Cost} Signals
      </button>)}
      {signals < autoPlus150Cost && (<button className="static-upgrade-button">
        Telephone ({numAutoPlus150})<br/>individual voice communication<br/>Cost: {autoPlus150Cost} Signals
      </button>)}
      {signals >= autoPlus400Cost && (<button className="upgrade-button" onClick={() => {setSignals(prev => prev - autoPlus400Cost), setAutoMultiplier(prev => prev + 400), setAutoPlus400Cost(prev => Math.floor(prev * 1.5)), setNumAutoPlus400(prev => prev + 1)}}>
        Internet ({numAutoPlus400})<br/>the digital web, javascript, and cat videos<br/>Cost: {autoPlus400Cost} Signals
      </button>)}
      {signals < autoPlus400Cost && (<button className="static-upgrade-button">
        Internet ({numAutoPlus400})<br/>the digital web, javascript, and cat videos<br/>Cost: {autoPlus400Cost} Signals
      </button>)}
      {signals >= plus500Cost && (<button className="upgrade-button" onClick={() => {setSignals(prev => prev - plus500Cost), setMultiplier(prev => prev + 500), setPlus500Cost(prev => Math.floor(prev * 1.5)), setNumPlus500(prev => prev + 1)}}>
        Satellite ({numPlus500})<br/>now available in orbit<br/>Cost: {plus500Cost} Signals
      </button>)}
      {signals < plus500Cost && (<button className="static-upgrade-button">
        Satellite ({numPlus500})<br/>now available in orbit<br/>Cost: {plus500Cost} Signals
      </button>)}
    </div>
    </>
  )
}

export default App
