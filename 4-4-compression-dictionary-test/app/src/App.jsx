import { useState, useEffect, useCallback, useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = useCallback((value) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(error)
    }
  }, [key])

  return [storedValue, setValue]
}

function App() {
  const [count, setCount] = useLocalStorage('count', 0)
  const [theme, setTheme] = useState('light')
  const [lastUpdated, setLastUpdated] = useState(null)

  const doubleCount = useMemo(() => count * 2, [count])

  useEffect(() => {
    setLastUpdated(new Date().toLocaleString())
  }, [count])

  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + 1)
  }, [setCount])

  const handleDecrement = useCallback(() => {
    setCount((prev) => Math.max(0, prev - 1))
  }, [setCount])

  const handleReset = useCallback(() => {
    setCount(0)
  }, [setCount])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  return (
    <div className={`app ${theme}`}>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React v2</h1>
      <div className="card">
        <div className="button-group">
          <button onClick={handleDecrement}>-</button>
          <button onClick={handleIncrement}>
            count is {count}
          </button>
          <button onClick={handleDecrement}>+</button>
        </div>
        <p>Double count: {doubleCount}</p>
        <button onClick={handleReset}>Reset</button>
        <button onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'dark' : 'light'} mode
        </button>
        {lastUpdated && <p className="timestamp">Last updated: {lastUpdated}</p>}
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
