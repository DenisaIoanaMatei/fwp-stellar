const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

const corsOptions = {
  origin: 'http://localhost:8081'
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the authentification server.' })
})

// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

const db = require('./auth-server/models')
const dbConfig = require('./auth-server/configs/db.config.js')

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Successfully connect to MongoDB.')
  })
  .catch(err => {
    console.error('Connection error', err)
    process.exit()
  })
