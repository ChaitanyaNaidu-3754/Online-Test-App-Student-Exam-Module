const express = require('express')

const connectDB = require('./config/db')

const cors = require('cors')

require('dotenv').config()

const authRoutes = require('./routes/authRoutes')
const examRoutes = require('./routes/examRoutes')

const app = express()
connectDB()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/auth', authRoutes)
app.use('/api/exam', examRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

