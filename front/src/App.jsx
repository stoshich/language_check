import { useState } from 'react'
import axios from 'axios'
import './App.css'
import { useEffect } from 'react'

function App() {

  const [inputValue, setInputValue] = useState('')
  const [foundLetters, setFoundLetters] = useState('')
  const [recheck, setRecheck] = useState(false)

  const clickHandler = (inputValue) => {
    axios.post('http://localhost:5000/api/input', { text: inputValue })
    axios.post('http://localhost:5000/api/input-check', { text: inputValue })
      .then(response => {
        setFoundLetters(response.data)
      })
    setRecheck(true)
  }

  useEffect(() => {
    if (recheck) {
      axios.post('http://localhost:5000/api/input-check', { text: inputValue })
        .then(response => {
          setFoundLetters(response.data)
        })
    }
  }, [inputValue])

  return (
    <div className="App">
      <div className='input-block'>
        <input
          className='input'
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
          }}
        />
        <button className='btn' onClick={() => clickHandler(inputValue)}>Проверить</button>
      </div>
      <div className='result' dangerouslySetInnerHTML={{ __html: `${foundLetters}` }} />
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default App
