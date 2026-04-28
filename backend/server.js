import cors from 'cors'
import express from 'express'

const app = express()
const PORT = 3001

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
)
app.use(express.json())

app.post('/login', (req, res) => {
  const { username, password } = req.body
  const isValid = username === 'hassan' && password === 'hassan'

  res.json({ success: isValid })
})

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`)
})
