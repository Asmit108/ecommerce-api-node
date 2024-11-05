const express=require('express')
const router=express.Router()
const adminOrderController=require('../controller/adminOrder.controller')
const authenticate=require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

router.get(`/`,authenticate,authorize(['ADMIN']),adminOrderController.getAllOrders)
router.put(`/:orderId/confirm`,authenticate,authorize(['ADMIN']),adminOrderController.confirmOrders)
router.put(`/:orderId/ship`,authenticate,authorize(['ADMIN']),adminOrderController.shipOrders)
router.put(`/:orderId/deliver`,authenticate,authorize(['ADMIN']),adminOrderController.deliverOrders)
router.put(`/:orderId/cancel`,authenticate,authorize(['ADMIN']),adminOrderController.cancelOrders)
router.put(`/:orderId/delete`,authenticate,authorize(['ADMIN']),adminOrderController.deleteOrders)

module.exports=router