const express=require('express')
const router=express.Router()
const ratingController=require('../controller/rating.controller')
const authenticate=require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

router.post(`/create`,authenticate,authorize(['ADMIN','CUSTOMER']),ratingController.createRating)
router.get(`/product/:productId`,authenticate,authorize(['ADMIN','CUSTOMER']),ratingController.getAllRatings)


module.exports=router