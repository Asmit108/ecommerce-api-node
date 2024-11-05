const express=require('express')
const router=express.Router()
const productController=require('../controller/product.controller')
const authenticate=require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

router.get(`/`,authenticate,authorize(['ADMIN','CUSTOMER']),productController.getAllProducts)
router.get(`/id/:id`,authenticate,authorize(['ADMIN','CUSTOMER']),productController.findProductById)



module.exports=router