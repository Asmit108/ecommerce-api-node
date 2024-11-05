const express=require('express')
const router=express.Router()
const productController=require('../controller/product.controller')
const authenticate=require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

router.post(`/`,authenticate,authorize(['ADMIN']),productController.createProduct)
router.post(`/creates`,authenticate,authorize(['ADMIN']),productController.createMultipleProduct)
router.delete(`/:id`,authenticate,authorize(['ADMIN']),productController.deleteProduct)
router.put(`/:id`,authenticate,authorize(['ADMIN']),productController.updateProduct)

module.exports=router