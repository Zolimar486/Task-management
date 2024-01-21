const router = require("express").Router()
const {task, updateTask, deleteTask, getTask, updateStatus, getTaskQuery} = require('../controllers/task')
const {verifyUser} = require('../utils/verify')

router.post("/", verifyUser, task)

router.put('/:id', verifyUser, updateTask )

router.put('/:id/status', verifyUser, updateStatus)

router.delete('/:id', verifyUser, deleteTask)

router.get('/get',  verifyUser ,getTask)

router.get('/query', verifyUser, getTaskQuery)


module.exports= router