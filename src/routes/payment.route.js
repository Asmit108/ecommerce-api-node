const express=require('express')
const router=express.Router()
const paymentController=require('../controller/payment.controller')
const authenticate=require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

router.post(`/:id`,authenticate,authorize(['ADMIN','CUSTOMER']),paymentController.createPaymentLink)
router.post(`/`,authenticate,authorize(['ADMIN','CUSTOMER']),paymentController.updatePaymentInformation)
router.get('/callback',authenticate,authorize(['ADMIN','CUSTOMER']),paymentController.redirectToSuccessPage)

module.exports=router