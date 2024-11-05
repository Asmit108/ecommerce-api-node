const express=require('express')
const router=express.Router()
const orderController=require('../controller/order.controller')
const authenticate=require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

router.post(`/`,authenticate,authorize(['ADMIN','CUSTOMER']),orderController.createOrder)
router.get(`/user`,authenticate,authorize(['ADMIN','CUSTOMER']),orderController.orderHistory)
router.get(`/:id`,authenticate,authorize(['ADMIN','CUSTOMER']),orderController.findOrderById)

module.exports=router