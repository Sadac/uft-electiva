require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const { Client } = require('pg');

const users = require('./routes/users');
const tasks = require('./routes/tasks');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.use('/api/users', users)
app.use('/api/tasks', tasks)

// Setup postgres client
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
});
client.connect();
app.set('db', client)



const port = process.env.PORT || process.env.LOCAL_PORT
app.listen(port, ()=> {
    console.log(`Listening on port ${port}`)
})
