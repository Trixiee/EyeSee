import React,{useState,useRef} from 'react';

import './App.css';

function App() {
  const [alphabet,setAlphabet] = useState('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(el => ({
    letter: el,
    status:'left'
  })))
  const [randomNumber,setRandomNumber] = useState(Math.floor(Math.random() * ( Math.floor(26)-Math.ceil(1))) + 1)
  const [selectedDifficulty,setSelectedDifficulty] = useState(0)
  const [inProgress,setInProgress] = useState(false)

  const difficulties = [
    {
      id:0,
      title:'Easy',
      timeout:5000
    },
    {
      id:1,
      title:'Medium',
      timeout:3500
    },
    {
      id:2,
      title:'Hard',
      timeout:2000

    }
  ]

  const input = useRef("")

  const valid = () => {
    if(input.current.value.toUpperCase() === alphabet[randomNumber-1].letter){
      alphabet[randomNumber-1].status='correct'
    }else{
      alphabet[randomNumber-1].status='invalid'
    }
    setAlphabet([...alphabet])
  }
  let interval
  const start =  () =>{
    setInProgress(true)
    interval = setInterval(() => {
      setRandomNumber(Math.floor(Math.random() * ( Math.floor(26)-Math.ceil(1))) + 1)
    }, difficulties[selectedDifficulty].timeout);
    console.log(interval)
    
  }
  const stop =  () =>{
    setInProgress(false)
    alphabet.forEach(i=>i.status='left')
    setAlphabet([...alphabet])
   console.log(interval)
    interval = clearInterval(interval) 


  }
 
  return (
    <>           
    <button onClick={inProgress ? stop : start}>{inProgress?'Stop':'Start'}</button>
      <div className="radio-buttons-container">
      {
         difficulties.map((i,index) => 
          <span key={i.id}><input type="radio" name="difficulty" checked={selectedDifficulty === i.id}  onChange={()=>setSelectedDifficulty(index)} disabled={inProgress}/> {i.title}</span>
        )
      }
      </div>
      <input type="text" ref={input} onChange={valid} disabled={!inProgress}/>
      {randomNumber}
      <div id="alphabet-container">
        {
          alphabet.map(
            (i,index) =>
              <span key={index} className={`letter ${i.status !== "left" ? i.status==='invalid' ?'invalid':'correct' : ''}`}>{i.letter}</span>
            )
        }
      </div>
        Invalid:{alphabet.filter(i=>i.status==="correct").length}
        Correct:{alphabet.filter(i=>i.status==="invalid").length}
        Left:{alphabet.filter(i=>i.status==="left").length}
    </>
  );
}

export default App;
