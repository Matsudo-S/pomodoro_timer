import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState(25 * 60) // 25分を秒に変換
  const [isRunning, setIsRunning] = useState(false)
  const [pomodoros, setPomodoros] = useState(0)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime(prev => prev - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isRunning, time])

  useEffect(() => {
    if (time === 0) {
      setIsRunning(false)
      setPomodoros(prev => prev + 1)
      setTime(25 * 60) // 時間をリセット
    }
  }, [time])

  const handleStart = () => {
    if (time === 0) {
      setTime(25 * 60)
    }
    setIsRunning(true)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTime(25 * 60)
    setPomodoros(0)
  }

  return (
    <div className="app">
      <h1>ポモドーロタイマー</h1>
      <div className="timer-container">
        <div className="time-display">
          <span>{minutes.toString().padStart(2, '0')}</span>:
          <span>{seconds.toString().padStart(2, '0')}</span>
        </div>
        <div className="controls">
          <button onClick={handleStart} disabled={isRunning}>
            {isRunning ? '実行中...' : '開始'}
          </button>
          <button onClick={handleReset}>
            リセット
          </button>
        </div>
      </div>
      <div className="pomodoros">
        <p>完了したポモドーロ: {pomodoros}</p>
      </div>
    </div>
  )
}

export default App
