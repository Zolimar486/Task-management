const router= require('express').Router()
const { google }  = require('../controllers/auth');


router.post('/google', google )

module.exports=router;