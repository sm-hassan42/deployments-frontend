import cors from 'cors'
import express from 'express'

const app = express()
const PORT = 3001
app.use(express.json());


app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.options("*", cors());


app.post('/login', (req, res) => {
  const { username, password } = req.body
  const isValid = username === 'hassan' && password === 'hassan'

  res.json({ success: isValid })
})

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Backend server running on port 3001");
});