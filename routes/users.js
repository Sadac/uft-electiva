var express = require('express');
var router = express.Router();
const { isEmpty } = require('lodash')


router.post('/', async (req, res, next) => {
    try {
        const db = req.app.get('db')
        const { first_name, last_name, email } = req.body
        const queryResponse = await db.query(
            `INSERT INTO users(first_name,last_name,email) VALUES ($1,$2,$3) RETURNING *`,
            [first_name, last_name, email]
        )
        const [result] = queryResponse.rows
        
        res.status(201).send(result)
      } catch (err) {
        console.log(err)
        next(err)
      }
})

router.get('/', async (req, res, next) => {
    try {
        const db = req.app.get('db')
        const queryResponse = await db.query(`SELECT * FROM users`)
        const result = queryResponse.rows
        
        res.status(200).send(result)
      } catch (err) {
        console.log(err)
        next(err)
      }
})

router.get('/:userId', async (req, res, next) => {
    try {
        const db = req.app.get('db')
        const userId = req.params.userId
        const queryResponse = await db.query(
            `SELECT * FROM users WHERE id = $1`,
            [userId]
        )
        const [result] = queryResponse.rows
        if(isEmpty(result)){
            res.status(404).send({message:`Usuario ${userId} no encontrado`})
        }

        res.status(200).send(result)
      } catch (err) {
        console.log(err)
        next(err)
      }
})

router.delete('/:userId', async (req, res, next) => {
    try {
        const db = req.app.get('db')
        const userId = req.params.userId
        await db.query(
            `DELETE FROM users WHERE id = $1`, 
            [userId]
        )

        res.status(200).send(`Usuario ${userId} eliminado`)
      } catch (err) {
        console.log(err)
        next(err)
      }
})

module.exports = router