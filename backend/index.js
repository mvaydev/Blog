require('dotenv').config()

const express = require('express')
const app = express()
const sequelize = require('./db')
const bodyParser = require('body-parser')
const cors = require('cors')

const router = require('./routes')
const errorHandler = require('./middleware/errorHandling')

app.use('static', express.static('public'))
app.use(cors())

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use('/api', router)
app.use('/api', errorHandler)

async function start() {
    try {
        app.listen(process.env.PORT || 5000)

        sequelize.authenticate()
        sequelize.sync({alter: true})

    } catch(e) {
        console.error(e)
    }
}

start()