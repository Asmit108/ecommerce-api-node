const express=require('express')
const router=express.Router()
const reviewController=require('../controller/review.controller')
const authenticate=require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

router.post(`/create`,authenticate,authorize(['ADMIN','CUSTOMER']),reviewController.createReview)
router.get(`/product/:productId`,authenticate,authorize(['ADMIN','CUSTOMER']),reviewController.getAllReviews)


module.exports=router