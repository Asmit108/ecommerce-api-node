const express=require('express')
const router=express.Router()
const cartItemController=require('../controller/cartItem.controller')
const authenticate=require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

router.put(`/:id`,authenticate,authorize(['ADMIN','CUSTOMER']),cartItemController.updateCartItem)
router.delete(`/:id`,authenticate,authorize(['ADMIN','CUSTOMER']),cartItemController.removeCartItem)

module.exports=router