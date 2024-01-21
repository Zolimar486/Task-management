const router= require('express').Router()
const {verifyTokens, verifyUser}= require('../utils/verify')
const {update, deleteAccount} = require('../controllers/user')

router.put('/:id', verifyUser, update) // Update User 

router.delete('/:id', verifyUser, deleteAccount)// Detele User

module.exports= router