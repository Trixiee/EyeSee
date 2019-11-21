import React, { useState, useRef } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import './App.css'

function App() {
  const [alphabet, setAlphabet] = useState(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((el, ind) => ({
      letter: el,
      status: 'left',
      number: ind + 1
    }))
  )
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(
      Math.random() * alphabet.filter(i => i.status === 'left').length
    ) + 1
  )
  const [selectedDifficulty, setSelectedDifficulty] = useState(0)
  const [inProgress, setInProgress] = useState(false)
  const difficulties = [
    {
      id: 0,
      title: 'Easy',
      timeout: 5000
    },
    {
      id: 1,
      title: 'Medium',
      timeout: 3500
    },
    {
      id: 2,
      title: 'Hard',
      timeout: 2000
    }
  ]

  const letterInput = useRef('')

  const valid = () => {
    if (
      letterInput.current.value.toUpperCase() ===
      alphabet[randomNumber - 1].letter
    ) {
      alphabet[randomNumber - 1].status = 'correct'
    } else {
      alphabet[randomNumber - 1].status = 'invalid'
    }
    setAlphabet([...alphabet])
  }

  const start = () => {
    setInProgress(true)
    window.intervalId = setInterval(() => {
      setRandomNumber(oldRandomValue => {
        if (letterInput.current.value === '') {
          alphabet[oldRandomValue - 1].status = 'invalid'
          setAlphabet([...alphabet])
        }

        let left = alphabet.filter(i => i.status === 'left')
        if (left.length === 0) {
          stop()
          return Math.floor(
            Math.random() * alphabet.filter(i => i.status === 'left').length
          )
        }
        letterInput.current.value = ''
        return left[Math.floor(Math.random() * left.length)].number
      })
    }, difficulties[selectedDifficulty].timeout)
  }

  const stop = () => {
    setInProgress(false)
    clearInterval(window.intervalId)
    alphabet.forEach(i => (i.status = 'left'))
    setAlphabet([...alphabet])
    letterInput.current.value = ''
  }

  return (
    <>
      <Container>
        <Row>
          <Col col={6}>
            <div>
              {difficulties.map((i, index) => (
                <Form.Check
                  key={i.id + 1}
                  inline
                  custom
                  label={i.title}
                  type="radio"
                  id={i.id + 1}
                  checked={selectedDifficulty === i.id}
                  disabled={inProgress}
                  onChange={() => setSelectedDifficulty(index)}
                />
              ))}
            </div>
            <Button variant="primary" onClick={inProgress ? stop : start}>
              {inProgress ? 'Stop' : 'Start'}
            </Button>
          </Col>
          <Col col={6} className="d-flex justify-content-end">
            <div>
              <h5>SCORE</h5>
              <h6 className="invalid">
                INVALID: {alphabet.filter(i => i.status === 'invalid').length}
              </h6>
              <h6 className="correct">
                CORRECT: {alphabet.filter(i => i.status === 'correct').length}
              </h6>
              <h6 style={{ color: 'blue' }}>
                {' '}
                LEFT: {alphabet.filter(i => i.status === 'left').length}
              </h6>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={12} className="text-center">
            <h1>{inProgress ? randomNumber : '?'}</h1>
            <Form.Control
              type="Text"
              placeholder="Letter"
              ref={letterInput}
              onChange={valid}
              disabled={!inProgress}
            />
          </Col>
        </Row>
        <Row id="alphabet-container">
          {alphabet.map((i, index) => (
            <Col
              xs={1}
              md={1}
              lg={1}
              key={index}
              className={`letter ${
                i.status !== 'left'
                  ? i.status === 'invalid'
                    ? 'invalid'
                    : 'correct'
                  : ''
              }`}
            >
              {i.letter}
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}
export default App
