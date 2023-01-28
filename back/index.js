const express = require('express')
const dotenv = require('dotenv')
const inputRouter = require('./routes/input.route')
const corsMiddleware = require('./middleware/cors.middleware')

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(corsMiddleware)
app.use(express.json())
app.use('/api', inputRouter)

app.listen(PORT, () => console.log('Server started on PORT ' + PORT))