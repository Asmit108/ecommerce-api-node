const express=require('express')
const router=express.Router()
const cartController=require('../controller/cart.controller')
const authenticate=require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

router.get(`/`,authenticate,authorize(['ADMIN','CUSTOMER']),cartController.findUserCart)
router.post(`/add`,authenticate,authorize(['ADMIN','CUSTOMER']),cartController.addCartItem)

module.exports=router

