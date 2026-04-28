import { useState } from 'react'
import './App.css'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('http://16.171.43.67:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (data.success) {
        setIsLoggedIn(true)
        return
      }

      setError('Invalid username or password.')
    } catch {
      setError('Unable to reach the backend server.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoggedIn) {
    return (
      <main className="app">
        <section className="welcome-card" aria-label="Welcome">
          <p className="eyebrow">Admin Panel</p>
          <h1>Welcome, Hassan</h1>
          <p className="subtitle">Login successful.</p>
        </section>
      </main>
    )
  }

  return (
    <main className="app">
      <section className="login-card" aria-label="Admin login">
        <p className="eyebrow">Admin Panel</p>
        <h1>Sign in</h1>
        <p className="subtitle">Use your admin credentials to continue.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Username</span>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          {error ? <p className="error-message">{error}</p> : null}

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Checking...' : 'Login'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default App
