require('dotenv').config()

const express = require('express')
const app = express()
const sequelize = require('./db')
const bodyParser = require('body-parser')

const errorHandler = require('./middleware/errorHandling')

app.use('static', express.static('public'))

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use('/api', errorHandler)

async function start() {
    try {
        app.listen(process.env.PORT || 5000)

        sequelize.authenticate()
        sequelize.sync()

    } catch(e) {
        console.error(e)
    }
}

start()