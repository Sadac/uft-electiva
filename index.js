require('dotenv').config();
const express = require('express')
const app = express()
const { Client } = require('pg');

const users = require('./routes/users');

app.use(express.json())
app.use(express.urlencoded())

app.use('/api/users', users)





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
