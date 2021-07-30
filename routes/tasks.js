var express = require('express');
var router = express.Router();
const { isEmpty } = require('lodash')


router.post('/user/:userId', async (req, res, next) => {
    try {
        const db = req.app.get('db')
        const { name, description } = req.body
        const userId = req.params.userId

        const queryResponse = await db.query(
            `INSERT INTO tasks(user_id, name, description) VALUES ($1,$2, $3) RETURNING *`,
            [userId, name, description]
        )
        const [result] = queryResponse.rows
        
        res.status(201).send(result)
      } catch (err) {
        console.log(err)
        next(err)
      }
})

router.get('/user/:userId', async (req, res, next) => {
    try {
        const db = req.app.get('db')
        const userId = req.params.userId
        const queryResponse = await db.query(
            `SELECT * FROM tasks WHERE user_id = $1`,
            [userId]
        )
        const result = queryResponse.rows

        let sentResponse = false
        if(isEmpty(result)){
            sentResponse = true
            res.status(404).send({message:`Usuario ${userId} no tiene tareas`})
        }

        if(!sentResponse){
            res.status(200).send(result)
        }
        
      } catch (err) {
        console.log(err)
        next(err)
      }
})

router.delete('/:taskId', async (req, res, next) => {
    try {
        const db = req.app.get('db')
        const taskId = req.params.taskId
        await db.query(
            `DELETE FROM tasks WHERE id = $1`, 
            [taskId]
        )

        res.status(200).send(`Tarea ${taskId} eliminada`)
      } catch (err) {
        console.log(err)
        next(err)
      }
})

module.exports = router