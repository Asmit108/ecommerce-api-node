const express=require('express')
const router=express.Router()
const userController=require('../controller/user.controller')
const authenticate=require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

router.post(`/role`,authenticate,authorize(['ADMIN']),userController.changeRole)

module.exports=router